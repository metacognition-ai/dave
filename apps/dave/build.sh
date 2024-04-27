#/bin/bash

set -e
set -o pipefail

image_name="dave_agent"

docker build -t $image_name .
