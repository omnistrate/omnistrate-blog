---
title: How to Achieve Autoscaling in Multi-Cloud Kubernetes Deployments
tags: 'cloud, cloud-native, multi-cloud'
date: '2023-03-02 18:44:30'
author:
  name: Abhishek Gupta
  email: abhishekg@omnistrate.com
  picture: ''
excerpt: >-
  Kubernetes is a popular open-source platform for managing containerized
  applications across multiple nodes and clusters.
slug: how-to-achieve-autoscaling-in-multi-cloud-kubernetes-deployments
readTime: 7
---

**Kubernetes** is a popular open-source platform for managing containerized applications across multiple nodes and clusters. It provides features such as service discovery, load balancing, orchestration, scaling, and self-healing. However, running Kubernetes across different cloud providers, such as AWS, Azure, Google Cloud, etc., can pose some challenges and complexities, such as network connectivity, resource synchronization, and cost optimization.

In this blog post, we will explore how to achieve autoscaling in multi-cloud Kubernetes deployments, which can help us improve the performance, availability, and efficiency of our applications. We will also show some code examples of how to configure and deploy autoscaling policies and parameters for each cluster and cloud provider.

![K8s logo ][1]


**What is Autoscaling in Kubernetes?**

Autoscaling in Kubernetes means adjusting the number of pods or nodes in a cluster based on the current workload and resource utilization. There are different types of autoscaling in Kubernetes, such as:

*Horizontal pod autoscaling (HPA):*

This scales the number of pods in a deployment or a replica set based on the average CPU or memory utilization, or a custom metric. For example, if the average CPU utilization of a deployment exceeds 50%, the HPA will add more pods to handle the increased load, and vice versa.

*Vertical pod autoscaling (VPA):*

This scales the CPU and memory requests and limits of the pods in a deployment or a replica set based on the historical and current resource usage. For example, if a pod is consistently using more memory than its request, the VPA will increase the memory request and limit of the pod, and vice versa.

*Cluster autoscaling (CA):*

This scales the number of nodes in a cluster based on the pending pods and the node utilization. For example, if there are not enough nodes to schedule the pending pods, the CA will add more nodes to the cluster, and vice versa.

Autoscaling in Kubernetes can help us optimize the resource utilization and the cost of our clusters, as well as improve the performance and availability of our applications.

**What is Multi-Cloud Kubernetes?**

Multi-cloud Kubernetes means running Kubernetes clusters across different cloud providers, such as AWS, Azure, Google Cloud, etc. This can provide benefits such as:

*Cost optimization:* We can choose the best cloud provider for each workload based on the price, performance, and features. We can also leverage the spot or preemptible instances to reduce the cost of our clusters.

*Availability:* We can increase the availability and reliability of our applications by distributing them across multiple regions and zones. We can also avoid the vendor lock-in and the single point of failure by using multiple cloud providers.

*Performance:* We can improve the performance and latency of our applications by deploying them closer to the end-users or the data sources. We can also use the best cloud provider for each workload based on the performance and features.

*Flexibility:* We can use the best cloud provider for each workload based on the features and requirements. We can also migrate or switch between cloud providers easily and quickly.

However, running Kubernetes across different cloud providers can also pose some challenges and complexities, such as:

*Network connectivity:* We need to ensure the network connectivity and security between the clusters and the cloud providers. We need to use a network overlay or a service mesh to enable the cross-cluster communication and the service discovery.

*Resource synchronization:* We need to ensure the resource and configuration synchronization across the clusters and the cloud providers. We need to use tools such as GitOps or Anthos to manage the cluster state and the application deployment.

*Cost management:*  We need to monitor and optimize the cost of our clusters and the cloud providers. We need to use tools such as CloudHealth or Cloudability to track and analyze the cloud spending and the resource utilization.

**How to Achieve Autoscaling in Multi-Cloud Kubernetes Deployments?**

To achieve autoscaling in multi-cloud Kubernetes deployments, we need to configure the autoscaling policies and parameters for each cluster and cloud provider. We also need to connect the clusters using a network overlay or a service mesh, and synchronize the resources and configurations using tools such as GitOps or Anthos.

Here are some code examples of how to achieve autoscaling in multi-cloud Kubernetes deployments, based on the web search results:

