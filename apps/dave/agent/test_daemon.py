import socket
import argparse
from env import _send_command


def main():
    parser = argparse.ArgumentParser(description="Test the daemon")
    parser.add_argument("--command", type=str, required=True, help="Command to send")
    args = parser.parse_args()

    _send_command(args.command)


if __name__ == "__main__":
    main()
