FROM docker:dind 

# Install deps and common tools for the agent
RUN apk add curl \
  git \
  python3 \
  py3-pip \
  tshark \
  bash 

WORKDIR /app

COPY requirements.txt /app
COPY entrypoint.sh /

SHELL ["/bin/bash", "-c"]

RUN python3 -m venv /venv && source /venv/bin/activate && pip install -r requirements.txt --no-cache-dir 

RUN echo "source /venv/bin/activate" >> /etc/bash/bashrc

ENTRYPOINT ["/bin/bash"]

CMD ["/entrypoint.sh"]
