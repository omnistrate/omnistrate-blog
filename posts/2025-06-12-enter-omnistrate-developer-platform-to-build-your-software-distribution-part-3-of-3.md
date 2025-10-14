---
title: 'Enter Omnistrate: Developer platform to build your Software Distribution (Part 3 of 3)'
date: '2025-06-12 14:27:03'
author:
  name: Kamal Gupta
  email: kamal@omnistrate.com
  picture: ''
excerpt: 'Now in Part 3, we turn to the solution: What if you didn’t have to abandon your existing stack, but could augment it with a purpose-built control plane, one that handled tenant lifecycle, deployment..'
slug: enter-omnistrate-developer-platform-to-build-your-software-distribution-part-3-of-3
---

Now in Part 3, we turn to the solution: What if you didn’t have to abandon your existing stack, but could augment it with a purpose-built control plane, one that handled tenant lifecycle, deployment orchestration, and multi-cloud complexity out of the box?

This post is Part 3 of a 3-part series on the realities of building and scaling Control Planes (Operating system of your Software Distribution).

 - In [Part 1][1], we explored why teams often assemble their own control plane using Kubernetes, Argo CD, and Terraform, and why this DIY stack quickly becomes fragile as complexity grows.
 - In [Part 2][2], we showcased how to build a Redis SaaS and highlighted some of the challenges

**This is where Omnistrate comes in.** 

Omnistrate is essentially a **Agentic Control-Plane-as-a-Service** – a platform designed to plug into your existing architecture and handle the messy parts of provisioning, managing, and scaling SaaS deployments. Importantly, it’s built to **integrate** with the tools you already use (containers, IaC, cloud accounts) rather than force a whole new paradigm. Let’s break down how Omnistrate addresses the challenges we discussed, and what it adds to your stack:

- **Turnkey Tenant Lifecycle Management**: Omnistrate automates the provisioning and **lifecycle of tenant environments** as a first-class concept. You define your product’s components in a high-level spec (for example, Omnistrate can adopt your existing Docker Compose or Helm charts), and Omnistrate takes care of bootstrapping the cloud environment, generating your control plane to manage tenants, deployments, model, and infrastructure. Spinning up a new customer environment becomes a self-service API call or button click by the customer. Crucially, Omnistrate will orchestrate the sequence – ensuring databases and clusters are ready before deploying apps, injecting config (like database URLs) into the app – so you get an **atomic provisioning** of a tenant. If something fails, Omnistrate can roll it back cleanly. This greatly reduces the error-prone scripts you would otherwise maintain. Moreover, Omnistrate is designed to handle all sorts of synchronization issues from conflicting user operations to handling multiple tenants operating in the shared environment. As a ready-made control plane, it encapsulates best practices learned from building many SaaS platforms, so you don’t have to write that logic yourself.
- **Customer Self-Service & SaaS Portal**: Omnistrate provides an open-source UI portal (or API/CLI) for your customers to manage their instances – things like starting/stopping their instance, configuring certain options, or viewing metrics and logs. This is a huge bonus: normally, building a customer-facing portal for a BYOC SaaS (so customers can, say, trigger an upgrade or connect their identity provider) would be a whole project. Omnistrate’s platform includes a ready-made “SaaS portal” capability. Your customers get a polished experience, and your engineers don’t have to build it from scratch.
- **Abstraction of Cloud Complexity without losing control**: Omnistrate presents a cloud-agnostic abstraction for your application’s infrastructure needs. Rather than writing a separate Terraform for AWS vs GCP vs Azure, you declare at a higher level what resources your service needs (e.g. “a Postgres database”, “an object storage bucket”, “a Kubernetes cluster with 3 nodes”). Omnistrate’s engine knows how to provision and manage those on each supported cloud. It essentially acts as an intelligent layer on top of cloud primitives. This means you get **multi-cloud support out-of-the-box** – your SaaS can be deployed on AWS, Azure, or GCP without you maintaining three sets of IaC code. For example, if your product can run on Kubernetes, Omnistrate will ensure it can deploy to EKS on AWS, AKS on Azure, etc., with the appropriate cloud networking and security configured. No more worrying about the quirks of each cloud – Omnistrate’s control plane takes care of cloud-specific integration and *cloud compatibility*. In addition, if you do have cloud-specific PaaS or SaaS services that your application needs, Omnistrate seamlessly adopts your existing Terraform to provision and manage these resources. Similarly, you can define your overall architectural blueprint in a cloud-agnostic way. If you would like to control any part of the stack, you have mechanisms to customize it from choosing specific instance types, injecting custom UDFs during any operation, to scaling or billing based on custom application metrics.
- **Seamless BYOC and Multi-Tenancy**: Omnistrate was designed with multi-tenancy in mind at every layer. It supports all the deployment models – fully hosted (all tenants in your cloud), **BYOC/BYOA** (deploying into your customer accounts), even on-prem or air-gapped scenarios. The heavy lifting of establishing secure connectivity to customer environments, monitoring all those distributed deployments, and managing upgrades across them is handled by Omnistrate’s service. For instance, in a BYOC scenario, Omnistrate can use a lightweight agent through a secure tunnel to deploy and control the data-plane (your product) inside the customer’s account without opening any firewall rules for the operation of the agent, while your control-plane logic remains in your domain. You don’t have to script up cross-account roles and custom Argo instances for each – Omnistrate’s control plane coordinates it and provides a central console to see **the fleet of all tenant deployments**. It was built to handle the scale of thousands of isolated environments, something that’s very hard to retrofit into a DIY toolchain. And because it’s multi-cloud by nature, you can offer customers a truly flexible SaaS: deployable in whatever cloud or account they prefer, with minimal extra effort on your part.

