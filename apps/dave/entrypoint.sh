#!/bin/bash

dockerd >/tmp/dockerd.log &

source /venv/bin/activate

python3 main.py
