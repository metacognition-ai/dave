import os
import pathlib
from dotenv import load_dotenv

from langchain.llms import OpenAI
from langchain_openai import ChatOpenAI
from langchain.chains import ConversationChain
from langchain.memory import ChatMessageHistory
from langchain.memory import ConversationBufferMemory
from langchain.memory import ConversationBufferWindowMemory
from langchain.agents import initialize_agent
from langchain.tools import BaseTool

from typing import Union
from math import pi

import agent.env as env

MAX_ITERATIONS = 3


def set_timestamp(t):
    global LOG_DIR
    LOG_DIR = os.path.join("agent", "logs", f"{t}")


def log_to_txt(text):
    with open(os.path.join(LOG_DIR, "out.txt"), "a") as out:
        out.write("output: " + text + "\n")


class SimpleAgentV2:
    def __init__(self, timestamp: str):
        set_timestamp(timestamp)
        # self.timestamp = timestamp
        self.api_key = self.get_api_key()
        self.llm = ChatOpenAI(
            openai_api_key=self.api_key, temperature=0, model="gpt-4-turbo"
        )
        self.memory = ConversationBufferMemory(
            memory_key="chat_history", return_messages=True
        )
        self.memory.chat_memory.add_ai_message(
            "You are an expert software engineer. If you solve the problem, you will get a massive bonus. "
        )

        self.tools = [RunShellCommandTool(), EditFileTool(), WiresharkTool()]

        self.agent = initialize_agent(
            agent="chat-conversational-react-description",
            tools=self.tools,
            llm=self.llm,
            verbose=True,
            max_iterations=3,
            early_stopping_method="generate",
            memory=self.memory,
        )

    @staticmethod
    def get_api_key():
        load_dotenv()
        return os.getenv("OPENAI_API_KEY")

    def get_status_update(self, question):
        # Get message history
        chat_history = str(agent.memory.chat_memory)

        prompt = """
        {question}
        
        Give an update on the status of this task, based on the following conversation:
        {chat_history}
        """

        prompt = prompt.format(question=question, chat_history=chat_history)

        response = self.llm.invoke(
            [
                {
                    "role": "system",
                    "content": "You are an excellent communicator and software engineering expert. You provide clear and concise updates on the status of tasks.",
                },
                {"role": "user", "content": prompt},
            ]
        )

        return response.content

    def run(self, prompt):

        pathlib.Path(LOG_DIR).mkdir(parents=True, exist_ok=True)

        output = self.agent(prompt)

        log_to_txt(output["output"])
        return output


class CircumferenceTool(BaseTool):
    name = "Circumference calculator"
    description = "use this tool when you need to calculate a circumference using the radius of a circle"

    def _run(self, radius: Union[int, float]):
        return float(radius) * 2.0 * pi

    def _arun(self, radius: int):
        raise NotImplementedError("This tool does not support async")


class RunShellCommandTool(BaseTool):
    name = "Run bash shell command"
    description = "use this tool when you want to run a bash shell command in the development environment of the repository. Include any 'cd's because you are in the root of the repository directory"

    def _run(self, bash_shell_command: str) -> str:
        log_to_txt(f"command: {bash_shell_command}")
        subp = env.run_command(bash_shell_command)
        return f"""
        Standard out:
        {str(subp.stdout)}

        Standard error (if not empty):
        {str(subp.stderr)}
        """

    def _arun(self, bash_shell_command: str):
        raise NotImplementedError


class EditFileTool(BaseTool):
    name = "Edit file tool"
    description = "use this tool when you want to edit a file to fix a bug in your code. This tool takes a string that you want to replace and a string that you want it to be replaced with. use the fill file path as given to you above. this should be the final command you run. MAKE SURE YOU DO AT LEAST ONE EDIT FILE TOOL BEFORE YOU RETURN A FINAL ANSWER. the arguments are full_file_path, replace, and replace with - pass them in as a single string seperated by a single @ character."

    # def _run(self, full_file_path: str, replace: str, replace_with: str):
    def _run(self, path_replace_and_toreplace):
        full_file_path, replace, replace_with = path_replace_and_toreplace.split("@")
        log_to_txt(f"replacing: {full_file_path} - {replace} with {replace_with}")
        env.edit_file(full_file_path, replace, replace_with)

class WiresharkTool(BaseTool):
    name = "Wireshark tool"
    description = "use this tool when you want to capture a pcap file and filter it with a specific filter. This tool takes a string filter and returns the pcap file content for that filter. This tool should be used for any network-related bug."
    
    def run(self, path: str, filters: str) -> str:
        env.open_wireshark()
        return env.filter_cap("/tmp/capture.pcap", filters)
