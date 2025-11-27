---
title: 'Real-World Example: The Lifecycle Headache (Part 2 of 3)'
tags: 'BYOC, ControlPlane, DevOps, MultiCloud, PlatformEngineering, SaaS'
date: '2025-06-12 08:23:54'
author:
  name: Kamal Gupta
  email: kamal@omnistrate.com
  picture: ''
excerpt: >-
  Imagine a data analytics SaaS startup, “DataCo”, that wants to build Redis
  SaaS as an example.
readTime: 9
coverImage: ''
category: Engineering & Tech
---

Imagine a data analytics SaaS startup, “DataCo”, that wants to build Redis SaaS as an example. They use Argo CD to deploy their analytics application (a set of microservices + some Spark jobs) onto the EKS cluster.

This is Part 2 of our 3-part blog series on the realities of building and scaling SaaS control planes.

 - In [Part 1][1], we explored why teams often assemble their own control plane using Kubernetes, Argo CD, and Terraform, and why this DIY stack quickly becomes fragile as complexity grows.
 - In this post, we’ll walk through a real-world example to make those challenges concrete.
 - In [Part 3][2], we’ll explore how Omnistrate augments your stack, simplifying tenant lifecycle, self-serve deployments, infrastructure management, billing, and Day-2 operations at scale.

Here is a step-by-step guide of achieving the above, starting with creating a VPC:

```terraform
data "aws_availability_zones" "available" {}

resource "aws_vpc" "main" {
    cidr_block = "10.0.0.0/16"
    tags = {
        Name = "main-vpc"
    }
}
```

Create subnets inside the main-vpc:

```terraform
resource "aws_subnet" "public_subnet" {
    count                   = 2
    vpc_id                  = aws_vpc.main.id
    …

    tags = {
        Name = "public-subnet-${count.index}"
    }
}
```

Add an internet gateway:

```terraform
resource "aws_internet_gateway" "main" {
    vpc_id = aws_vpc.main.id

    tags = {
        Name = "main-igw"
    }
}
```

Add route table entries and associate them with the subnets:

```terraform
resource "aws_route_table" "public" {
    vpc_id = aws_vpc.main.id

    route {
        …
    }

    tags = {
        Name = "main-route-table"
    }
}

resource "aws_route_table_association" "a" {
    …
}
```

Create a cluster role:

```terraform
resource "aws_iam_role" "eks_cluster_role" {
    name = "eks-role"

    …

    tags = {
        Name = "eks-role"
    }
}

resource "aws_iam_role_policy_attachment" "eks_cluster_role_attachment" {
    role       = aws_iam_role.eks_cluster_role.name
    policy_arn = "arn:aws:iam::aws:policy/AmazonEKSClusterPolicy"
}
```

Create a node role:

```terraform
resource "aws_iam_role" "eks_node_role" {
    name = "eks-node-role"

    assume_role_policy = <<EOF
    …
    EOF

    tags = {
        Name = "eks-node-role"
    }
}

resource "aws_iam_role_policy_attachment" "eks_role_attachment" {
    for_each   = toset(local.policies)
    role       = aws_iam_role.eks_node_role.name
    policy_arn = each.value
}
```

Create the EKS cluster and the EKS node group:

```terraform
resource "aws_eks_cluster" "main" {
    name = "main-eks-cluster"

    …

    tags = {
        Name = "main-eks-cluster"
    }
}

resource "aws_eks_node_group" "main" {
    cluster_name    = aws_eks_cluster.main.name
    node_group_name = "main-eks-node-group"

    …

    tags = {
        Name = "main-eks-node-group"
    }
}
```

This is a basic setup suitable for a school project. However, modern SaaS companies must address several additional challenges in such a setup

