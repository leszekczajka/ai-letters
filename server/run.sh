#!/bin/bash

if [ "$1" = '' ]; then
    echo "";
    echo "Sposób użycia: $0 [numer_wersji]";
    echo "";
    echo "Przykład: $0 1.0.0"
    echo "";
else
    echo "Stop current...";
    docker stop ai-letters-server;
    echo "Remove current...";
    docker rm ai-letters-server;
    echo "Run...";
    docker run \
        -d \
        -e TZ=Europe/Warsaw \
        --restart always \
        --name=ai-letters-server \
        -p 4011:4000 \
        ai-letters-server:$1;
    echo "Done."
    docker ps -f name=ai-letters-server;
fi;
