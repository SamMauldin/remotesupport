echo "Updating local copy."
echo "This may take awhile if it is your first time or haven't used it in awhile."
cd remotesupport
git pull
cd node-rcon/lib
../bin/node main.js
