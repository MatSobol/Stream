eval $(minikube docker-env)
docker build -t auth-database ../backend/AuthDatabase
#docker build -t user-database ../backend/UserDatabase
kubectl apply -f postgres-configmap.yaml
kubectl apply -f postgres-secrets.yaml
kubectl apply -f psql-pv.yaml
kubectl apply -f psql-claim.yaml
kubectl apply -f ps-statefulset.yaml
kubectl apply -f ps-service.yaml