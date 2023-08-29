#!/bin/bash

rsync -av \
    --filter='+ build/' \
    --filter='+ build/**' \
    --filter='+ prod.config.js' \
    --filter='- *' \
    -e "ssh -i ./scripts/ssh-key.pem" \
    ./ ubuntu@44.206.25.190:/home/ubuntu/vigient-frontend

ssh -i ./scripts/ssh-key.pem ubuntu@44.206.25.190 "\
    export PATH=\$PATH:/home/ubuntu/.nvm/versions/node/v18.17.1/bin; \
    pm2 start vigient-frontend/prod.config.js"
