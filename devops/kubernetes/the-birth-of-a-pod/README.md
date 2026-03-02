# The birth of a pod

Goal: Run a Node.js API inside Kubernetes and access it via localhost.

---

# 1️⃣ Start Kubernetes

Kubernetes needs a cluster to run.

Start Minikube:

```bash
minikube start --driver=docker
```

Check if it's running:

```bash
kubectl get nodes
```

You should see:

```
minikube   Ready
```

---

# 2️⃣ Build Image Inside Cluster

Minikube has its own Docker.

Point your terminal to it:

```bash
eval $(minikube docker-env)
```

Now build:

```bash
docker build -t k8s-api:1.0 .
```

Why?

So Kubernetes can see the image.

---

# 3️⃣ Create Deployment

Deployment = keeps Pods alive.

Apply:

```bash
kubectl apply -f deployment.yaml
```

Check:

```bash
kubectl get pods
```

You should see 2 Pods running.

---

# 4️⃣ Create Service

Pods are temporary.

Service = stable access to Pods.

Apply:

```bash
kubectl apply -f service.yaml
```

Check:

```bash
kubectl get svc
```

You should see:

```
k8s-api-service
```

---

# 5️⃣ Access App Locally

Service is internal.

We expose it using port-forward:

```bash
kubectl port-forward service/k8s-api-service 3000:80
```

Now open:

```
http://localhost:3000
```

You should see:

```
Hello from Kubernetes 🚀
```

---

# 📌 Order Matters

Always:

1. Start cluster
2. Build image
3. Apply Deployment
4. Apply Service
5. Port-forward

---

# 🧪 Debug

If something fails:

Check pods:

```bash
kubectl get pods
```

Check services:

```bash
kubectl get svc
```

---

# 🛑 Stop Cluster

```bash
minikube stop
```

Delete:

```bash
minikube delete
```