To set up horizontal pod autoscaling (HPA) for a deployment, you can use a YAML file or a command line. For example, to create an HPA that scales the number of pods between 1 and 10 based on the average CPU utilization of 50%, you can use the following YAML file:

    apiVersion: autoscaling/v1
    kind: HorizontalPodAutoscaler
    metadata:
      name: nginx-hpa 
      spec: 
        scaleTargetRef: 
            apiVersion: apps/v1 
            kind: Deployment 
            name: nginx 
            minReplicas: 1 
            maxReplicas: 10 
            targetCPUUtilizationPercentage: 50

Or you can use the following command line:

    kubectl autoscale deployment nginx --min=1 --max=10 --cpu-percent=50

To set up cluster autoscaling (CA) for a cluster, you need to enable the cluster autoscaler feature for each cloud provider. For example, to enable cluster autoscaler for an Amazon EKS cluster, you need to create an Auto Scaling group (ASG) for each availability zone, and tag the ASGs with the cluster name and the auto-discovery option. For example, to create an ASG for us-east-1a, you can use the following command:

    aws autoscaling create-auto-scaling-group \
        --auto-scaling-group-name eks-worker-nodes-us-east-1a \
        --launch-configuration-name eks-worker-nodes \
        --min-size 1 \
        --max-size 4 \
        --vpc-zone-identifier subnet-0ff156e0c4a6d300c \
        --tags ResourceId=eks-worker-nodes-us-east-1a,ResourceType=auto-scaling-group,Key=k8s.io/cluster-autoscaler/enabled,Value=,PropagateAtLaunch=true ResourceId=eks-worker-nodes-us-east-1a,ResourceType=auto-scaling-group,Key=kubernetes.io/cluster/eks-cluster,Value=owned,PropagateAtLaunch=true

To set up multi-cloud Kubernetes deployments, you need to create and connect Kubernetes clusters across different cloud providers. For example, to create a multi-cloud Kubernetes cluster using Scaleway, you need to create a Kubernetes cluster on each cloud provider, and then use a VPN or a service mesh to connect them. For example, to create a Kubernetes cluster on Scaleway, you can use the following command:

    svc k8s cluster create name=scaleway-cluster version=1.21.5 cni=cilium pools.0.name=default-pool pools.0.size=3 pools.0.node-type=GP1-XS pools.0.min-size=1 pools.0.max-size=5 pools.0.autoscaling=true

To connect the clusters, you can use a VPN such as WireGuard, or a service mesh such as Istio or Linkerd.

To synchronize the resources and configurations across the multi-cloud Kubernetes clusters, you can use tools such as GitOps or Anthos. For example, to use GitOps with Azure DevOps, you need to create a Git repository with your Kubernetes manifests, and then use Azure Pipelines to deploy them to your clusters.

For example, to create a pipeline that deploys to a multi-cloud Kubernetes cluster, you can use the following YAML file:

    trigger:
    - main
    
    pool:
      vmImage: ubuntu-latest
    
    steps:
    - task: Kubernetes@1
      displayName: Deploy to AWS EKS cluster
      inputs:
        connectionType: Kubernetes Service Connection
        kubernetesServiceEndpoint: AWS EKS cluster
        namespace: default
        command: apply
        arguments: -f $(System.DefaultWorkingDirectory)/manifests
        useConfigurationFile: false
    - task: Kubernetes@1
      displayName: Deploy to Azure AKS cluster
      inputs:
        connectionType: Kubernetes Service Connection
        kubernetesServiceEndpoint: Azure AKS cluster
        namespace: default
        command: apply
        arguments: -f $(System.DefaultWorkingDirectory)/manifests
        useConfigurationFile: false
    - task: Kubernetes@1
      displayName: Deploy to Google GKE cluster
      inputs:
        connectionType: Kubernetes Service Connection
        kubernetesServiceEndpoint: Google GKE cluster
        namespace: default
        command: apply
        arguments: -f $(System.DefaultWorkingDirectory)/manifests
        useConfigurationFile: false


### Conclusion


In this blog post, we have learned how to achieve autoscaling in multi-cloud Kubernetes deployments, which can help us improve the performance, availability, and efficiency of our applications. We have also shown some code examples of how to configure and deploy autoscaling policies and parameters for each cluster and cloud provider.

We hope you have enjoyed this blog post and learned something new. If you have any questions or feedback, please feel free to leave a comment below. Thank you for reading! 😊


  [1]: https://upload.wikimedia.org/wikipedia/commons/3/39/Kubernetes_logo_without_workmark.svg
