### Kubenetes Basic 
* `minikube start` :  Start minikube

* `kubectl cluster-info` -> get cluster information
* `minikube ssh` -> log into the Minikube VM

* `kubectl get nodes` -> list cluster nodes

* `kubectl get pods` -> list pods

```
NAME          READY     STATUS    RESTARTS   AGE
kubia-4jfyf   0/1       Pending   0          1m
```

Each pod is like a separate logical machine with its own IP, hostname, processes, and so on, running a single application.
The application can be a single process, running in a single container, or it can be a main application process and additional supporting processes, each running in its own container.
the pod's status can be pending when it's downloading the image from registry.
when it's finished, a container will be created from the image
and the status will be RUNNING.


* Run a pod :

```
$ kubectl run kubia --image=tanvn84/kubia --port=8080 --generator=run/v1
replicationcontroller "kubia" created
```

Creating a **LoadBalancer-type** service, an external load balancer will be created,
and the pod can be connected from outside through the load balancer's public IP.

```
$ kubectl expose rc kubia --type=LoadBalancer --name kubia-http
service "kubia-http" exposed
```

listing services :

```
tan.vu$ kubectl get services
NAME         TYPE           CLUSTER-IP      EXTERNAL-IP   PORT(S)          AGE
kubernetes   ClusterIP      10.96.0.1       <none>        443/TCP          18h
kubia-http   LoadBalancer   10.101.19.194   <pending>     8080:30263/TCP   32m
```

It takes time for the load balancer to be created by the cloud infrastructure.

*Minikube doesn’t support LoadBalancer services, so the service will never get an external IP*

When using Minikube, you can get the IP and port through which you can access the service by running `minikube service kubia-http`

Kubenetes does not create pods directly but via ReplicationController.
ReplicationController control the number of pods, makes sure that it's always 1 pod running (when the number of pod is 1 by default).
When a *service* is created, it gets a static IP which never changes during the service's lifetime.

Scale the number of pods :

```
$ kubectl scale rc kubia --replicas=3
replicationcontroller "kubia" scaled
```

Can see more information for each resource by 

```
$ kubectl describe pod {pod-name}
```

### Kubenetes Dashboard
A graphical web UI

1. Google Kubernetes Engine

```
$ kubectl cluster-info | grep dashboard
kubernetes-dashboard is running at https://104.155.108.191/api/v1/proxy/

...
$ gcloud container clusters describe kubia | grep -E "(username|password):"
``` 

2. Minikube

```
$ minikube dashboard
```