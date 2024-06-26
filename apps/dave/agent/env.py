import os
import socket
import subprocess


def set_repo_name(repo_name: str):
    global REPO_NAME
    REPO_NAME = repo_name


def _send_command(command):
    HOST = "host.docker.internal"
    PORT = 9090

    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        s.connect((HOST, PORT))
        s.setblocking(False)
        s.sendall(command.encode())


def run_command(command: str) -> str:
    """
    Run a command on the container
    """
    return subprocess.run(
        ["/bin/bash", "-c", f"cd {REPO_NAME} && {command}"],
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
    )


def edit_file(full_file_path: str, replace: str, replace_with: str):
    with open(os.path.join(REPO_NAME, full_file_path), "r", encoding="utf-8") as file:
        contents = file.read()
    contents = contents.replace(replace, replace_with)
    with open(os.path.join(REPO_NAME, full_file_path), "w", encoding="utf-8") as file:
        file.write(contents)


def filter_cap(path: str, filters: str) -> str:
    """
    Open wireshark on host machine and with filters
    """
    # open wireshark on host with pcap path
    _send_command(f"open_pcap {path} {filters}")

    pcap = run_command(f"tshark -r {path} -Y {filters}")

    run_command("sleep 5")

    _send_command("close_wireshark")

    return pcap


def open_wireshark() -> str:
    """
    Open wireshark on host machine and return pcap content
    """

    # open wireshark on host
    _send_command("open_wireshark")

    # run wireshark and record for 10 seconds
    run_command("tshark -i lo -a duration:10 -w /tmp/capture.pcap")

    ## close wireshark on host
    _send_command("close_wireshark")

    # read pcap file
    return run_command("tshark -r /tmp/capture.pcap")


def open_web_browser(url: str) -> str:
    """
    Open a web browser on host machine
    Run curl command on container
    Return the response
    """
    _send_command(f"open_chrome {url}")

    html = run_command(f"curl -sL {url}")

    # wait for 2 seconds
    run_command("sleep 2")

    _send_command("close_chrome")

    return html
