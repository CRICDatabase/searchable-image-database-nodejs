#!/bin/bash
for filename in $(ls | grep -P -e "^(get-|post-)")
do
    echo $filename
    bash $filename > $filename.output
done