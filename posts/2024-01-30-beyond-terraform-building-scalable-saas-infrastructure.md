---
title: 'Beyond Terraform: Building Scalable SaaS Infrastructure'
tags: 'cloud, infrastructure management, SaaS, terraform'
date: '2024-01-30 23:37:29'
author:
  name: Kamal Gupta
  email: kamal@omnistrate.com
  picture: ''
excerpt: >-
  We think that Terraform is an excellent IaC tool if you want to setup your
  cloud infrastructure once. However, when it comes to SaaS, we feel that it
  falls short on many grounds.
slug: beyond-terraform-building-scalable-saas-infrastructure
readTime: 5
coverImage: /images/posts/beyond-terraform-building-scalable-saas-infrastructure-1.jpg
category: Engineering & Tech
---

We think that Terraform is an excellent IaC tool if you want to setup your cloud infrastructure once. However, when it comes to SaaS, we feel that it falls short on many grounds. Here are the basic set of things that are missing in Terraform to even accomplish proper infrastructure management for building SaaS.

![Terraform][2]

- Not tenant-aware: 
    - If you have a need to deploy infrastructure per tenant, there is no
   such concept. You will have to manage multiple state files, which is
   a big challenge. 
    - Also - Terraform is declarative and static; spinning
   up tenants dynamically based on real-time user actions requires a
   control plane with an API-driven provisioning model.
    - Doesn't support any policy-based customization per deployment 
    - No support for different multi-tenancy models, ex - you may have free tier and share machines across tenants, and then PRO tier with dedicated machines but shared network, and then Enterprise tier with dedicated network etc.
- Not ACID compliant:
    - Not Atomic: In the case of any error during the apply phase, Terraform leaves the infrastructure in a broken state and leave it to DevOps to perfrom manual recovery. For SaaS with thousands and millions of tenants, this can be quite challenging. does not automatically rollback to the previous state. This may leave the infrastructure in a partially provisioned state.
    - Not Consistent: Due to the lack of basic recovery mechanisms, Terraform can leave the underlying infrastructure in an inconsistent state
    - Not Isolated: There is no built-in mechanism to run Terraform commands concurrently on the same state files. If two team members try to apply changes at the same time, they might face conflicts or undesirable outcomes. To avoid this, you will need to implement a state locking mechanism or follow certain operational practices.
    - Not Durable: By default, the state files are kept local and require explicit mechanism to store them durably for each tenant.
- No Versioning: In real world, your customers will be updating the infrastructure all the time but the TF doesn't have any native versioning, handling phased rollouts, and rolling back failures requires a dedicated control plane with versioning logic.
- No Environment support: Terraform has no concept of environments to make it easy for developers to model CI/CD
- No Day-2 Infra support: Terraform is just limited to provisioning the infrastructure and leaves the big part of operating the infrastructure (from patching, monitoring, alerting, capacity planning, failure handling to evolution) to the SaaS providers
    - Event-Driven Operations – Terraform is not event-driven; customer lifecycle automation, auto-scaling, and policy-based actions require a control plane with real-time orchestration.
    - Observability & Cost Management – Terraform doesn’t offer per-tenant monitoring, logs, alerting or cost tracking; a control plane provides fleet-wide observability and tenant-level insights.
    - Security & Compliance – Terraform lacks built-in enforcement of security policies, license validation, resource quotas, isolation and access control per customer—a control plane ensures compliance enforcement at runtime.
    - Scaling - Terraform lacks any support for API-based vertical and horizontal scaling, or auto-scaling based on custom metrics or auto-stop/start 
    - Metering and Billing - Terraform lacks any support for usage tracking, billing or marketplace integrations
    - Failure handling - Terraform doesn't deal with any cloud failures and automated recovery
    - Data Durability - Terraform doesn't take care of continuous backups/restore, API-driven PiTR or snapshot copy/restore across tenant and deployment configurations   
- No Multi-cloud support: Terraform requires manually creating and maintaining scripts for every cloud provider. Every time, there is any change, you have to manually update all the terraform scripts, run them appropriately across thousands of state files manually, handle any issues and manually fix them. At scale, this becomes quite unmanageable. In our previous experiences, we gave up on Terraform within a few months as we realized that it doesn't work at scale for SaaS use-case.
- Not Cloud-native: 
    - SaaS capabilities: There is no support to manage complex deployments from BYOA deployments, Private networking, VPC peering, Spot instances etc.
    - AI capabilities: no support for jobs, GPUs with CUDA, GPU time-slicing, accelerated model startup etc.
    - Drift Detection: Terraform struggles with drift detection, which means understanding if the actual state of resources has changed outside of Terraform since the last terraform apply. Terraform can refresh its state file before making changes to help mitigate this, but unexpected changes can still cause problems.
    - Error handling: Terraform can be somewhat vague in the errors it produces, making it hard to debug complex scripts.

> Building SaaS Infra (or Control Planes) using Terraform is like building a skyscraper on sand.


### Real world examples


We started building our control plane at Confluent with Terraform and it was a complete nightmare at even a small scale. Within 3 months, we had to abandon the tool and restart to build it from the ground up.

We have come across so many customers with the similar experience. None of the proper Cloud offers to our knowledge at scale rely on Terraform. We would love to know your experience more in the comments section below.


### Omnistrate: world's first developer platform to build your Control Plane


Omnistrate aims to address the IaC gaps in SaaS by providing a native solution that also enhances your existing Terraform setup with these capabilities—no modifications needed. 

Now, IaC (or infrastructure management) is just one piece to the bigger SaaS puzzle. For SaaS control plane, you have to handle many other pieces:

![control plane][3]

If you've already **started your automation using Terraform scripts**, that's not an issue—Omnistrate can seamlessly import your existing Terraform scripts and extend them into a fully functional control plane, enabling dynamic tenant management, versioned upgrades, and real-time observability without disrupting your current workflows.

For more details on what we do, please see this [page][1]

  [1]: https://docs.omnistrate.com/
  [2]: /images/posts/beyond-terraform-building-scalable-saas-infrastructure-1.jpg
  [3]: /images/posts/beyond-terraform-building-scalable-saas-infrastructure-2.jpg