*Omnistrate architecture (BYOC mode): Omnistrate’s service (green) works in tandem with a control plane component that runs in **your cloud account** (blue), which then orchestrates deployment of the **data plane** (your actual product runtime) into **the customer’s cloud account** (orange). This secure architecture abstracts away the complexities of cross-cloud, cross-account deployment. The control plane handles provisioning, networking and lifecycle, communicating through a secure link – so you maintain isolation and security without writing custom automation for each tenant.*

![BYOA Mode][3]

- **Enterprise-Grade “Day-2” Capabilities (Out of the Box)**: Perhaps the biggest value Omnistrate provides is a slew of built-in SaaS **operational features** that you would otherwise spend months or years building around your DIY control plane. This includes:
    - **Monitoring & Auto-Healing**: Omnistrate provides out-of-the-box monitoring and can automatically detect and remediate issues in your tenant environments. For example, if a service in a customer’s deployment crashes, Omnistrate can restart it or notify you, often before the customer even notices. It can do deep application health-checks across all tenants continuously. It can detect and recover from networking, correlated failures, datacenter failures. Finally, it provides mechanisms to also recover from regional failures.
    - **Upgrades & Patching**: Instead of you writing scripts for rolling upgrades, Omnistrate provides mechanisms to push updates to all tenants in a controlled way. You can schedule maintenance windows, do canary upgrades, rollout to a specific subset of tenants in an automated way, while keeping track of different versions across different environments, tenants, deployments.
    - **Usage Metering & Billing Support**: Omnistrate can track usage metrics per tenant (API calls, storage used, etc.) as part of the control plane. It exposes usage data so you can plug it into your preferred billing provider or show it on a dashboard. If you plan to offer usage-based pricing, you can enable invoicing, payments and insights.
    - **Security & Compliance Automation**: Because Omnistrate standardizes the deployments, it’s easier to enforce security best practices uniformly. It comes with features to help achieve SOC 2, GDPR compliance etc., since the control plane has built-in audit logging, role-based access control, and isolation between tenants. For example, actions taken in the control plane can be audited (who provisioned what, when), and the platform ensures every data-plane deployment meets encryption and networking requirements. This dramatically cuts down the effort to pass compliance audits, as noted by Omnistrate’s users.
    - **Integration with Existing DevOps Workflows**: You don’t throw away your existing GitOps or IaC pipelines; Omnistrate can integrate with them. For example, it can work with your existing Helm charts, Kustomize templates, or Terraform modules. You might still write a Terraform module for a particular resource, but instead of manually running it for each tenant, you register it with Omnistrate’s control plane and let it manage the lifecycle. Alternatively, you can rely on the in-built infra managements where you can just define your infra setup directly with Omnistrate. In fact, Omnistrate supports directly importing Docker Compose files (with [custom extensions][4]) and can translate that into multi-tenant Kubernetes deployments and cloud provisioning. This means you leverage what you have (your Docker/Kubernetes configs) and let Omnistrate handle the rest. 

