---
title: Omnistrate Platform Update - July 2025 edition
tags: 'cloud, platform, product-release, SaaS, update'
date: '2025-08-21 21:29:22'
author:
  name: Pablo Berton
  email: pberton@omnistrate.com
  picture: ''
excerpt: >-
  Exciting New Features in Omnistrate We’ve expanded the power and flexibility
  of deployment cell management, giving you greater control over how workloads
  are isolated, maintained, and accessed.
slug: omnistrate-platform-update-july-2025-edition
readTime: 7
coverImage: /images/posts/omnistrate-platform-update-july-2025-edition-1.png
---


## 🚀 Exciting New Features in Omnistrate


![Omnistrate Updates](/images/posts/omnistrate-platform-update-july-2025-edition-1.png)

We’ve expanded the power and flexibility of deployment cell management, giving you greater control over how workloads are isolated, maintained, and accessed. These improvements reduce operational friction, strengthen governance, and ensure your teams can work faster and smarter.

You can now **securely access, visualize, and delete your Deployment Cells** directly from your Control Plane, eliminating the need for complex networking workarounds or manual cluster access setups—even for BYOC deployments. This capability gives your teams faster, more reliable entry points for troubleshooting and operational changes. By reducing the friction in reaching isolated workloads, you cut resolution times, improve service availability, and empower your operations teams to act with agility, whether managing a single tenant or an entire fleet.

You can now seamlessly **adopt existing Helm chart deployments** as Omnistrate-managed deployment instances without costly rework or downtime. By adopting these workloads as native resource instances, you gain centralized control, consistent governance, and unified monitoring across all environments—cloud or on-prem.

This streamlined onboarding reduces operational overhead, accelerates time-to-value, and ensures that even legacy deployments benefit from Omnistrate’s automation, security, and lifecycle management capabilities.

We’ve taken your feedback to heart and introduced the **Interactive Debug Tool**, designed to make diagnosing deployment issues simpler and faster for services constructed with Terraform. Instead of combing through logs or manually tracing configurations, you can now interactively inspect resources and logs in a user-friendly interface. This drastically shortens troubleshooting cycles and reduces operational overhead.


### Additional Improvements


**Build faster**

- **Webhook Debug Tools**: Trace payloads, inspect delivery attempts, and replay events.
- **Sidecar Security Capability Support**: Apply capability to security context settings for sidecar containers, enabling finer-grained control over their permissions and runtime behavior.
- **New System Parameters for Environment ID / Type**: A new system parameter now exposes environment ID and type, making it easier to automate environment-specific workflows.

**Improved operations**

- **Delete and Manage Deployment Cells**: Full control over your deployment cells, including deletion and reorganization directly from Omnistrate.
- **Audit Log for Nodepool Cleanup**: Every nodepool cleanup action is now recorded in an audit log, giving you full visibility into infrastructure changes.
- **Failover Notifications**: Subscribe to failover notifications and receive real-time alerts whenever services switch over for resiliency.

**Improve your service reliability**

- **Pod Disruption Budgets for Improved Availability**: Omnistrate now automatically applies Pod Disruption Budgets to Compose-defined services to protect against multiple pods becoming unavailable during node draining or maintenance.

**Improve your Customer Portal**

- **Regex Validation for API Parameters**: Supports regex-based validation for API parameters directly within the customer portal—no coding required. Enforce precise input formats for APIs and deployment forms.

**Better usability for your team**

