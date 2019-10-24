#!/bin/sh
# Update code and restart server (run from app server)
set -e

if [ -d "/home/feross/www/play.cash-build" ]; then
  echo "ERROR: Build folder already exists. Is another build in progress?"
  exit 1
fi

cp -R /home/feross/www/play.cash /home/feross/www/play.cash-build

cd /home/feross/www/play.cash-build && git pull
cd /home/feross/www/play.cash-build && rm -rf node_modules
cd /home/feross/www/play.cash-build && npm install --no-progress
cd /home/feross/www/play.cash-build && npm run build
cd /home/feross/www/play.cash-build && npm prune --production

sudo supervisorctl stop play

# Move database files (while app is stopped)
cd /home/feross/www && rm -rf play.cash-build/db
cd /home/feross/www && mv play.cash/db play.cash-build/db

cd /home/feross/www && mv play.cash play.cash-old
cd /home/feross/www && mv play.cash-build play.cash

sudo supervisorctl start play

cd /home/feross/www && rm -rf play.cash-old
