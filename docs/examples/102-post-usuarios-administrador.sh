curl \
    -H "token_autenticacao: bac8db9147ac80b4ba8a05bb0de7c4fd" \
    -H "Content-Type: application/json" \
    --data '{
        "primeiro_nome": "Adan",
        "ultimo_nome": "",
        "email": "adan@test.database.cric.com.br",
        "senha": "123.456",
        "ativo": 1,
        "api_key": "123.456.789.0",
        "nivel_acesso": "TOTAL"
    }' \
    -X GET "http://localhost:3000/api/v1/usuarios-administrador"
