import time
import subprocess
import shlex
from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin


app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'
agents = {}


@app.route('/<job_id>/status', methods=['GET'])
@cross_origin()
def get_status(job_id):
    if str(job_id) in agents:
        agent_info = agents[job_id]
        print(agent_info)
        if agent_info['process'].poll() is None:
            status = 'RUNNING'
        else:
            status = 'COMPLETE'
        return jsonify({'status': status})
    return jsonify({'error': 'Agent not found'}), 404



@app.route('/<job_id>/logs', methods=['GET'])
@cross_origin()
def get_logs(job_id):
    try:
        with open(f"./agent/logs/gpt-4-turbo/{job_id}/response.txt", 'r') as file:
            response_logs = file.read()
        with open(f"./agent/logs/gpt-4-turbo/{job_id}/command.txt", 'r') as file:
            command_logs = file.read()
        with open(f"./agent/logs/gpt-4-turbo/{job_id}/result.txt", 'r') as file:
            result_logs = file.read()
        logs = {
            'response': response_logs,
            'command': command_logs,
            'result': result_logs
        }
        return jsonify(logs)
    except FileNotFoundError:
        return jsonify({'error': 'Logs not found'}), 404


@app.route('/process', methods=['POST'])
@cross_origin()
def process():
    print("hello")
    data = request.json
    job_id =  int(time.time())  # job_id is just timestamp
    prompt = data.get('prompt')
    task_name = data.get('task_name')
    mock_calls = data.get('mock_calls', False)
    repo_link = data.get('repo_link')

    # Command to run the agent script
    command = f"sh run.sh --task_name {task_name} --task_description \"{prompt}\" --repo_link \"{repo_link}\" --timestamp \"{job_id}\""
    # Starting the subprocess
    try:
        process = subprocess.Popen(command, shell=True,
                                stdout=subprocess.PIPE,
                                stderr=subprocess.PIPE,)
        # Store the status in a dictionary
        agents[str(job_id)] = {'process': process, 'status': 'STARTING'}
    
    except:
        return jsonify({'error': 'Failed to start the process'}), 500
    return jsonify({'job_id': job_id})