- **Global Infrastructure:**
    - Limited to AWS-only
    - Limited to a single region
    - Limited to a single developer environment only (you will likely need pre-prod, QA and prod environments
    - Limited to a single Kubernetes cluster; as you scale, you will need multiple clusters
    - EKS by default is not configured for SaaS operations; you must set up all necessary drivers
    - No customization, (e.g., Kubernetes amenities) - how would you customize and test all permutations?
    - How would you automate and test all of the above?
- **Enable Multi-cloud and BYOC support:**
    - How would you handle deployments & upgrades across accounts to support BYOC?
    - How would you handle deployments & upgrades across networks to support isolated or custom networks for your enterprise customers?
    - How would you handle deployments & upgrades across clouds by providing the  uniform IaaS abstraction to support multi-cloud environments?
- **Adapter Management:**
    - How would you handle failures in an automated way?
    - How would you handle seamless K8s or OS upgrades, or security patches in this layer? 
    - How would you handle drift-detection?
    - How would you gain visibility or put operational guardrails like safeguard against quota exhaustion or isolate workloads to prevent blast radius during large-scale incidents?

And that's just the foundational cloud layer. Now, we still need to set up Argo CD for continuous deployments:

```terraform
provider "helm" {
    kubernetes {
        config_path = "~/.kube/config"
    }
}

resource "helm_release" "argocd" {
    name       = "argocd"
    repository = "https://argoproj.github.io/argo-helm"
    chart      = "argo-cd"
    namespace  = "argocd"
    create_namespace = true
    version    = "5.51.6" # Optional: pin to a specific version

    values = [
        file("argocd-values.yaml") # optional customization
    ]
}
```


Next, let's build a basic Redis SaaS using the Redis Helm chart (alternatively, Redis Operator or Kustomize charts could be used).

```yaml
apiVersion: argoproj.io/v1alpha1
kind: Application
metadata:
    name: redis
    namespace: argocd
spec:
    project: default
    source:
        repoURL: https://charts.bitnami.com/bitnami
        chart: redis
        targetRevision: 18.3.2  # use latest if preferred
        helm:
            values: |
                architecture: replication
                auth:
                    enabled: false
                service:
                    type: LoadBalancer
                    port: 6379
                master:
                    persistence:
                        enabled: true
                    resources:
                        limits:
                            memory: 256Mi
                replica:
                    replicaCount: 2
                    persistence:
                        enabled: true
                    resources:
                        limits:
                            memory: 128Mi
    destination:
        server: https://kubernetes.default.svc  # use Argo's registered cluster if external
        namespace: redis
    syncPolicy:
        automated:
            selfHeal: true
            prune: true
        syncOptions:
          - CreateNamespace=true
```

Finally, register the EKS cluster with Argo CD and validate everything:

```bash
# Register EKS Cluster with Argo CD
aws eks update-kubeconfig --name <your-cluster-name>
argocd cluster add <your-kube-context>

# Apply the Application
kubectl apply -f redis-app.yaml

# Verify the Deployment
kubectl get pods -n redis
kubectl get svc -n redis
```

Then, you have to setup a DNS hosted zone

```terraform
resource "aws_route53_zone" "main" {
    name = "example.com"
}

resource "aws_route53_zone" "dev" {
    name = "dev.example.com"

    tags = {
        Environment = "dev"
    }
}

resource "aws_route53_record" "dev-ns" {
    zone_id = aws_route53_zone.main.zone_id
    name    = "dev.example.com"
    type    = "NS"
    ttl     = "30"
    records = aws_route53_zone.dev.name_servers
}
```

Then, you have to set up a cert-manager for TLS certificate provisioning and rotation. Let’s say we somehow handled that.

That’s just for 1 deployment. What about:

- **Enabling Self-serve deployments**:
    - How would you make deployments self-serve for your customers?
    - How quickly can you provision a stack for your customers? Does it take more than a few seconds or minutes?
    - How would you allow them to customize their deployments or corresponding infrastructure configuration through REST APIs?
    - How would you guard against synchronization issues across operations on the same deployment, across multiple deployments for the same customer, or across different customer operations on shared infrastructure?
    - How would you guard against dependency failures during deployments?
    - How would you handle tenant isolation to isolate workloads and cater to requirements of different customer segments?
- **Tenant & Billing Management**:
    - How would you manage the tenant catalog and its lifecycle management?
    - How would you onboard new tenants and handle offboarding?
    - How would you track tenant configurations, resources and metadata?
    - How would you meter usage, aggregate data and compute tenant bills?
    - How would you handle automated invoice management from sending invoices, collecting payments to tracking its lifecycle?
- **Automated Operations**:
    - How automated are your software upgrades? Can you roll-out a critical security patch to 1000s of deployments in 24 hours seamlessly in a fully automated way?
    - And what if instead of an application change, you have to upgrade the infrastructure due to a change in the application requirements?
    - How quickly can you react to new customer requirements allowing them to customize their deployment, incorporate updates from cloud providers like newer instance types, track or apply  security patches for  CVEs, new changes in the application, try new business experiments or requirements to test adjacent market segments, handle changes in regulations, etc?
    - How would you monitor the deployment including infrastructure, and auto-recover from different failures? How about datacenter or even regional failures?
    - How would you gain insights into tenants, their subscriptions, their deployments, and their infrastructure?
    - How would you get application and infrastructure metrics and logs for support and troubleshooting in one centralized place?
    - How would you get cost insights and enable cost controls to operate cost-effectively? 
    - How would you enforce infrastructure security controls for governance and compliance?

We discussed the above challenges in much more detail in the “Challenges with the DIY Control Plane Approach” section above.

But what if you don’t even have a Level 5 Kubernetes Operator or a Helm chart? In that case, you have to first build your Installer. The Installer includes packaging your application components akin to an advanced K8s operator:

- **Packaging and versioning**:
    - Defining dependency relationships for provisioning and upgrades
    - Defining placement of different resources to isolate respective components from each other
    - Defining the core Kubernetes resource manifests like ConfigMaps, Deployments, Secrets, Services, etc to map your final artifacts to Kubernetes concepts
    - Packaging your application and its dependencies (e.g., Redis, Postgres) as a single unit
    - Enabling versioning for its lifecycle management
- **Templatizing**:
    - Configuring infrastructure requirements for your application 
    - Templatizing YAML Manifests to enable custom deployments 
- **Day-2 Controls**:
    - Supporting declarative CI/CD based automation to enable easy updates to individual components
    - Enabling metrics and logs for your application
    - Auto-Scaling your application depending on your workload 
    - Supporting creating backups and restoring from backups
    - Enabling monitoring for the application to expose the health status/metrics

For the first few customers, the platform engineering team manages provisioning by running Terraform and setting up Argo apps manually.

Now DataCo lands a big enterprise client who asks for the service in **their** Azure account (BYOC), and another in GCP. The team dutifully writes new Terraform code for AKS and GKE clusters and adapts their scripts. By now, they have 10 customers, each in a separate cloud account. On the next product update, DataCo needs to add a new “AI insights” service which requires a GPU node group in the cluster and a new Kafka topic. They must update the Terraform module to add a node group (for each cloud type) and run it for all 10 customers, then update the Argo CD app manifest to deploy the new microservice. During this rollout, one tenant’s Terraform apply fails (Azure quota issue), leaving that environment without the GPU node – but Argo CD still deployed the app expecting it. The DataCo engineers spend a weekend fixing the drift.

This story is all too common. The combination of **manual coordination, per-environment differences**, and lack of an overarching orchestration leads to a lot of “toil” (repetitive manual work) for platform engineers. As a result, features get delayed and operational costs rise. In Reddit forums and tech blogs, engineers often ask “How do we connect Terraform and Argo CD flows?” – the answer usually involves a lot of custom glue, or adopting another tool to fill the gap.

To sum up, the DIY control plane approach **can** work, but it exacts a heavy tax in engineering time and maintenance. This is undifferentiated heavy-lifting that detracts from building your actual product. As one SaaS expert put it: the question isn’t “*Can we build this ourselves?*” but “*Should we*?”, given that innovation time is better spent on your core product, not reinventing infrastructure plumbing.


  [1]: https://blog.omnistrate.com/posts/149
  [2]: https://blog.omnistrate.com/posts/151
