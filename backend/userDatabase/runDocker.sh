docker stop user-database
docker remove user-database
docker run -d \
  --name user-database \
  -p 5433:5432 \
  user-postgres