- **Version Set Name Management**: Rename version sets directly, giving more flexibility in organizing and managing your deployments.
- **Public documentation as machine-readable**: Omnistrate now exposes its public documentation as a machine-readable file at [https://docs.omnistrate.com/llms.txt](https://docs.omnistrate.com/llms.txt), making it directly accessible to LLMs and other AI tools.

Explore these new features today and elevate your SaaS product with Omnistrate!

<br/>

![Section Image](/images/posts/omnistrate-platform-update-july-2025-edition-2.jpg)

Omnistrate helps you turn AI applications into scalable platforms that can be distributed with ease. By handling deployment, scaling, and customer management, it lets you focus on building AI innovation while reaching more users faster. Check the latest features and updates to help you do that:


### Transform AI Infrastructure Deployment from Months to Minutes


We’re excited to showcase how Omnistrate can “print” complete NVIDIA AI/ML platforms across multiple clouds with a single specification. This comprehensive demo features the full NVIDIA OSS stack: TAO Toolkit for training, Dynamo for inference, MinIO for model storage, and Prometheus/Grafana for monitoring.

The specification deploys production-ready infrastructure across AWS, GCP, and Azure GPU-enabled machines with enterprise-grade features including auto-scaling, multi-tenant isolation, and Omnistrate’s optimized node topology. What traditionally takes months of engineering work across multiple teams now deploys in minutes with a single command.

This demo illustrates Omnistrate’s “Control Plane as a Service” approach, enabling teams to build AI/ML pipelines as platforms with full tenant isolation control while Omnistrate handles all infrastructure management. Whether serving external customers or internal teams, the same platform specification provides 10× faster time-to-market and 90% reduced operational overhead.

Perfect for AI/ML teams, platform engineers, and anyone curious about declarative, multi-cloud AI infrastructure. The complete specification, documentation, and deployment guides are available in our community GitHub:

[👉 Check the full service specification](https://github.com/omnistrate-community/nvidia-oss-ai-ml-tech-example)

Ready to “print” your own AI platform? Explore the demo, try it in your environment, and see how Omnistrate makes enterprise-grade AI infrastructure surprisingly simple.


### Cost Insights improvements


Omnistrate’s Cost Insights now provides granular visibility into AI workflows, showing infrastructure usage per deployment, per customer, and per resource—including GPU consumption. This allows teams to identify underutilized GPUs, right-size deployments, and optimize costs without sacrificing performance.


### Maximize GPU utilization with Slicing and MIG


Modern AI infrastructure can significantly reduce costs and improve GPU resource utilization through smart sharing strategies like time-slicing and NVIDIA’s Multi-Instance GPU (MIG). Read more on the benefits of using such technologies on our [recent blog](https://blog.omnistrate.com/posts/155).

Implementing such strategies manually involves considerable complexity, but platforms like Omnistrate streamline deployment, orchestration, and ongoing management. Learn how to configure your service to leverage these technologies in our [technical documentation](https://docs.omnistrate.com/infra-guides/gpu-slicing/).

<br/>

![Section Image](/images/posts/omnistrate-platform-update-july-2025-edition-3.png)

At Omnistrate, we’re committed to empowering developers and simplifying the journey of building SaaS. Our latest updates to our community projects present how to solve common problems to integrate with Cloud Marketplaces.

This [example](https://docs.omnistrate.com/examples/integrate-billing-with-marketplace/) shows how to integrate SaaS billing with cloud marketplaces, including automated usage metering, subscription management, and exporting data for analysis. As an example of how to integrate with marketplaces, we have an open-source [Clazar usage export recipe](https://github.com/omnistrate-community/usage-export-clazar-recipe), which automates exporting metered to Clazar contracts, streamlining billing workflows.

These resources are open-source and serve as practical guides for developers implementing marketplace billing and usage tracking in SaaS applications using any marketplace or any marketplace provider.

[👉 Check the example in action on the following video](https://www.youtube.com/watch?v=Y4nk05R3_1k)

<br/>

![Section Image](/images/posts/omnistrate-platform-update-july-2025-edition-4.jpg)


### Brownstone Consulting


Omnistrate has partnered with Brownstone Consulting to help software vendors launch secure, compliant, and audit-ready cloud services across AWS, Azure, GCP, and on-prem environments. By combining Omnistrate’s cloud-native control plane, lifecycle automation, and multi-cloud support with Brownstone’s expertise in GDPR, NIST 800-53, SOC 2, ISO 27001, HIPAA, and FedRAMP compliance frameworks, penetration testing, and third-party validation:

For more details, check our recent [announcement](https://blog.omnistrate.com/posts/156).


### Interlynk


By integrating with Interlynk, Omnistrate enhances application security through supply chain integrity checks. Interlynk helps safeguard against vulnerabilities and unauthorized changes, ensuring that every component of your deployment is continuously verified and secure from code to runtime.

<br/>

![Section Image](/images/posts/omnistrate-platform-update-july-2025-edition-5.jpg)

Welcome to this month’s recap of **SaaS Mondays, Live on Fridays** — your premier source for insights from SaaS leaders, founders, and cloud innovators. In this recap, we spotlight the latest episodes, covering core SaaS fundamentals, the evolving role of AI, proven subscription growth models, and customer-led innovation strategies.

**Episode 12 – What is SaaS? Benefits and Business Impact**  
We sat down with [Joshua McKenty](https://www.linkedin.com/in/joshuamckenty/)—legendary cloud architect, OpenStack co-founder, and now CEO of [Polyguard](https://polyguard.ai)—for a high-impact conversation on innovating inside NASA, scaling SaaS from scratch (and from the edge), fighting synthetic identity fraud with AI, and why trust, privacy, and infrastructure are converging in 2025.

[👉 Watch Episode 12](https://www.youtube.com/live/VVMJdjrx7Fw?feature=shared)

**Episode 11 – From Prompt to Product**  
Generative AI is redefining application development—making it faster, more accessible, and more modular. In this episode, [Luke Ferris](https://www.linkedin.com/in/luke-ferris/), CEO of [Origin AI](https://www.theorigin.ai), shares how founders and product leaders can move from idea to working application logic using natural language and structured prompts, while Omnistrate handles deployment, operations, tenancy, metering, billing, and more.

[👉 Watch Episode 11](https://www.youtube.com/live/OcLtP30pRhI)

Don’t miss our next episode!

[👉 Save your spot for our upcoming live session](https://lu.ma/calendar/cal-1IRddx9ZHlBzLO2)

<br/>


### About Omnistrate


We are the Developer platform to build your software distribution channels (**OnPrem**, **BYOC**, **PaaS**, **SaaS**, **Agentic SaaS**). You can also think of it as a copilot for platform teams from managing tenants, subscriptions, deployments, infrastructure including automating Day-2 operations to seamless integration with your favorite developer tooling either open-source or **SaaS** or **AI Agents**.

We also have extensive [docs](http://docs.omnistrate.com/), a [Slack community](https://join.slack.com/t/cloudnative-u5h1399/shared_invite/zt-1qf3cgi37-lCV1vKJlrBioqGuVjKBtyw), a [YouTube channel](https://www.youtube.com/@omnistrate), and [LinkedIn page](https://www.linkedin.com/company/omnistrate/) where you can follow us to stay updated with our latest news.

