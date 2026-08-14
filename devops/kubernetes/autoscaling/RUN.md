# Run Part IV POC Locally with Minikube (Autoscaling)

## Prerequisites
- Minikube installed
- kubectl installed
- Docker installed

## 1. Start Minikube with Metrics Server
```bash
minikube start
minikube addons enable metrics-server
```

## 2. Use Minikube's Docker Daemon
```bash
eval $(minikube docker-env)
```

## 3. Build Node.js App Image
```bash
cd k8s-part4-autoscaling/poc
docker build -t nodejs-k8s-hpa:v1 .
```

## 4. Deploy to Kubernetes
```bash
kubectl apply -f k8s/deployment.yaml -f k8s/service.yaml -f k8s/hpa.yaml
```

## 5. Verify HPA
```bash
kubectl get hpa
```
Wait a minute for metrics to populate. `TARGETS` should show `<unknown>/50%` initially, then `X%/50%`.

## 6. Test Autoscaling - Generate Load
Open a new terminal and run a load generator inside the cluster:
```bash
kubectl run -i --tty load-generator --image=busybox /bin/sh
# Inside the container:
while true; do wget -q -O- http://nodejs-hpa-service.default.svc.cluster.local/cpu-heavy; done
```

Or from outside the cluster:
```bash
NODE_PORT=$(kubectl get svc nodejs-hpa-service -o jsonpath='{.spec.ports[0].nodePort}')
MINIKUBE_IP=$(minikube ip)
for i in {1..50}; do curl $MINIKUBE_IP:$NODE_PORT/cpu-heavy & done
```

## 7. Watch Autoscaling in Action
In your original terminal:
```bash
watch kubectl get hpa
watch kubectl get pods -l app=nodejs-hpa-poc
```
After ~1-2 minutes, CPU usage should rise and HPA will scale up replicas (up to 10).

## 8. Stop Load and Watch Scale Down
- Stop the load generator (CTRL+C in load-generator terminal, then `exit`).
- After ~5 minutes, HPA will scale down replicas gradually.

## 9. Cleanup
```bash
kubectl delete -f k8s/hpa.yaml -f k8s/service.yaml -f k8s/deployment.yaml
kubectl delete pod load-generator
minikube stop
```
