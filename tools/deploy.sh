#!/bin/sh
# Update code and restart server (run on server)
set -e

if [ -d "/home/feross/www/build-play.cash" ]; then
  echo "ERROR: Build folder already exists. Is another build in progress?"
  exit 1
fi

if [ -d "/home/feross/www/old-play.cash" ]; then
  echo "ERROR: Old folder exists. Did a previous build crash?"
  exit 1
fi

cp -R /home/feross/www/play.cash /home/feross/www/build-play.cash

cd /home/feross/www/build-play.cash && git pull
cd /home/feross/www/build-play.cash && npm install --no-progress
cd /home/feross/www/build-play.cash && npm run build
cd /home/feross/www/build-play.cash && npm prune --production --no-progress

sudo supervisorctl stop play

# Move database files (while app is stopped)
cd /home/feross/www && rm -rf build-play.cash/db
cd /home/feross/www && mv play.cash/db build-play.cash/db

cd /home/feross/www && mv play.cash old-play.cash
cd /home/feross/www && mv build-play.cash play.cash

sudo supervisorctl start play

cd /home/feross/www && rm -rf old-play.cash