Next, let’s try to build the above-mentioned real-world example using Omnistrate. To initialize and setup the foundation:

    name: Redis Server  # Service Plan Name

    deployment:
      hostedDeployment:
        AwsAccountId: "<AWS_ID>"
        AwsBootstrapRoleAccountArn: arn:aws:iam::<AWS_ID>:role/omnistrate-bootstrap-role

That's all it takes on **AWS**:

 - 1-click cloud integration, seamlessly handle any failures
 - Automatically scales to multiple K8s clusters to balance cost and security isolation (you can also customize rules)
 - Automatically scales to different regions
 - Create as many developer environments as you need
 - Automated upgrades, drift-detection, quota handling, real-time monitoring to automate operations

Lets say you want to enable **GCP** or **Azure**, it's as simple as:

    name: Redis Server  # Service Plan Name

    deployment:
      hostedDeployment:
        AwsAccountId: "<AWS_ID>"
        AwsBootstrapRoleAccountArn: arn:aws:iam::<AWS_ID>:role/omnistrate-bootstrap-role

        GcpProjectId: "<GCP_INFO>"
        GcpProjectNumber: "<GCP_INFO>"
        GcpServiceAccountEmail: "<GCP_INFO>"

        AzureSubscriptionId: '<AZURE_INFO>'
        AzureTenantId: '<AZURE_INFO>'

And that’s all to make it **multi-cloud**:

 - It gives you a consistent interface to trigger deployments and manage upgrades seamlessly across cloud providers
 - It provides a uniform interface for deployments to manage the lifecycle of infrastructure components (IaaS  layer) across clouds.

How about enabling a different deployment model, say **BYOC**?

    name: Redis Server BYOC  # Service Plan Name

    deployment:
      byoaDeployment:
        AwsAccountId: "<AWS_ID>"
        AwsBootstrapRoleAccountArn: arn:aws:iam::<AWS_ID>:role/omnistrate-bootstrap-role

        GcpProjectId: "<GCP_INFO>"
        GcpProjectNumber: "<GCP_INFO>"
        GcpServiceAccountEmail: "<GCP_INFO>"

        AzureSubscriptionId: '<AZURE_INFO>'
        AzureTenantId: '<AZURE_INFO>'


And that’s all to expand it to the BYOC model:

 - It enables everything from automated cross-account permissioning setup with no-inbound access and a secure channel.
 - Enable self-serve REST APIs to onboard customer cloud accounts, and manage them across tenants
 - It provides a mechanism to **integrate** with your monitoring, auto-scaling, observability, auditing stack.
 - It provides a uniform interface for you to seamlessly trigger deployments & manage upgrades across accounts

We call this layer the “**Cloud Adapter Layer**”:

*If you have built your multi-tenant SaaS control plane and want to make it multi-cloud or add another deployment model, you can just use this Omnistrate layer to seamlessly extend your current control plane and seamlessly make it multi-cloud or add BYOC deployment model.*

Now that the foundation is set up, let's handle the “**Self-serve Deployment layer**”.

*If you have already built your Installer and have Helm/Operator/Kustomize artifacts, you can just use the “**Cloud Adapter Layer**” and the “**Self-serve Deployment Layer**” to deploy and scale your SaaS Product.*

To setup the Redis SaaS using Helm chart, this is all we need:

    services:
      - name: Redis Cluster

        network:
          ports:
            - 6379

        endpointConfiguration:
          cluster:
            host: "$sys.network.externalClusterEndpoint"
            ports:
              - 6379
            primary: true
            networkingType: PUBLIC
          admin:
            host: admin-{{ $sys.network.internalClusterEndpoint }}
            ports:
              - 8888
            primary: false
            networkingType: PRIVATE

        helmChartConfiguration:
          chartName: redis
          chartVersion: 19.6.2
          chartRepoName: bitnami
          chartRepoURL: https://charts.bitnami.com/bitnami
          chartValues:
            master:
              persistence:
                enabled: false
              resources:
                requests:
                  cpu: 100m
                  memory: 128Mi
                limits:
                  cpu: 150m
                  memory: 256Mi
            replica:
              persistence:
                enabled: false
              replicaCount: 1
              resources:
                requests:
                  cpu: 100m
                  memory: 128Mi
                limits:
                  cpu: 150m
                  memory: 256Mi

