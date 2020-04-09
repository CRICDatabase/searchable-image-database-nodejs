curl \
    -H "token_autenticacao: bac8db9147ac80b4ba8a05bb0de7c4fd" \
    --data '{
        "id_usuario": 1,
        "id_lesao": 1,
        "codigo_lamina": "example",
        "dt_aquisicao": "20202-01-01"
    }' \
    --data @example0001.jpg \
    -X POST "http://localhost:3000/api/v1/imagens/"