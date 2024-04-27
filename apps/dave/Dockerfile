FROM ubuntu:24.04

# Install deps and common tools for the agent
RUN apt update && \
  apt install -y \
  curl \
  git \
  python3 \
  python3-pip \ 
  build-essential \
  libssl-dev \
  libffi-dev \
  python3-dev \
  python3-venv \
  # wireshark \
  && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY requirements.txt /app

SHELL ["/bin/bash", "-c"]

RUN python3 -m venv /venv && source /venv/bin/activate && pip install -r requirements.txt --no-cache-dir 

ENTRYPOINT ["/venv/bin/python3", "main.py"]
