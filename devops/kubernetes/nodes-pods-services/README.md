# Kubernetes (Pods, Nodes, Services)

## Key Concepts

### Pods

- Smallest deployable unit in K8s.
- Abstraction for 1+ containers with shared storage, networking, and container config.
- Co-located, co-scheduled containers; can include helper containers (proxies, data pushers/pullers).

### Nodes

- Worker machines (virtual/physical) managed by K8s Master.
- Runs kubelet, kube-proxy, container runtime.
- One-to-many relationship with Pods; Master schedules Pods across Nodes.

### Services

- Abstraction for a logical set of Pods, enables loose coupling.
- Solves Pod IP changes (ReplicaSets maintain desired state).
- Uses LabelSelectors to target Pods.
- Types: ClusterIP (default), NodePort, LoadBalancer, ExternalName.

### Labels

- Key/value pairs attached to K8s objects.
- Uses: Environment (dev/test/prod), versioning, classification.
- Applied/modified anytime; used for Service selection and kubectl queries.

## Hands-On Commands

- Expose deployment: `kubectl expose deployment/[name] --type=NodePort --port [port]`
- Label Pod: `kubectl label pod [pod-name] app=v1`
- Query by label: `kubectl get pods -l app=v1`
- Delete service: `kubectl delete service -l [label]`
