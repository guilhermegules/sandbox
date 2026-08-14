# Run POC Locally with Minikube (Scaling)

## Prerequisites
- Minikube installed
- kubectl installed
- Docker installed

## 1. Start Minikube
```bash
minikube start
```

## 2. Use Minikube's Docker Daemon
```bash
eval $(minikube docker-env)
```

## 3. Build Node.js App Image
```bash
cd k8s-part3-scaling/poc
docker build -t nodejs-k8s-scaling:v1 .
```

## 4. Deploy to Kubernetes
```bash
kubectl apply -f k8s/deployment.yaml -f k8s/service.yaml
```

## 5. Verify Initial State (1 Replica)
```bash
kubectl get deployments
kubectl get pods -l app=nodejs-scaling-poc
```

## 6. Test Scaling Up
```bash
kubectl scale deployment/nodejs-scaling-poc --replicas=4
kubectl get pods -l app=nodejs-scaling-poc -w
```
Watch 3 new Pods being created.

## 7. Test Load Balancing
```bash
minikube service nodejs-scaling-service --url
# Run curl multiple times, different Pod hostnames should appear
NODE_PORT=$(kubectl get svc nodejs-scaling-service -o jsonpath='{.spec.ports[0].nodePort}')
for i in {1..5}; do curl $(minikube ip):$NODE_PORT; done
```

## 8. Test Self-Healing
```bash
POD_NAME=$(kubectl get pods -l app=nodejs-scaling-poc -o jsonpath='{.items[0].metadata.name}')
kubectl delete pod $POD_NAME
kubectl get pods -l app=nodejs-scaling-poc -w
```
Watch a new Pod being created to maintain 4 replicas.

## 9. Test Scaling Down
```bash
kubectl scale deployment/nodejs-scaling-poc --replicas=2
kubectl get pods -l app=nodejs-scaling-poc
```

## 10. Cleanup
```bash
kubectl delete -f k8s/deployment.yaml -f k8s/service.yaml
minikube stop
```
