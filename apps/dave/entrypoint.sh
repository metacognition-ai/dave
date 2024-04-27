#!/bin/bash

dockerd >/tmp/dockerd.log 2>&1 &

source /venv/bin/activate

python3 main.py "$@"
