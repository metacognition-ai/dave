import os
from dotenv import load_dotenv

from langchain.llms import OpenAI
from langchain_openai import ChatOpenAI
from langchain.chains import ConversationChain
from langchain.memory import ChatMessageHistory
from langchain.memory import ConversationBufferMemory

class SimpleAgentV2:
    def __init__(self):
        self.api_key = self.get_api_key()
        self.llm = llm = ChatOpenAI(temperature=0, model="gpt-4-turbo")
        self.conv = ConversationChain(
            llm=self.llm,
            memory=ConversationBufferMemory()
        )
    
    @staticmethod
    def get_api_key():
        load_dotenv()
        return os.getenv("OPENAI_API_KEY")
    
    def run(self, prompt):
        response = self.conv(prompt)
        return response