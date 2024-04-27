import argparse
import os
import logging

from agent.prompt import PROMPT
from agent.simple_agent import SimpleAgent

logger = logging.getLogger(__name__)
logger.setLevel(logging.INFO)


def run_task(task_name, use_mock):
    agent_prompt = PROMPT.format(task_description="This is a test task")
    agent = SimpleAgent(prompt=agent_prompt, mock_calls=use_mock, task_name=task_name)
    response = agent.run()

    return response


def main():
    parser = argparse.ArgumentParser(
        description="Run a specific ctf task for an agent."
    )
    parser.add_argument(
        "--task_name", type=str, required=True, help="Name of the task to run"
    )
    parser.add_argument(
        "--use_mock", action="store_true", help="Use mock calls for testing"
    )
    args = parser.parse_args()

    logger.info("running agent...")
    result = run_task(args.task_name, args.use_mock)
    logger.info("task complete.")


if __name__ == "__main__":
    main()
