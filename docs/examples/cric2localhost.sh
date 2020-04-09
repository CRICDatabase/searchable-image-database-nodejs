#!/bin/bash
for filename in $(ls | grep -P -e "^[0-9]{3}-(get-|post-)")
do
    echo $filename
    sed -i 's/api.database.cric.com.br/localhost:3000/g' $filename
done
