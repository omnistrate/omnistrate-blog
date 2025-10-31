---
title: Omnistrate Platform Update (April 2025)
tags: 'cloud, platform, product-release, SaaS, update'
date: '2025-05-14 23:38:27'
author:
  name: Pablo Berton
  email: pberton@omnistrate.com
  picture: ''
excerpt: >-
  Exciting New Features in Omnistrate We’re thrilled to introduce several
  powerful updates that enhance the Omnistrate platform!
slug: omnistrate-platform-update-april-2025
readTime: 6
coverImage: /images/posts/omnistrate-platform-update-april-2025-1.png
category: Product Updates
---


## 🚀 Exciting New Features in Omnistrate


![Omnistrate Updates](/images/posts/omnistrate-platform-update-april-2025-1.png)

We’re thrilled to introduce several powerful updates that enhance the Omnistrate platform!

**Omnistrate’s Azure public beta**

We’re thrilled to launch **Omnistrate’s Azure public beta!** Whether you’re migrating an existing service or building something new, our fully managed platform makes it effortless to run on **Azure Cloud**. From startups embracing Azure for the first time to enterprises expanding into multi-cloud, Omnistrate delivers a smooth, automated, and scalable experience.

**Multi-Tenant GPU allocation**

Running AI workflows or GPU-intensive jobs? Omnistrate now supports **Multi-Tenant GPU allocation**, enabling you to efficiently partition GPU resources on cloud VMs. Whether you’re operating long-running services or scheduled jobs, you can **bin-pack multiple tenants on the same GPU accelerated VM**, maximizing utilization of expensive GPU infrastructure and significantly lowering costs. With Omnistrate, you don’t have to worry about the complexity of managing GPU infrastructure. We provide the flexibility to fine-tune resource settings and experiment with what works best for your workloads. Check out our [Community GitHub repo](https://github.com/omnistrate-community/gpu-slicing-example) for a step-by-step guide to building a Multi-Tenant GPU-enabled service using Omnistrate.

**Serverless workloads**

Omnistrate now supports **serverless workloads** — enabling you to deploy and operate event-driven applications with built-in SaaS features like tenant-awareness, multi-cloud flexibility, full lifecycle automation, and the ability to deploy directly in your customers’ cloud accounts. Keep your existing [serverless framework](https://github.com/serverless/serverless) definitions, Omnistrate takes care of everything else, no re-architecture required


#### Additional Improvements


- We’ve expanded **cost insights support for Azure and GCP**, giving you better visibility and control over multi-cloud spend. Omnistrate aggregates and normalizes cost data across providers, helping teams track usage, analyze trends, and optimize costs more effectively across clouds. Check out our latest blog post, where we dive into how Omnistrate delivers Smarter Cost Controls for AI Infrastructure.

- We’ve improved **failure detection for Load Balancer resources** to provide more accurate diagnostics and alerts when a Load Balancer fails to provision or becomes unhealthy, helping you troubleshoot faster and maintain high availability.

- We’ve enhanced **Docker Compose support** by enabling automatic import of .env files, allowing for cleaner and more consistent management of environment-specific configurations during service deployment.

- We’ve released **Launch Instance on Behalf of a Customer**, improving our integration capabilities for the platform and .  This update makes it easier to launch services for customers without requiring direct interaction, ideal for onboarding and managed services.

- We’ve added support for referencing **specific Git commits in Terraform stacks**. This allows greater control over the exact version of infrastructure code deployed, ensuring reproducibility and stability in CI/CD pipelines.

- In compliance with GDPR, we’ve implemented a feature that allows **end customers to delete their accounts** directly through the SaaS Portal. This gives users full control over their personal data, ensuring secure and permanent account deletion in line with privacy standards.

- Other UX improvements:

  - Introduced cost explorer with usage breakdowns and filters.

  - Added option to auto-verify users during creation, removing the need for manual verification.

  - Instance-level alert indicators are added to the Instances List view for service providers.

  - Subscription Plan page redesigned with clearer structure.

  - Version History page performance improved.

  - Redesigned Tenant Billing page for clearer billing status.

  - Cloud account connect/disconnect events are now audit-logged.

  - License status now shows when it's about to expire.

  - Service providers can now edit custom networks.

  - Service plan dropdowns are now searchable by typing

  - Added Payment Term and Due Date fields to invoice list.

***Notice***: **Omnistrate-Hosted** service plans are now restricted to users with an active, eligible subscription plan and a **payment method configured** in Omnistrate.

Explore these new features today and elevate your SaaS experience with Omnistrate!

<br/>


### Omnistrate Community


[![Omnistrate Community GitHub](/images/posts/omnistrate-platform-update-april-2025-2.png)](https://www.youtube.com/live/v3qEqlf64SM)

We're thrilled to spotlight the Omnistrate Community GitHub — your central hub for open-source examples, best practices, and hands-on guides for building and operating SaaS products with Omnistrate.

Whether you're just getting started or looking to push the boundaries with advanced use cases, the community repo has something for you.

**New Highlights**:

- **Slurm as a Service**: Want to offer Slurm in a SaaS model? The [omnistrate-community/slurm](https://github.com/omnistrate-community/slurm) repo shows how to run the popular HPC workload manager using Omnistrate. It walks through defining Slurm as a managed resource, setting up tenant-specific control planes, and automating lifecycle operations — while Omnistrate handles multi-tenancy, observability, and upgrades.

- **Serverless Framework Integration:** Deploy and manage event-driven services using the [Serverless Framework](https://github.com/omnistrate-community/serverless-framework) — now fully compatible with Omnistrate’s managed infrastructure and multi-cloud support. This integration simplifies building scalable, serverless SaaS platforms. Check out our latest blog post to learn how you can get started in minutes.

- **GPU Slicing for Multi-Tenant Services with GPU slicing**: Explore our step-by-step guide to building a [GPU Slicing for Multi-Tenant Deployments](https://github.com/omnistrate-community/gpu-slicing-example) using Omnistrate. This example covers tenant isolation, GPU-backed infrastructure provisioning, and workload scaling — perfect for AI training, rendering, or any compute-heavy service.

👉 Dive in now at [github.com/omnistrate-community](https://github.com/omnistrate-community)

<br/>


### 🎥 Live from AWS: AI for Builders and Founders!


[![AI for Builders and Founders](/images/posts/omnistrate-platform-update-april-2025-3.jpg)](https://www.youtube.com/live/v3qEqlf64SM)

ICYMI: AWS, Omnistrate, and other AWS partners discussed the real-world challenges of building AI applications—and what it takes to turn them into scalable, multi-tenant SaaS products.

What You'll Learn:

  - Proven strategies for AI application design in the cloud

  - Insights into "Agent as a Service" and accelerating deployment with SaaS best practices

  - Launching your solution via the AWS Marketplace

[👉 Watch the recording on YouTube](https://www.youtube.com/live/v3qEqlf64SM)

<br/>


### Microsoft AI Cloud Partner Program & Azure Marketplace


We’re excited to celebrate Omnistrate’s growing partnership with Microsoft! As a co-sell enabled partner within the Microsoft ISV Success Program and a proud member of the Microsoft AI Cloud Partner Program, Omnistrate is deepening its collaboration with the Azure ecosystem by bringing the Omnistrate platform to Azure Marketplace. This makes it even easier for Microsoft customers to build, deploy, and scale their SaaS products on Azure. In fact, three of our customers are on track to have their first Azure offers in production this month.

This marks a major milestone in our multi-cloud journey.

<br/>


### 🚀 Omnistrate is Headed to SaaStr Annual 2025!


We’re thrilled to be attending SaaStr Annual 2025—and we’re especially excited to meet SaaS builders, platform teams, and product leaders who are ready to accelerate their SaaS journey.

Whether you’re launching your first product or scaling globally, Omnistrate can help you:

- 🚀 Launch SaaS products faster without building your own control plane

- 🌐 Support BYOC, air-gapped, or marketplace-ready deployments

- 🤖 Automate tenant-aware operations and reduce operational overhead

Looking forward to great conversations, big ideas, and all things SaaS at SaaStr! 💬

<br/>


### About Omnistrate


We are the Operating system of your SaaS, offering enterprise-grade capabilities: automated provisioning, serverless capabilities, auto-scaling, billing, monitoring, centralized logging, self-healing, intelligent patching and much more!

We also have [amazing docs][9], a [Slack community][10], a [YouTube channel][11], Twitter (whoops, [X][12]) and of course a [LinkedIn page][13] where you can follow us to stay updated with our latest news

  [9]: http://docs.omnistrate.com
  [10]: https://join.slack.com/t/cloudnative-u5h1399/shared_invite/zt-1qf3cgi37-lCV1vKJlrBioqGuVjKBtyw
  [11]: https://www.youtube.com/@omnistrate
  [12]: https://twitter.com/omnistrate
  [13]: https://www.linkedin.com/company/omnistrate/
