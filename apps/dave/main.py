import argparse
import json
import os
import subprocess

from agent.prompt import PROMPT
from agent.simple_agent import SimpleAgent


def setup_tmp_dir(task_name):
    tmp_dir = f"/tmp/cyber-bench/{task_name}"
    if not os.path.exists(tmp_dir):
        os.makedirs(tmp_dir)
    return tmp_dir


def setup_environment(task_directory, tmp_dir):
    script_path = os.path.join(task_directory, "init_script.sh")
    subprocess.call([script_path, tmp_dir])


def read_metadata(task_directory):
    metadata_file_path = os.path.join(task_directory, "metadata/simple_metadata.json")
    with open(metadata_file_path, "r") as metadata_file:
        metadata = json.load(metadata_file)
    return metadata


def run_challenge(tmp_dir, metadata, task_name, use_mock):
    task_description = metadata["task_description"]
    answer_format = metadata["answer_format"]

    agent_prompt = PROMPT.format(
        tmp_directory=tmp_dir,
        task_description=task_description,
        answer_format=answer_format,
    )
    agent = SimpleAgent(prompt=agent_prompt, mock_calls=use_mock, task_name=task_name)
    agent_answer = agent.run()

    answer = metadata["answer"]
    return agent_answer == answer


def cleanup():
    pass


def run_task(benchmark_path, task_name, use_mock):
    task_directory = os.path.join(benchmark_path, task_name)
    tmp_dir = setup_tmp_dir(task_name)
    setup_environment(task_directory, tmp_dir)
    metadata = read_metadata(task_directory)
    result = run_challenge(task_directory, metadata, task_name, use_mock)
    return result


def main():
    parser = argparse.ArgumentParser(
        description="Run a specific ctf task for an agent."
    )
    parser.add_argument(
        "--benchmark_path",
        type=str,
        required=True,
        help="Path to the benchmark directory",
    )
    parser.add_argument(
        "--task_name", type=str, required=True, help="Name of the task to run"
    )
    parser.add_argument(
        "--use_mock", action="store_true", help="Use mock calls for testing"
    )
    args = parser.parse_args()

    result = run_task(args.benchmark_path, args.task_name, args.use_mock)
    print(f"Task result: {'Correct' if result else 'Incorrect'}")


if __name__ == "__main__":
    main()
