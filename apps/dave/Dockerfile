FROM ubuntu:24.04 as base

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
  && rm -rf /var/lib/apt/lists/*

WORKDIR /app

COPY requirements.txt /app

FROM base as builder

RUN python3 -m pip install -r requirements.txt --no-cache-dir 
ENTRYPOINT ["python3", "main.py"]
