curl \
    -H "Content-Type: application/json" \
    --data '{
        "email": "troll@test.database.cric.com.br",
        "senha": "troll"
    }' \
    -X POST "http://localhost:3000/api/v1/login"
