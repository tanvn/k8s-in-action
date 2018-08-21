* `minikube start` :  Start minikube

* `kubectl cluster-info` -> get cluster information
* `minikube ssh` -> log into the Minikube VM

* `kubectl get nodes` -> list cluster nodes

* `kubectl get pods` -> list pods

```
NAME          READY     STATUS    RESTARTS   AGE
kubia-4jfyf   0/1       Pending   0          1m
```

the pod's status can be pending when it's downloading the image from registry.
when it's finished, a container will be created from the image
and the status will be RUNNING.


* Run a pod :

```
$ kubectl run kubia --image=luksa/kubia --port=8080 --generator=run/v1
replicationcontroller "kubia" created
```

Creating a *LoadBalancer-type* service, an external load balancer will be created,
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