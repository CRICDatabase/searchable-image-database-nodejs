curl \
    -H "token_autenticacao: bac8db9147ac80b4ba8a05bb0de7c4fd" \
    -H "Content-Type: application/json" \
    --data '[
        {
            "nome":"ASC-H",
            "detalhes":""
        },
        {
            "nome":"ASC-US",
            "detalhes":""
        },
        {
            "nome":"HSIL",
            "detalhes":""
        },
        {
            "nome":"LSIL",
            "detalhes":""
        }
    ]' \
    -X GET "http://api.database.cric.com.br/api/v1/imagens-lesoes/1"