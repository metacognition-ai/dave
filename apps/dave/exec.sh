#!/bin/bash

docker run -it --rm --privileged --name dave_exec --entrypoint /bin/bash -v $(pwd)/agent:/app/agent -v $(pwd)/main.py:/app/main.py --env-file=../../.env --network host dave_agent
