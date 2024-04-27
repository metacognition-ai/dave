from flask import Flask

app = Flask(__name__)

@app.route("/get_status")
def get_status():
    return "ok"


@app.route('/guide', methods=["POST"])
def prompt():
    return "prompt"