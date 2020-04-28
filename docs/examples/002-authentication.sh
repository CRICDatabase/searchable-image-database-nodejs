curl \
    -H "Content-Type: application/json" \
    --data '{
        "email": "admin@test.database.cric.com.br",
        "senha": "123.456"
    }' \
    -X POST "http://localhost:3000/api/v1/login"
