docker stop auth-database
docker remove auth-database
docker run -d \
  --name auth-database \
  -p 5432:5432 \
  auth-postgres
