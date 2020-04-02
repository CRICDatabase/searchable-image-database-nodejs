Maintainer
==========

If you are the new maintainer,
this is for you.

GitHub
------

https://github.com/cricdatabase
is the organisation of the project on GitHub.
We store **all** our source code there.

Docker Hub
----------

https://hub.docker.com/orgs/cricdatabase
is the organisation of the project on Docker Hub.
We store Docker images there.

To build the image,
use ::

    $ docker build --target build-env -t repository/name:tagname .

To upload the image,
use ::

    $ docker push repository/name:tagname

Backend
^^^^^^^

Images for the backend in Node.js are available at
https://hub.docker.com/repository/docker/cricdatabase/nodejs.

Frontend
^^^^^^^^

Images for the backend in Angular are available at
https://hub.docker.com/repository/docker/cricdatabase/angular.

Production Server
-----------------

We use Kubernetes to orchestrate the deployment.

.. note::

   To have https://cricdatabase.com.br/ directing users
   to the new Kubernetes cluster,
   you will have to update the DNS.

Digital Ocean
^^^^^^^^^^^^^

Visit https://cloud.digitalocean.com/kubernetes
and create a new cluster.
More information at https://www.digitalocean.com/docs/kubernetes/quickstart/.

..  note::

    DigitalOcean floating IPs are publicly-accessible static IP addresses.
    You need to create one and assign to the Kubernetes cluster.
    More information at https://www.digitalocean.com/docs/networking/floating-ips/quickstart/.

Download the configuration file
and load it to your Kubernetes configuration file.

Check the current default context::

    $ kubectl config current-context

Create a namespace called ``cricdatabase``::

    $ kubectl create namespace cricdatabase

Now, list all the namespaces in your cluster::

    $ kubectl get namespace

Deploy the Block Storage Volume pods into the ``cricdatabase`` namespace::

    $ kubectl apply -f k8s/node-image.yaml -n cricdatabase
    $ kubectl apply -f k8s/db-data.yaml -n cricdatabase

Check the pod is up and running in the cluster::

    $ kubectl get pv -n cricdatabase

Deploy the (Deployment) pods into the ``cricdatabase`` namespace::

    $ kubectl apply -f k8s/node-deployment.yaml -n cricdatabase
    $ kubectl apply -f k8s/db-deployment.yaml -n cricdatabase
    $ kubectl apply -f k8s/angular-deployment.yaml -n cricdatabase

Check the pod is up and running in the cluster::

    $ kubectl get pod -n cricdatabase

Check the pod is up and running in the cluster:@

    $ kubectl get service -n cricdatabase

If one of your pods has status ``CrashLoopBackOff``,
get more information using::

    $ kubectl describe pod chashed-pod-name -n cricdatabase

If you need to access the log,
use ::

    $ kubectl logs -p chashed-pod-name -n cricdatabase

To gain Shell access to the pod::

    $ kubectl exec -n cricdatabase -i -t pod-name -- /bin/bash

We need to forward a local port to the pod
to access the running app locally::

    $ kubectl port-forward pods/angular -n cricdatabase 8080:4200

Open http://localhost:8080 with your web browser
and you should see the website.

If things are working as expected
and you want to expose the pods,
run ::

    $ kubectl apply -f k8s/node-service.yaml -n cricdatabase
    $ kubectl apply -f k8s/angular-service.yaml -n cricdatabase

Check that the services are working ::

    $ kubectl get service -n cricdatabase

When you’re done,
delete the services ::

    $ kubectl delete service node -n cricdatabase
    $ kubectl delete service angular -n cricdatabase

delete the pods ::

    $ kubectl delete deployment node -n cricdatabase
    $ kubectl delete deployment db -n cricdatabase
    $ kubectl delete deployment angular -n cricdatabase

and the Block Storage Volumes ::

    $ kubectl delete pv node-image -n cricdatabase
    $ kubectl delete pv db-data -n cricdatabase

