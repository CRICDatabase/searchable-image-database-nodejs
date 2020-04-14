curl \
    -H "token_autenticacao: bac8db9147ac80b4ba8a05bb0de7c4fd" \
    -H "Content-Type: application/json" \
    --data '{
        "id_descricao": 2,
        "alturaCanvas": 600,
        "larguraCanvas": 400,
        "alturaOriginalImg": 600,
        "larguraOriginalImg": 400,
        "segmentos_citoplasma": [
            {
                "coord_x": 260,
                "coord_y": 15
            },
            {
                "coord_x": 150,
                "coord_y": 140
            },
            {
                "coord_x": 245,
                "coord_y": 230
            },
            {
                "coord_x": 360,
                "coord_y": 190,
            },
            {
                "coord_x": 365,
                "coord_y": 120,
            },
            {
                "coord_x": 290,
                "coord_y": 20,
            }
        ],
        "segmentos_nucleo": [
            {
                "coord_x": 190,
                "coord_y": 145,
            }
            {
                "coord_x": 210,
                "coord_y": 190,
            }
            {
                "coord_x": 265,
                "coord_y": 175,
            }
            {
                "coord_x": 255,
                "coord_y": 125,
            }
        ]
    }' \
    -X POST "http://api.database.cric.com.br/api/v1/imagens/4/segmentacao-celula/1"
