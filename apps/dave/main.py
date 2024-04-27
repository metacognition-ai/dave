import argparse
import logging
import subprocess

from agent.prompt import PROMPT
from agent.simple_agent import SimpleAgent

from agent.utils import process_repository

logger = logging.getLogger(__name__)
logger.setLevel(logging.INFO)


def preprare_env(repo_link):
    repo_name = repo_link.split("/")[-1].replace(".git", "")
    # Clone the repo
    subprocess.run(
        f"git clone {repo_link} {repo_name}",
        shell=True,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
    )

    subprocess.run(
        f"cd {repo_name} && docker compose up -d",
        shell=True,
        stdout=subprocess.PIPE,
        # ignore if fails
        stderr=subprocess.PIPE,
    )


def run_task(task_name, use_mock, task_description, repo_link, timestamp):
    repo_name = repo_link.split("/")[-1].replace(".git", "")

    repository_context = process_repository(f"./{repo_name}")

    agent_prompt = PROMPT.format(
        task_description=task_description, repository_context=repository_context
    )
    agent = SimpleAgent(
        prompt=agent_prompt,
        mock_calls=use_mock,
        task_name=task_name,
        timestamp=timestamp,
    )
    response = agent.run()

    return response


def main():
    parser = argparse.ArgumentParser(
        description="Run a specific task for an agent."
    )
    parser.add_argument(
        "--task_name", type=str, required=True, help="Name of the task to run"
    )
    parser.add_argument(
        "--task_description", type=str, required=True, help="Print the task description"
    )
    parser.add_argument(
        "--use_mock",
        action="store_true",
        help="Use mock calls for testing",
        required=False,
        default=False,
    )
    parser.add_argument(
        "--repo_link", type=str, required=True, help="Link to the repository"
    )
    
    parser.add_argument(
        "--timestamp", type=str, required=True, help="timestamp to be used as job_id"
    )
    args = parser.parse_args()

    logger.info("preparing environment...")
    preprare_env(args.repo_link)  # pass the repo link
    logger.info("environment ready.")

    logger.info("running agent...")
    result = run_task(
        args.task_name, args.use_mock, args.task_description, args.repo_link, args.timestamp,
    )
    logger.info("task complete.")


if __name__ == "__main__":
    main()
