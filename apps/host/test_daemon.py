import socket


def send_command(command):
    HOST = "localhost"
    PORT = 9090

    with socket.socket(socket.AF_INET, socket.SOCK_STREAM) as s:
        s.connect((HOST, PORT))
        s.sendall(command.encode())
        data = s.recv(1024)
        print("Received", repr(data))


send_command("open_wireshark")
