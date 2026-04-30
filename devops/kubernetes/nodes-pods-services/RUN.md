# Run POC Locally with Minikube

## Prerequisites
- Minikube installed
- kubectl installed
- Docker installed

## 1. Start Minikube
```bash
minikube start
```

## 2. Use Minikube's Docker Daemon
Build image directly in Minikube's Docker context (no registry needed):
```bash
eval $(minikube docker-env)
```
*Only affects current terminal. Run `eval $(minikube docker-env -u)` to revert.*

## 3. Build Node.js App Image
From the `poc` directory:
```bash
cd k8s-part2-annotations/poc
docker build -t nodejs-k8s-poc:v1 .
```

## 4. Deploy to Kubernetes
```bash
kubectl apply -f k8s/deployment.yaml -f k8s/service.yaml
```

## 5. Verify Resources
```bash
kubectl get pods -l app=nodejs-poc
kubectl get svc nodejs-poc-service
```

## 6. Access the App
Get service URL automatically:
```bash
minikube service nodejs-poc-service --url
```
Or manually fetch NodePort:
```bash
curl $(minikube ip):$(kubectl get svc nodejs-poc-service -o jsonpath='{.spec.ports[0].nodePort}')
```

## 7. Test Label Operations
```bash
# List Pods by label
kubectl get pods -l app=nodejs-poc

# Add label to a Pod
POD_NAME=$(kubectl get pods -l app=nodejs-poc -o jsonpath='{.items[0].metadata.name}')
kubectl label pod $POD_NAME app=v1

# Query by new label
kubectl get pods -l app=v1
```

## 8. Cleanup
```bash
kubectl delete -f k8s/deployment.yaml -f k8s/service.yaml
minikube stop  # Optional
```
