docker build -t auth-database ./AuthDatabase
./AuthDatabase/runDocker.sh
docker build -t user-database ./UserDatabase
./UserDatabase/runDocker.sh
