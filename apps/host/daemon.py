import socket
from subprocess import call
import threading

HOST = "localhost"
PORT = 9090


def open_wireshark() -> None:
    call(
        [
            "/Applications/Wireshark.app/Contents/MacOS/Wireshark",
            "-i",
            "en0",
            "-k",
            "-w",
            "/tmp/capture.pcap",
        ]
    )


def close_wireshark() -> None:
    call(["killall", "Wireshark"])


def open_chrome(url: str) -> None:
    call(["open", "-a", "Google Chrome", url])


def close_chrome() -> None:
    call(["killall", "Google Chrome"])


def open_pcap(path: str, filters: str) -> None:
    call(
        [
            "/Applications/Wireshark.app/Contents/MacOS/Wireshark",
            "-r",
            path,
            "-Y",
            f"{filters}",
        ]
    )


def handle_client(conn, addr):
    with conn:
        print("Connected by", addr)
        while True:
            data = conn.recv(1024)
            print("got data", data.split(b" "))
            if not data:
                break
            if data == b"open_wireshark":
                threading.Thread(target=open_wireshark).start()
            elif data == b"close_wireshark":
                threading.Thread(target=close_wireshark).start()
            elif data.startswith(b"open_chrome"):
                threading.Thread(
                    target=open_chrome, args=(data.split(b" ")[1].decode(),)
                ).start()
            elif data == b"close_chrome":
                threading.Thread(target=close_chrome).start()
            elif data.startswith(b"open_pcap"):
                filters = b" ".join(data.split(b" ")[2:])
                print("filters", filters)
                threading.Thread(
                    target=open_pcap,
                    args=(data.split(b" ")[1].decode(), filters.decode()),
                ).start()

            conn.sendall(b"Command executed")


def start_server():
    print("Starting server", HOST, PORT)
    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        s.bind((HOST, PORT))
        s.listen()
        while True:
            conn, addr = s.accept()
            threading.Thread(target=handle_client, args=(conn, addr)).start()
        print("Server stopped")


if __name__ == "__main__":
    start_server()
