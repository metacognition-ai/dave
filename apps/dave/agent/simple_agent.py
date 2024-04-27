import datetime
import os
import pathlib
import re
import subprocess
from typing import Any
import logging

from dotenv import load_dotenv
from openai import OpenAI

model = "gpt-3.5-turbo"
MAX_ITERATIONS = 1

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


class SimpleAgent:

    def __init__(self, prompt: str, task_name: str, timestamp: str, mock_calls: bool = False):
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
        process = subprocess.run(
            command, shell=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE
        )
        return process.stdout.decode()

    def run(self):
        log_dir = os.path.join(
            "agent", "logs", f"{model}", f"{self.task_name}", f"{self.timestamp}"
        )
        pathlib.Path(log_dir).mkdir(parents=True, exist_ok=True)

        response_file = open(os.path.join(log_dir, "response.txt"), "w")
        command_file = open(os.path.join(log_dir, "command.txt"), "w")
        result_file = open(os.path.join(log_dir, "result.txt"), "w")

        input = self.prompt

        curr_iter = 0
        while curr_iter < MAX_ITERATIONS:
            iteration_log = f"======== Current Iteration: {curr_iter} ========\n"

            response = self.talk_to_llm(input)
            if response:
                response_file.write(iteration_log + response + "\n")
            logger.info(response)

            command = self.parse_response(response)
            result = None
            if command:
                command_file.write(iteration_log + command + "\n")
                result = self.execute_commands(command)
            logger.info(command)

            if result:
                result_file.write(iteration_log + result + "\n")
            logger.info(result)

            input = f"{input}\nObservation: {result}"
            logger.info(curr_iter)
            curr_iter += 1

        response_file.close()
        command_file.close()
        result_file.close()
