curl \
    -H "Authorization: bac8db9147ac80b4ba8a05bb0de7c4fd" \
    -H "Content-Type: application/json" \
    --data '{
        "primeiro_nome": "Terry",
        "ultimo_nome": "",
        "email": "terry@test.database.cric.com.br",
        "senha": "123.456",
        "ativo": 1
    }' \
    -X POST "http://api.database.cric.com.br/api/v1/usuarios"
