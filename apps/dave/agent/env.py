import socket


def send_command(command):
    HOST = "host.docker.internal"
    PORT = 9090

    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        s.connect((HOST, PORT))
        s.sendall(command.encode())
        data = s.recv(1024)
        # print("Received", repr(data))


def open_wireshark():
    send_command("open_wireshark")


def open_web_browser():
    pass
