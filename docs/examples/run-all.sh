#!/bin/bash
for filename in $(ls | grep -P -e "^[0-9]{3}-(get-|post-).*\.sh$")
do
    echo $filename
    bash $filename | python -m json.tool > $filename.output
done
