import argparse
import logging
import subprocess

from agent.prompt import PROMPT
from agent.simple_agent import SimpleAgent

logger = logging.getLogger(__name__)
logger.setLevel(logging.INFO)


def preprare_env():
    subprocess.run(
        "docker compose up -d",
        shell=True,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
    )


def run_task(task_name, use_mock, task_description):
    agent_prompt = PROMPT.format(task_description=task_description)
    agent = SimpleAgent(
        prompt=agent_prompt,
        mock_calls=use_mock,
        task_name=task_name,
    )
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
        "--task_description", type=str, required=True, help="Print the task description"
    )
    parser.add_argument(
        "--use_mock", action="store_true", help="Use mock calls for testing"
    )
    parser.add_argument(
        "--repo_link", type=str, required=True, help="Link to the repository"
    )
    args = parser.parse_args()

    logger.info("preparing environment...")
    preprare_env()
    logger.info("environment ready.")

    logger.info("running agent...")
    result = run_task(args.task_name, args.use_mock, args.task_description)
    logger.info("task complete.")


if __name__ == "__main__":
    main()
