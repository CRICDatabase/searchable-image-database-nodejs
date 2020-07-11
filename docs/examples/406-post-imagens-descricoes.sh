curl \
    -H "Authorization: bac8db9147ac80b4ba8a05bb0de7c4fd" \
    -H "Content-Type: application/json" \
    --data '[
        {
            "codigo": 1,
            "nome": "Epithelia"
        }
    ]' \
    -X POST "http://api.database.cric.com.br/api/v1/imagens-lesoes/1"