And that’s it, the output of this is a self-serve API / UI / CLI for you or your customers to provision, update, de-provision, manage your SaaS deployments.

    omnistrate-ctl build -f spec.yaml --name 'RedisHelm' \
    --release-as-preferred --spec-type ServicePlanSpec

    ✓ Successfully built service

Here is a quick video showing the onboarding using the UI and your customer portal: [Omnistrate Onboarding with Helm Chart][5]

And just like that:

 - You can manage your customer catalog and their lifecycle management including tracking tenant configurations, onboarding new tenants, offboarding, and maintaining tenant-specific resources and metadata
 - Your customers can self-serve and provision your deployment stack in seconds
 - They can customize, monitor, govern and manage their deployments using your APIs, CLI or UX portal
 - Not only can you add or remove features quickly, create new plans to cater to different customer segments but also customize anything in the above stack without having to worry about the synchronization issues, worry about failures during deployments, or manually stitching things together across an array of fragmented tools. 

Let’s say we want to allow tenants to customize the instance type:

    services:
      - name: Redis Cluster
        compute:
          instanceTypes:
            - apiParam: instanceType
              cloudProvider: aws
            - apiParam: instanceType
              cloudProvider: gcp
            - apiParam: instanceType
              cloudProvider: azure

        network:
          ports:
            - 6379

        helmChartConfiguration:
          chartValues:
            master:
              affinity:
                nodeAffinity:
                  requiredDuringSchedulingIgnoredDuringExecution:
                    nodeSelectorTerms:
                      - matchExpressions:
                          - key: node.kubernetes.io/instance-type
                            operator: In
                            values:
                              - $sys.compute.node.instanceType
              …

    apiParameters:
      - key: instanceType
        description: Instance Type
        name: Instance Type
        type: String
        modifiable: true
        required: false
        export: true

Looking to customize any application configuration and allow your customers to customize in a self-serve fashion, you can just follow the above mechanism for any configuration or environment variables. Similarly, you can enable different plans for your customers based on the isolation levels to cater to different customer segments.

If you want to add simple usage-based billing with paywall and a max quota per tenant, you can just add:

    pricing:
      - dimension: cpu
        unit: cores
        timeUnit: hour
        price: 0.01
      - dimension: memory
        unit: GiB
        timeUnit: hour
        price: 0.05

    metering:
      s3BucketARN: arn:aws:s3:::my_billing_bucket_name
      gcsBucketName: my-billing-bucket-name

    validPaymentMethodRequired: false
    maxNumberOfInstancesAllowed: 10

In the same way, you can configure:

 - Health monitoring and auto-recovery mechanisms to recover from any failures or tenant-aware backups from regional disasters
 - You can seamlessly schedule upgrades to 1000s of clusters in a fully automated way
 - You get fleet-level observability across all the customers, subscriptions, deployments, and their infrastructure
 - Centralized application metrics and logs for support and troubleshooting

But what if you have not yet built your **Operator or Helm Chart** though?

In this section, we will show you how to build your Installer step-by-step from a set of container image(s) with billing and tenant management. 

Typically your app will involve various components like an app, cache, database. Here is an example of a Wiki-app based Installer:

    version: '3.9'
    services:
      OutlineWiki:
        image: omnistrate/outline:0.74.0
        environment:
          - MAXIMUM_IMPORT_SIZE=5120000
          - …
        depends_on:
          - postgres
          - redis

      postgres:
        image: postgres:14.8
        environment:
          - SECURITY_CONTEXT_FS_GROUP=999
          - …

      redis:
        image: redis:7.0.12
        ports:
          - '6379:6379'

And just like that you can define dependencies that will be honored for provisioning, upgrades, scaling, recovery, backups and so on.

Now, let's add infrastructure requirements:

    version: '3.9'
    services:
      OutlineWiki:
        x-omnistrate-capabilities:
          httpReverseProxy:
            targetPort: 3000
        image: omnistrate/outline:0.74.0
        ports:
          - '3000:3000'
        volumes:
          - source: ./data
            target: /var/lib/outline/data
            type: bind
        environment:
          - MAXIMUM_IMPORT_SIZE=5120000
          - …
        depends_on:
          - postgres
          - redis

      postgres:
        x-omnistrate-mode-internal: true
        x-omnistrate-capabilities:
          networkType: INTERNAL
        image: postgres:14.8
        ports:
          - '5432:5432'
        volumes:
          - source: ./pg-data
            target: /var/lib/postgresql/data
            type: bind
        environment:
          - SECURITY_CONTEXT_FS_GROUP=999
          - …

      redis:
        x-omnistrate-mode-internal: true
        x-omnistrate-capabilities:
          networkType: INTERNAL
        image: redis:7.0.12
        ports:
          - '6379:6379'


