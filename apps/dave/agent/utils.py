import os
import sys
import fnmatch


def output_to_prompt(stdout: str) -> str:
    return """
    
    Output of your command:
    {stdout}

    Continue following the same instructions the steps to solve the issue.

    """.format(
        stdout=stdout
    )


def get_ignore_list(ignore_file_path):
    ignore_list = []
    with open(ignore_file_path, "r") as ignore_file:
        for line in ignore_file:
            if sys.platform == "win32":
                line = line.replace("/", "\\")
            ignore_list.append(line.strip())
    return ignore_list


def should_ignore(file_path, ignore_list):
    for pattern in ignore_list:
        if fnmatch.fnmatch(file_path, pattern):
            return True
    return False


def process_repository(repo_path, ignore_list=[]):
    output = ""

    for root, _, files in os.walk(repo_path):
        for file in files:
            file_path = os.path.join(root, file)
            relative_file_path = os.path.relpath(file_path, repo_path)

            if (
                not should_ignore(relative_file_path, ignore_list)
                and ".git" not in relative_file_path
            ):
                with open(file_path, "r", errors="ignore") as file:
                    contents = file.read()

                output += f"----\n{relative_file_path}\n{contents}\n"

    return output
