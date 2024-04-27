import socket
import subprocess


def _send_command(command):
    HOST = "host.docker.internal"
    PORT = 9090

    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        s.connect((HOST, PORT))
        s.sendall(command.encode())
        data = s.recv(1024)
        # print("Received", repr(data))


def run_command(command: str) -> str:
    """
    Run a command on the container
    """
    return subprocess.run(
        command, shell=True, stdout=subprocess.PIPE, stderr=subprocess.PIPE
    )


def open_wireshark() -> str:
    """
    Open wireshark on host machine and return pcap content
    """

    # open wireshark on host
    _send_command("open_wireshark")

    # run wireshark and record for 10 seconds
    run_command("tshark -i en0 -a duration:10 -w /tmp/capture.pcap")

    ## close wireshark on host
    _send_command("close_wireshark")

    # read pcap file
    return run_command("tshark -r /tmp/capture.pcap")


def open_web_browser():
    pass
