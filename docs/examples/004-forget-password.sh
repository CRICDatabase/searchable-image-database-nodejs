curl \
    -H "Content-Type: application/json" \
    --data '{
        "email": "admin@test.database.cric.com.br"
    }' \
    -X POST "http://localhost:3000/api/v1/forget_password"
