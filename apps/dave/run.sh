#!/bin/bash

set -e
set -o pipefail

dir_name="dave"
container_name="dave_agent"
image_name="dave_agent"

# validate current directory for correct volume mounting
if [ "$(basename "$(pwd)")" != $dir_name ]; then
	echo "Error: Please run this script from the cyber-bench directory."
	exit 1
fi

# check if container is already running
if [ "$(docker ps -q -f name=$container_name)" ]; then
	echo "Error: Container $container_name is already running."
	exit 1
fi

# check if container exists
if [ "$(docker ps -aq -f name=$container_name)" ]; then
	echo "Error: Container $container_name already exists."
	exit 1
fi

docker run -it \
	--name $container_name \
	-v $(pwd)/agent:/app/agent \
	-v $(pwd)/main.py:/app/main.py \
	--env-file=../../env \
	$image_name "$@" | tee "/tmp/$dave_container-latest.log"

container rm -f $container_name
