### Pod
When a pod contains multiple containers, all of them are always run on a single worker node
it never spans multiple workers nodes.

Containers are designed to run only a single process per container.
If you run multiple processes in a single container,
then it's your responsibility to keep all those processes running, manage their logs ...


Containers in a pod run in the same Network namespace, they share the same IP address and port space.

### Creating pods from yaml or json descriptors

#### Examining a YAML descriptor of an existing pod

```
$ kubectl get po kubia-46v9j -o yaml
```

1. *Metadata* includes the name, namespace, labels and other information about the pod.
2. *Spec* contains the actual description of the pod's contents, such as the pod's containers,
volumes and other data.
3. *Status* contains the current information about the running pod (condition of the pod, description and status of each container, the pod's internal IP...) -> read-only runtime data.

#### Creating a simple YAML descriptor for a pod

```
apiVersion: v1               
kind: Pod                    
metadata:
  name: kubia-manual         
spec:
  containers:
  - image: tanvn84/kubia       
    name: kubia              
    ports:
    - containerPort: 8080    
      protocol: TCP
```

#### kubectl explain

1. `kubectl explain pods`
2. `kubectl explain pod.spec`

#### Create a pod

```
$ kubectl create -f kubia-manual.yaml
```

#### View logs

```
$ kubectl logs kubia-manual
Kubia server starting...
```
Or for pods containing many containers

```
$ kubectl logs kubia-manual -c kubia
Kubia server starting...
```
#### Port forward

```
$ kubectl port-forward kubia-manual 8888:8080
... Forwarding from 127.0.0.1:8888 -> 8080
... Forwarding from [::1]:8888 -> 8080
```

#### Label

Show pods with label 

```
$ kubectl get po --show-labels
NAME              READY     STATUS    RESTARTS   AGE       LABELS
bic-sqlplus-new   1/1       Running   2          9d        <none>
kubia-46v9j       1/1       Running   7          24d       run=kubia
kubia-manual      1/1       Running   4          12d       <none>
kubia-manual-v2   1/1       Running   1          7d        creation_method=manual,env=prod
```
**You can use node labels and selectors to schedule pods only to nodes that have certain features.**

#### Namespace

```
$ kubectl create -f custom-namespace.yaml
namespace "custom-namespace" created
```

Depending on the networking solution deployed, a pod in namespace A can send traffic (HTTP requests) to a pod in namespace B if the solution is not inter-namespace isolation solution.

#### Deleting pods
Can delete pods with `kubectl delete pod {pod-name [ pod-name-2]}`
or by label `$ kubectl delete po -l creation_method=manual`
Delete a whole namespace will also delete all the pods within it : `kubectl delete ns {namespace-name}`
Delete all pods in the current namespace : `kubectl delete po --all`
You can delete all (almost, Secret is preserved) resources in the current namespace with : `kubectl delete all --all`