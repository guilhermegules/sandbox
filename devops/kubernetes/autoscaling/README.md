# Kubernetes - Autoscaling

## Key Concepts

### Why Autoscaling

- Handles traffic anomalies (e.g., ticket releases, flash sales).
- Elastic scaling: scales up during spikes, scales down when traffic drops.
- Avoids overprovisioning and manual intervention.

### Horizontal Pod Autoscaler (HPA)

- Scales Pods based on CPU utilization (default) or custom metrics.
- Components: Resource (defines metrics) and Controller (adjusts replicas).
- Algorithm: `desiredReplicas = ceil[currentReplicas * (currentMetricValue / desiredMetricValue)]`
- Checks every 15s (configurable via `--horizontal-pod-autoscaler-sync-period`).

### Prerequisites for HPA

- **Metrics Server**: Provides resource metrics API (CPU/memory usage).
- **Heapster**: Container cluster monitoring (legacy, metrics-server is modern replacement).
- **Resource Requests**: Pods must have CPU requests defined for HPA to work.

## Key Commands

- Enable metrics: `minikube addons enable metrics-server`
- Create HPA: `kubectl autoscale deployment [name] --cpu-percent=50 --min=1 --max=10`
- Check HPA: `kubectl get hpa`
- Generate load: `while true; do wget -q -O- http://[service]; done`

## HPA Spec Fields

- `--cpu-percent`: Target CPU utilization threshold (e.g., 50%)
- `--min`: Minimum number of replicas
- `--max`: Maximum number of replicas
