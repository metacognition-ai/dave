import argparse
import logging
import subprocess

from agent.prompt import PROMPT
from agent.simple_agent import SimpleAgent

from utils import process_repository

task_description = """
I am running into an issue where the time my react page is 
supposed to display is just 0 instead of the current timestamp. Fix this issue.
"""

task_name = "fix_react_timestamp"
use_mock = False

repository_context = process_repository("/Users/inafi/Develop/Github/dave/apps/dave/example-task")

agent_prompt = PROMPT.format(task_description=task_description, repository_context=repository_context)

agent = SimpleAgent(
    prompt=agent_prompt,
    mock_calls=use_mock,
    task_name=task_name,
)
response = agent.run()

print(response)
