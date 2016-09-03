#!/bin/bash

cd /tmp/nginx-temp
tar -xvf /tmp/nginx-temp/sncr-AttmexicoDoorToDoor-src.tar
sudo mv /tmp/nginx-temp/sncr-AttmexicoDoorToDoor/app /usr/share/nginx/html
rm -rf /tmp/nginx-temp
