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

class SimpleAgentV2:
    def __init__(self):
        self.api_key = self.get_api_key()
        self.llm = ChatOpenAI(openai_api_key=self.api_key, temperature=0, model="gpt-4-turbo")
        self.memory = ConversationBufferMemory(
            memory_key='chat_history',
            return_messages=True
        )
        
        self.memory.add_message("You are a software engineering expert.")
        
        self.tools = [CircumferenceTool()]

        self.agent = initialize_agent(
            agent='chat-conversational-react-description',
            tools=self.tools,
            llm=self.llm,
            verbose=True,
            max_iterations=3,
            early_stopping_method='generate',
            memory=self.memory
        )
        
    @staticmethod
    def get_api_key():
        load_dotenv()
        return os.getenv("OPENAI_API_KEY")
    
    def get_status_update():
        # Get message history
        messages = self.memory.get_messages()
        
        prompt = ""
    
    def run(self, prompt):
        return self.agent(prompt)
    
class CircumferenceTool(BaseTool):
    name = "Circumference calculator"
    description = "use this tool when you need to calculate a circumference using the radius of a circle"

    def _run(self, radius: Union[int, float]):
        return float(radius)*2.0*pi

    def _arun(self, radius: int):
        raise NotImplementedError("This tool does not support async")
    