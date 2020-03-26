#!/bin/bash
for filename in $(ls | grep -P -e "^(get-|post-)")
do
    echo $filename
    sed -i 's/cricdatabase.com.br/localhost:3000/g' $filename
done