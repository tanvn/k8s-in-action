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


