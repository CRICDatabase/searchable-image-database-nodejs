#!/bin/bash
for filename in $(ls | grep -P -e "^(get-|post-).*\.sh$")
do
    echo $filename
    bash $filename > $filename.output
done