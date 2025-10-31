---
title: >-
  Kubernetes and container networking in multi-cloud environments: Why it is not
  easy and why you need Sparta like skills
tags: 'aws, cloud, cloud-agnostic, cloud-native, Kubernetes'
date: '2023-06-08 04:08:39'
author:
  name: Abhishek Gupta
  email: abhishekg@omnistrate.com
  picture: ''
excerpt: >-
  As the world of technology continues to evolve, containerization has become a
  popular choice for deploying applications.
slug: >-
  kubernetes-and-container-networking-in-multi-cloud-environments-why-it-is-not-easy-and-why-you-need-sparta-like-skills
readTime: 13
coverImage: >-
  /images/posts/kubernetes-and-container-networking-in-multi-cloud-environments-why-it-is-not-easy-and-why-you-need-sparta-like-skills-1.webp
---

As the world of technology continues to evolve, containerization has become a popular choice for deploying applications. Kubernetes is an open-source container orchestration system that has gained popularity due to its ability to manage and deploy containers across multiple hosts. 

However, managing Kubernetes and container networking in multi-cloud environments can be challenging. This is where **Sparta-like** skills can come in handy.

#Sparta-like Skills

The ancient Spartans were known for their military prowess, and their skills can be applied in the modern-day technology landscape. Here are some Sparta-like skills that can help you master Kubernetes and container networking in multi-cloud environments:



![enter image description here][1]

**1. Discipline:** The Spartans were known for their strict discipline, and this is a valuable trait when it comes to managing Kubernetes and container networking. In multi-cloud environments, there are often multiple teams and stakeholders involved, and it is essential to have a disciplined approach to ensure that everything runs smoothly.

**2. Agility:** The Spartans were also known for their agility, and this is crucial when it comes to managing Kubernetes and container networking. In multi-cloud environments, there are often changes and updates that need to be made, and it is essential to be able to adapt quickly to these changes.

**3. Teamwork:** The Spartans were famous for their teamwork, and this is also critical when it comes to managing Kubernetes and container networking. In multi-cloud environments, there are often multiple teams involved, and it is essential to have a collaborative approach to ensure that everyone is working together towards a common goal.

**4. Focus:** The Spartans were known for their focus and determination, and this is also crucial when it comes to managing Kubernetes and container networking. With so many moving parts in multi-cloud environments, it is essential to stay focused on the task at hand and not get distracted by other things.

**5. Training:** The Spartans were known for their rigorous training, and this is also important when it comes to mastering Kubernetes and container networking. It is essential to invest in training and upskilling to ensure that you have the knowledge and skills needed to manage these technologies effectively.

Kubernetes has become one of the most widely used container orchestration platforms, and for good reason. It enables developers to easily manage and scale containerized applications across multiple environments. However, when it comes to networking in a multi-cloud environment, things can get a bit more complicated. 

In this blog post, we will explore how Kubernetes handles container networking in multi-cloud environments and provide examples of how it works with the three major cloud providers — Google Cloud Platform (GCP), Microsoft Azure, and Amazon Web Services (AWS).

----------

#Kubernetes and Container Networking

Before we dive into multi-cloud environments, it is important to understand how Kubernetes handles container networking. Each container in a Kubernetes cluster is assigned a unique IP address, and all containers can communicate with each other using this IP address. Kubernetes creates a virtual network for each container and all the containers on a node are connected to a common network. This enables containers to communicate with each other even if they are running on different nodes in the cluster.

Kubernetes also provides a service discovery mechanism for containers. Services are used to group a set of pods that provide the same functionality. A service is assigned a virtual IP address that is used to access the pods. Kubernetes also provides load balancing for services, which distributes traffic among the pods in the service.

##Multi-Cloud Environments

Multi-cloud environments have become increasingly popular as companies look to distribute their workloads across multiple cloud providers for increased redundancy and flexibility. Kubernetes can be used to manage containers across different cloud providers, enabling companies to easily migrate workloads between clouds or use multiple clouds for different parts of their application.

Let’s explore how Kubernetes handles container networking in multi-cloud environments with examples from GCP, Azure, and AWS.

##Container Networking in Google Cloud Platform (GCP)

GCP provides a Kubernetes Engine service that enables users to easily deploy and manage Kubernetes clusters on GCP. Kubernetes Engine uses Google’s global network to provide fast and secure communication between nodes in the cluster. Each node in the cluster is assigned a unique IP address from a subnet defined by the user. Kubernetes Engine also provides load balancing for services using Google’s Cloud Load Balancer service.

