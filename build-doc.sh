#!/bin/sh

echo "delete docs/$1"
rm -rf docs/$1
echo "build $1 starts"
ng build --project=$1 --output-path docs/$1
cp ./docs/$1/index.html  ./docs/$1/404.html
echo 'build project finishes'