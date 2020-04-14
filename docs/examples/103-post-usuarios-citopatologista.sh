curl \
    -H "token_autenticacao: bac8db9147ac80b4ba8a05bb0de7c4fd" \
    -H "Content-Type: application/json" \
    --data '{
        "primeiro_nome": "Cyrus",
        "ultimo_nome": "",
        "email": "cyrus@test.database.cric.com.br",
        "senha": "123.456",
        "ativo": 1,
        "codigo_crc": "1234.5678-90"
    }' \
    -X POST "http://api.database.cric.com.br/api/v1/usuarios-citopatologista"
