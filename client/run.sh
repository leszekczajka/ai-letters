#!/bin/bash

if [ "$1" = '' ]; then
    echo "";
    echo "Sposób użycia: $0 [numer_ wersji]";
    echo "";
    echo "Przykład: $0 1.0.0"
    echo "";
else
    echo "Stop current...";
    docker stop ai-letters-client;
    echo "Remove current...";
    docker rm ai-letters-client;
    echo "Run...";
    docker run \
        -d \
        -e TZ=Europe/Warsaw \
        --restart always \
        --name=ai-letters-client \
        -p 4010:80 \
        ai-letters-client:$1;
    echo "Done."
    docker ps -f name=ai-letters-client;
fi;
