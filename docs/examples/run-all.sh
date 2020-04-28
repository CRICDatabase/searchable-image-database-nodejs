#!/bin/bash
if [ -z $1 ]
then
FILES=$(ls | grep -P -e "^[0-9]{3}-(get-|post-).*\.sh$")
else
FILES=$1
fi

for filename in $FILES
do
    echo $filename
    bash $filename | python -m json.tool > $filename.output
done
