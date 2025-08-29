minikube start --driver docker --static-ip 192.168.200.200
eval $(minikube docker-env)
docker build -t auth-database ../backend/AuthDatabase
docker build -t auth ../backend/Auth
kubectl apply -f postgres-configmap.yaml
kubectl apply -f auth-configmap.yaml
kubectl apply -f postgres-secrets.yaml
kubectl apply -f auth-secrets.yaml
kubectl apply -f psql-pv.yaml
kubectl apply -f psql-claim.yaml
kubectl apply -f ps-statefulset.yaml
kubectl apply -f auth-deployment.yaml
kubectl apply -f ps-service.yaml
kubectl apply -f auth-service.yaml