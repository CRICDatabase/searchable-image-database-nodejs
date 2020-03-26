#!/bin/bash
for filename in $(ls | grep -P -e "^(get-|post-)")
do
    echo $filename
    sed -i 's/localhost:3000/cricdatabase.com.br/g' $filename
done