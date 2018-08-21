### Pod
When a pod contains multiple containers, all of them are always run on a single worker node
it never spans multiple workers nodes.

Containers are designed to run only a single process per container.
If you run multiple processes in a single container,
then it's your responsibility to keep all those processes running, manage their logs ...