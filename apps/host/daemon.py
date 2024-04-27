import socket
from subprocess import call

HOST = "localhost"
PORT = 9090


def open_wireshark():
    call(["/Applications/Wireshark.app/Contents/MacOS/Wireshark", "-i", "en0", "-k"])


def close_wireshark():
    call(["killall", "Wireshark"])


with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
    s.bind((HOST, PORT))
    s.listen()
    while True:
        conn, addr = s.accept()
        with conn:
            print("Connected by", addr)
            while True:
                data = conn.recv(1024)
                if not data:
                    break
                if data == b"open_wireshark":
                    open_wireshark()
                elif data == b"close_wireshark":
                    close_wireshark()
                conn.sendall(b"Command executed")
