# Kubernetes - Scaling

## Key Concepts

### Scaling

- Scaling = increasing/decreasing number of Pods.
- Define desired state (replica count); Kubernetes handles the rest.
- Traffic is distributed across all Pods (load balancing).

### Desired State

- Tell Kubernetes how many Pods you want via `replicas` field or `kubectl scale`.
- Kubernetes schedules Pods to nodes to match desired state.

### Load Balancing

- Services monitor available Pods and distribute traffic.
- Each request may hit a different Pod (verified via Pod hostname).

### Self-Healing

- Pods don't self-heal, but Kubernetes replaces dead/missing Pods.
- Deleting a Pod triggers creation of a new one to maintain replica count.

## Key Commands

- Scale up: `kubectl scale deployments/[name] --replicas=4`
- Scale down: `kubectl scale deployments/[name] --replicas=2`
- Check deployment: `kubectl get deployments`
- Describe deployment: `kubectl describe deployments/[name]`
- Delete Pod (test self-healing): `kubectl delete pods [pod-name]`
- Verify Pods: `kubectl get pods`

## Deployment Status Columns

- **READY**: CURRENT/DESIRED state
- **UP-TO-DATE**: Replicas updated to match desired state
- **AVAILABLE**: Replicas available to serve traffic