To create a Kubernetes cluster on GCP, you can use the following command:

    gcloud container clusters create [CLUSTER_NAME] - zone [ZONE]

This will create a cluster with the specified name and zone. You can then create a deployment and service using the usual Kubernetes commands.

##Container Networking in Microsoft Azure

Azure provides an Azure Kubernetes Service (AKS) that enables users to easily deploy and manage Kubernetes clusters on Azure. AKS uses Azure’s networking infrastructure to provide secure communication between nodes in the cluster. 
Each node in the cluster is assigned a unique IP address from a subnet defined by the user. AKS also provides load balancing for services using Azure’s Load Balancer service.

To create a Kubernetes cluster on Azure, you can use the following command:

    az aks create - name [CLUSTER_NAME] - resource-group [RESOURCE_GROUP] - node-count [NODE_COUNT] - generate-ssh-keys

This will create a cluster with the specified name and resource group. You can then create a deployment and service using the usual Kubernetes commands.

##Container Networking in Amazon Web Services (AWS)

AWS provides an Elastic Kubernetes Service (EKS) that enables users to easily deploy and manage Kubernetes clusters on AWS. EKS uses AWS’s networking infrastructure to provide secure communication between nodes in the cluster. Each node in the cluster is assigned a unique IP address from a subnet defined by the user. EKS also provides load balancing for services using AWS’s Elastic Load Balancer service.

To create a Kubernetes cluster on AWS, you can use the following command:

    eksctl create cluster - name [CLUSTER_NAME] - region [REGION]

This will create a cluster with the specified name and region. You can then create a deployment and service using the usual Kubernetes commands.

----------
#Deploying a sample application in Kubernetes

Kubernetes provides a powerful and flexible container orchestration platform that can be used to manage containers across multiple cloud providers. By understanding how Kubernetes handles container networking and service discovery, users can easily deploy and manage containers in multi-cloud environments. With the examples provided for GCP, Azure, and AWS, users can get started with deploying their own multi-cloud Kubernetes clusters.


##Deploying on Google Cloud Platform (GCP)

1) Create a Kubernetes cluster on GCP using the following command:

    gcloud container clusters create [CLUSTER_NAME] - zone [ZONE]

2) Deploy a sample application using the following Kubernetes deployment and service definitions:

deployment.yaml:

    apiVersion: apps/v1
    kind: Deployment
    metadata:
     name: sample-app
    spec:
     replicas: 3
     selector:
     matchLabels:
     app: sample-app
     template:
     metadata:
     labels:
     app: sample-app
     spec:
     containers:
     - name: sample-app
     image: nginx
     ports:
     - containerPort: 80
    service.yaml:
    
    apiVersion: v1
    kind: Service
    metadata:
     name: sample-app
    spec:
     selector:
     app: sample-app
     ports:
     - name: http
     port: 80
     targetPort: 80
     type: LoadBalancer

3) Apply the deployment and service definitions using the following commands:

    kubectl apply -f deployment.yaml
    kubectl apply -f service.yaml

4) Access the application using the external IP address of the load balancer service created in step 3.


##Deploying on Microsoft Azure

1) Create a Kubernetes cluster on Azure using the following command:

    az aks create - name [CLUSTER_NAME] - resource-group [RESOURCE_GROUP] - node-count [NODE_COUNT] - generate-ssh-keys

2) Deploy a sample application using the following Kubernetes deployment and service definitions:

deployment.yaml:

    apiVersion: apps/v1
    kind: Deployment
    metadata:
     name: sample-app
    spec:
     replicas: 3
     selector:
     matchLabels:
     app: sample-app
     template:
     metadata:
     labels:
     app: sample-app
     spec:
     containers:
     - name: sample-app
     image: nginx
     ports:
     - containerPort: 80
    service.yaml:
    
    apiVersion: v1
    kind: Service
    metadata:
     name: sample-app
    spec:
     selector:
     app: sample-app
     ports:
     - name: http
     port: 80
     targetPort: 80
     type: LoadBalancer

3) Apply the deployment and service definitions using the following commands:

    kubectl apply -f deployment.yaml
    kubectl apply -f service.yaml

4) Access the application using the external IP address of the load balancer service created in step 3.

##Deploying on Amazon Web Services (AWS)

1) Create a Kubernetes cluster on AWS using the following command:

    eksctl create cluster - name [CLUSTER_NAME] - region [REGION]

