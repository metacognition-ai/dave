import datetime
import os
import pathlib
import re
import subprocess
from typing import Any
import logging

from dotenv import load_dotenv
from openai import OpenAI

model = "gpt-4-turbo"
MAX_ITERATIONS = 3

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


class SimpleAgent:

    def __init__(
        self, prompt: str, task_name: str, timestamp: str, mock_calls: bool = False
    ):
        self.api_key = self.get_api_key()
        self.mock_calls = mock_calls
        self.prompt = prompt
        self.task_name = task_name
        self.timestamp = timestamp

    @staticmethod
    def get_api_key() -> str:
        load_dotenv("../../.env")
        print("loading api key", os.getenv("OPENAI_API_KEY"))
        return os.getenv("OPENAI_API_KEY")

    def talk_to_llm(self, input):
        if self.mock_calls:
            with open("sample_response.txt", "r") as file:
                sample_response = file.read().strip()
            return sample_response
        client = OpenAI(api_key=self.get_api_key())
        response = client.chat.completions.create(
            model=model,
            messages=[
                {"role": "system", "content": "You are a software engineering expert."},
                {"role": "user", "content": input},
            ],
        )
        return response.choices[0].message.content

    @staticmethod
    def parse_response(response_text):
        command = re.search("Command: (.+)", response_text, re.IGNORECASE)
        if command:
            return command.group(1).strip("`")
        else:
            return None

    @staticmethod
    def execute_commands(command):
        logger.info(f"Executing command: {command}")
        process = subprocess.run(
            command, shell=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE
        )
        logger.info(f"Command output: {process.stdout.decode()}")
        return process.stdout.decode()

    def run(self):
        log_dir = os.path.join(
            "agent", "logs", f"{self.timestamp}"
        )
        pathlib.Path(log_dir).mkdir(parents=True, exist_ok=True)

        out = open(os.path.join(log_dir, "out.txt"), "a")
        
        input = self.prompt

        curr_iter = 0
        while curr_iter < MAX_ITERATIONS:
            response = self.talk_to_llm(input)
            if response:
                out.write("output:" + response + "\n")
            logger.info(response)

            curr_iter += 1

        out.close()
