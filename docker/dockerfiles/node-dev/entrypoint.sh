#!/bin/bash
cd /app

#Wait MySql is Ready!
while ! mysqladmin ping -h"$DB_HOST" -uroot -p"$DB_PASSWORD" --silent; do
    sleep 1
done

npm install --unsafe-perm --only=dev
 if [ -z "$TEST" ]; then
   nodemon \
       --ext js \
       --watch ./  \
       --exec 'node --inspect=0.0.0.0:9229 server || true' \
       --delay 1
 else
   nodemon \
       --ext js \
       --watch ./  \
       --exec 'npm run test-unit || true' \
       --delay 1
 fi