2) Deploy a sample application using the following Kubernetes deployment and service definitions:

deployment.yaml:

    apiVersion: apps/v1
    kind: Deployment
    metadata:
     name: sample-app
    spec:
     replicas: 3
     selector:
     matchLabels:
     app: sample-app
     template:
     metadata:
     labels:
     app: sample-app
     spec:
     containers:
     - name: sample-app
     image: nginx
     ports:
     - containerPort: 80
    service.yaml:
    
    apiVersion: v1
    kind: Service
    metadata:
     name: sample-app
    spec:
     selector:
     app: sample-app
     ports:
     - name: http
     port: 80
     targetPort: 80
     type: LoadBalancer

3) Apply the deployment and service definitions using the following commands:

    kubectl apply -f deployment.yaml
    kubectl apply -f service.yaml

4) Access the application using the external IP address of the load balancer service created in step 3.


----------

#Container networking across Cloud Providers 

##Connecting Google Kubernetes Engine (GKE) Clusters to Amazon EKS and Azure AKS

Connecting Google Kubernetes Engine (GKE) clusters to Amazon EKS and Azure AKS can be achieved using different methods such as Cluster Federation, Istio, and Anthos. In this example, we will showcase how to connect GKE to EKS and AKS using Anthos.

Anthos is an application management platform that enables you to manage and deploy applications across different clouds and on-premises environments. It supports a multi-cloud and hybrid environment, making it an ideal solution for connecting GKE to EKS and AKS.

**Here’s an example of how to connect GKE to EKS and AKS using Anthos:**

1) First, you need to create a GKE cluster, an EKS cluster, and an AKS cluster in their respective clouds.

2) Next, you need to create a GCP project and enable Anthos on it. You can do this by following the instructions in the Anthos documentation.

3) After enabling Anthos, you need to create a service account with the necessary permissions to connect to the EKS and AKS clusters. You can do this by running the following command:

    gcloud iam service-accounts create [SA-NAME] --display-name [SA-DISPLAY-NAME]

4) Next, you need to grant the service account the necessary permissions to access the EKS and AKS clusters. You can do this by running the following commands:

    gcloud iam service-accounts add-iam-policy-binding [SA-NAME] \
      --member="serviceAccount:[PROJECT-ID]@[PROJECT-ID].iam.gserviceaccount.com" \
      --role="roles/iam.workloadIdentityUser"
    
    gcloud projects add-iam-policy-binding [PROJECT-ID] \
      --member="serviceAccount:[PROJECT-ID]@[PROJECT-ID].iam.gserviceaccount.com" \
      --role="roles/gkehub.connect"

5) Once the necessary permissions are granted, you need to configure workload identity for the GKE cluster. You can do this by following the instructions in the Anthos documentation.

6) After configuring workload identity, you can create a Kubernetes service account in the GKE cluster that can access the EKS and AKS clusters. You can do this by running the following command:

    kubectl create serviceaccount [SA-NAME] - namespace [NAMESPACE]

7) Next, you need to annotate the service account with the necessary information to connect to the EKS and AKS clusters. You can do this by running the following commands:

    kubectl annotate serviceaccount [SA-NAME] \
      iam.gke.io/gcp-service-account=[SA-NAME]@[PROJECT-ID].iam.gserviceaccount.com \
      --namespace [NAMESPACE]
    
    kubectl annotate serviceaccount [SA-NAME] \
      iam.gke.io/gcp-external-id=[AWS-ACCOUNT-ID] \
      --namespace [NAMESPACE]

8) After annotating the service account, you need to create a Kubernetes role and role binding that allows the service account to access the EKS and AKS clusters. You can do this by running the following commands:

    kubectl create clusterrolebinding [RB-NAME] \
      --clusterrole=cluster-admin \
      --serviceaccount=[NAMESPACE]:[SA-NAME]
    
    kubectl create rolebinding [RB-NAME] \
      --clusterrole=view \
      --serviceaccount=[NAMESPACE]:[SA-NAME] \
      --namespace=kube-system

9) Once the role and role binding are created, you can install the Anthos Connect Agent on the GKE cluster. You can do this by following the instructions in the Anthos documentation.

10) Finally, you can register the EKS and AKS clusters in Anthos and deploy applications across all the clusters. To register the EKS and AKS clusters in Anthos, you can follow these steps:

