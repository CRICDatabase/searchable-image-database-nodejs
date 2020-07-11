curl \
    -H "Authorization: bac8db9147ac80b4ba8a05bb0de7c4fd" \
    -H "Content-Type: application/json" \
    --data '{
        "id_lesao": 2,
        "coord_centro_nucleo_x": 230,
        "coord_centro_nucleo_y": 150,
        "alturaCanvas": 600,
        "larguraCanvas": 400,
        "alturaOriginalImg": 600,
        "larguraOriginalImg": 400
    }' \
    -X POST "http://api.database.cric.com.br/api/v1/imagens/4/classificacao-celula/1"
