import os
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

class SimpleAgentV3:
    def __init__(self):
        self.api_key = self.get_api_key()
        self.llm = ChatOpenAI(
            openai_api_key=self.api_key, temperature=0, model="gpt-4-turbo"
        )
        self.memory = ConversationBufferMemory()
        self.memory.chat_memory.add_ai_message(
            "You are an expert software engineer. If you solve the problem, you will get a massive bonus. "
        )

        self.conv_chain = ConversationChain(
            llm=self.llm,
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
        return self.conv_chain(prompt)