11) In the GCP Console, go to Anthos Clusters and click Register Cluster.
Select the EKS or AKS option and follow the instructions to register the cluster.
Once the clusters are registered, you can deploy applications across all the clusters using Anthos. You can do this by creating a Kubernetes deployment that targets the GKE, EKS, and AKS clusters. Here’s an example of how to create a deployment that targets all three clusters:

    apiVersion: apps/v1
    kind: Deployment
    metadata:
      name: hello-world
    spec:
      replicas: 3
      selector:
        matchLabels:
          app: hello-world
      template:
        metadata:
          labels:
            app: hello-world
        spec:
          containers:
          - name: hello-world
            image: gcr.io/google-samples/hello-app:1.0
          nodeSelector:
            cloud.google.com/gke-os-distribution: ubuntu
            beta.kubernetes.io/os: linux

In this example, the deployment targets all three clusters by using node selectors that match the GKE, EKS, and AKS clusters.

That’s it! You have now connected GKE to EKS and AKS using Anthos and deployed applications across all the clusters.


##Connecting Elastic Kubernetes Engine (EKS) clusters to Google GKE and Azure AKS

This can be achieved through Kubernetes federation. 

Kubernetes federation allows you to manage multiple Kubernetes clusters as a single entity, making it easy to manage and deploy applications across multiple clusters.

**Here’s an example of how to federate EKS, GKE, and AKS clusters:**

1) Set up EKS, GKE, and AKS clusters:

Before we begin, ensure that you have set up EKS, GKE, and AKS clusters. Follow the documentation for each cloud provider to create the clusters.

2) Create federation control plane:

To create the federation control plane, first, install kubefed. You can install kubefed using the following command:

    $ kubectl apply -f https://raw.githubusercontent.com/kubernetes-sigs/kubefed/master/manifests/setup.yaml
    $ kubectl apply -f https://raw.githubusercontent.com/kubernetes-sigs/kubefed/master/manifests/kubefed.yaml

Next, create the federation control plane using the following command:

    $ kubefed init federation --host-cluster-context=<EKS_CLUSTER_CONTEXT>

Replace **EKS_CLUSTER_CONTEXT** with the context of your EKS cluster.

3) Join the GKE and AKS clusters:

To join the GKE and AKS clusters to the federation, use the following command:

    $ kubectl config use-context <GKE_CLUSTER_CONTEXT>
    $ kubefed join federation --cluster-context=<GKE_CLUSTER_CONTEXT> --host-cluster-context=<EKS_CLUSTER_CONTEXT> --v=2

    $ kubectl config use-context <AKS_CLUSTER_CONTEXT>
    $ kubefed join federation --cluster-context=<AKS_CLUSTER_CONTEXT> --host-cluster-context=<EKS_CLUSTER_CONTEXT> --v=2

Replace **GKE_CLUSTER_CONTEXT** and **AKS_CLUSTER_CONTEXT** with the context of your GKE and AKS clusters.

4) Deploy an application across clusters:

To deploy an application across clusters, create a Kubernetes deployment manifest file with the following contents:

    apiVersion: apps/v1
    kind: Deployment
    metadata:
      name: nginx
    spec:
      selector:
        matchLabels:
          app: nginx
      replicas: 3
      template:
        metadata:
          labels:
            app: nginx
        spec:
          containers:
          - name: nginx
            image: nginx:latest
            ports:
            - containerPort: 80

Save the file and use the following command to deploy the application across clusters:

    $ kubectl apply -f <deployment_manifest_file> --context=<GKE_CLUSTER_CONTEXT>
    $ kubectl apply -f <deployment_manifest_file> --context=<AKS_CLUSTER_CONTEXT>

Replace **deployment_manifest_file** , **GKE_CLUSTER_CONTEXT** , and **AKS_CLUSTER_CONTEXT** with the deployment manifest file path, context of your GKE and AKS clusters.

You can verify that the application is deployed across all clusters using the following command:

    $ kubectl get deployment nginx --all-namespaces

This should show the nginx deployment across all clusters.

That’s it! You have now federated EKS, GKE, and AKS clusters and deployed an application across all clusters.

#Conclusion

In this example, we have shown how to deploy a sample application on Kubernetes in a multi-cloud environment using GCP, Azure, and AWS. By understanding how Kubernetes handles container networking and service discovery, users can easily deploy and manage containers in multi-cloud environments.


  [1]: /images/posts/kubernetes-and-container-networking-in-multi-cloud-environments-why-it-is-not-easy-and-why-you-need-sparta-like-skills-1.webp
