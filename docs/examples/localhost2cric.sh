#!/bin/bash
for filename in $(ls | grep -P -e "^[0-9]{3}-(get-|post-)")
do
    echo $filename
    sed -i 's/localhost:3000/api.database.cric.com.br/g' $filename
done