Now, lets say we want to templatize the instance type for Redis, we can simply add the following to the Redis config above:

    x-omnistrate-compute:
      instanceTypes:
        - apiParam: instanceType
          cloudProvider: aws
        - apiParam: instanceType
          cloudProvider: gcp
        - apiParam: instanceType
          cloudProvider: azure


Similarly, you can customize any application parameters in no time and you can then expose these variables as API parameters for self-serve deployments:

    environment:
      - SECURITY_CONTEXT_FS_GROUP=999
      - SECURITY_CONTEXT_USER_ID=999
      - SECURITY_CONTEXT_GROUP_ID=999
      - POSTGRES_DB={{ $var.dbName }}
      - POSTGRES_USER={{ $var.dbUser }}
      - POSTGRES_PASSWORD={{ $var.dbPassword }}
      - PGDATA=/var/lib/postgresql/data/pgdata

Now - if you want to add auto-scaling including auto-stop to the Redis service:

    x-omnistrate-capabilities:
      autoscaling:
        maxReplicas: 1
        minReplicas: 1
        idleMinutesBeforeScalingDown: 20
        idleThreshold: 1
        overUtilizedMinutesBeforeScalingUp: 3
        overUtilizedThreshold: 80
        enableMultiZone: true
        serverlessConfiguration:
          enableAutoStop: true
          minimumNodesInPool: 1
          targetPort: 6379

Or, you want to enable instrumentation:

    x-customer-integrations:
      - omnistrateLogging
      - omnistrateMetrics

In the same way, you can add other capabilities:

 - Auto-scaling based on your application workload patterns
 - Guard against disasters with periodic backups

Any changes to your SaaS Product will automatically be versioned for its lifecycle management and support declarative continuous deployments to enable easy update of individual components.

###Conclusion: Control Planes That Scale (Without the Pain)
For platform engineering leaders, the choice is not binary between “all DIY” or “all off-the-shelf.” A pragmatic approach is to assemble the best existing tools **and** leverage specialized platforms where they make sense. Kubernetes, Argo CD, and Terraform are powerful, and they’ve enabled a whole generation of SaaS companies to get started. But as your SaaS scales, especially with enterprise requirements like multi-cloud and BYOC, the DIY control plane approach can become a quagmire of complexity, fragile integrations, and diverted engineering focus. We’ve seen how issues around multi-tenancy, lifecycle coordination, and day-2 ops can consume teams for quarters or years – time that could have been spent differentiating the product. It’s 2025 and building SaaS the old-way is not only inefficient but also not the core competency of most application teams. Where you engineers shine is building your core business and giving them their time back to do so is critical.

Omnistrate offers a compelling way to **have your cake and eat it too**: you keep using the technologies you trust (containers, IaC, GitOps), but you let a purpose-built control plane service handle the hard parts of scaling and managing them across tenants and clouds. It’s not about throwing away what you’ve built – it’s about *augmenting* it. By interfacing with your existing architecture, Omnistrate avoids the dreaded “rip-and-replace” scenario. You can adopt it incrementally, reduce your operational burden, and give your customers a better experience (with self-service, faster deployments, and more reliability).

In the end, building a SaaS is about delivering value to customers, not building infrastructure for its own sake. As platform engineers, our goal should be to **earn trust** through reliability, security, and agility. If using a service like Omnistrate gets us there faster – while still keeping us in control of our tech stack – it’s worth serious consideration. Modern teams are realizing that the true art is not in reinventing the control plane wheel, but in steering the ship (and letting proven automation carry the load). With Omnistrate, you can achieve the best of both worlds: a tailored platform that meets your needs, and a scalable SaaS foundation that doesn’t crumble under pressure.


  [1]: https://blog.omnistrate.com/posts/149
  [2]: https://blog.omnistrate.com/posts/150
  [3]: https://drive.google.com/thumbnail?id=1yYM3Y41N1SVwi5Eiz9rU4Dlp58V3a2yI&sz=w720
  [4]: https://docs.omnistrate.com/getting-started/compose/compose-spec/
  [5]: https://youtu.be/hyXc93DDGic
