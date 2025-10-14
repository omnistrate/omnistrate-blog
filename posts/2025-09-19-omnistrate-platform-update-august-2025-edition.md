---
title: Omnistrate Platform Update - August 2025 edition
date: '2025-09-19 22:01:13'
author:
  name: Pablo Berton
  email: pberton@omnistrate.com
  picture: ''
excerpt: "Exciting New Features in Omnistrate Omnistrate MCP tool We're excited to introduce the Omnistrate MCP tool, designed to seamlessly connect your favorite AI agents with Omnistrate."
slug: omnistrate-platform-update-august-2025-edition
---


## 🚀 Exciting New Features in Omnistrate


![Omnistrate Updates](https://mcusercontent.com/08ffbac64293e1abc50999571/images/e3265e54-c7c4-75a6-3b3b-6cd7c05a2ad6.png)


### Omnistrate MCP tool


We're excited to introduce the **Omnistrate MCP tool**, designed to seamlessly connect your favorite AI agents with Omnistrate. Whether you're building a new service or resolving a production issue, the MCP tool gives your agents secure, direct access to Omnistrate resources. This means faster onboarding for new services, consistent configurations, and smarter automation—without sacrificing governance or security.

By leveraging the MCP tool, your agents can accelerate troubleshooting by automatically pulling context, logs, and resource details, while also guiding you through complex debugging steps. This integration reduces operational friction, shortens resolution cycles, and empowers your teams to act with agility—all while keeping the power of Omnistrate's automation and lifecycle management at the core of your workflows.


### Custom Kubernetes Amenities


You can now **customize the base Amenities for each Kubernetes cluster**, giving you more control over how common services and capabilities are provisioned. This flexibility lets you tailor clusters to the specific needs of different environments or tenants—whether that means enabling extra monitoring, fine-tuning security, or streamlining performance. With per-cluster customization, you reduce overhead, improve governance, and ensure every workload runs with exactly the right supporting services.


### Simplified Terraform Integration


Omnistrate now makes **Terraform** integration seamless by allowing you to reuse existing stacks and modules, while **dynamically injecting variables** at deployment time to manage environment-specific parameters. This eliminates costly rewrites, accelerates onboarding, and combines Omnistrate's governance and automation with Terraform's flexibility—delivering faster iterations, consistent deployments, and simplified day-2 operations.


### Additional Improvements


**Build faster**

- **Webhooks: Test and Logs**: You can now test webhook integrations and inspect delivery logs directly, giving your team better visibility into events and enabling faster troubleshooting. You can perform this in the UI or with a new CLI command.
- **CLI Command for Evaluating Omnistrate Expressions**: A new CLI command allows you to evaluate Omnistrate expressions in the context of a deployment, making testing and validation faster and simpler.

**Improved operations**

- **Resend Verification Email**: Admins can resend verification emails to unverified customers, ensuring smoother onboarding and reducing friction during account setup.
- **Reduced Permissions for Azure Bootstrap**: Bootstrap operations on Azure now require fewer permissions, simplifying setup and minimizing the risk of overly broad access.
- **Batch Upgrade Parallelism**: Upgrade multiple deployments in a single upgrade batch in parallel, accelerating maintenance and reducing downtime for large deployments.
- **Expanded Deployment Health Diagnostics**: More internal diagnostic information and health status visibility on deployment health and monitored entities gives your teams deeper insights to identify and resolve issues quickly.

**Improve your service reliability**

- **Enhanced Failover and Alarm Event Information**: Failover and alarm events now include contextual details explaining why they occurred, improving root cause analysis and operational visibility.
- **Enhanced Alarm Details for Health-check Failures**: Alarms triggered by health-check failures now include additional details, such as timeout information, improving troubleshooting and response times.
- **Affinity Rules for CoreDNS**: CoreDNS provisioned with Omnistrate now includes affinity rules to prevent scheduling on service nodes, reducing the risk of DNS resolution failures in Kubernetes clusters managed with Omnistrate.

**More options for FinOps**

- **Replica Count Dimension for Billing**: Billing calculations can now incorporate the replica count dimension, providing more options for usage-based billing out of the box.
- **Billing Provider Configuration via Compose and Service Plan Spec**: You can now configure the billing provider directly from Compose and Service Plan specifications, streamlining billing setup and management.

Explore these new features today and elevate your SaaS product with Omnistrate!

<br/>

![Section Image](https://mcusercontent.com/08ffbac64293e1abc50999571/images/2734e044-d524-edab-762a-822365d105be.jpeg)

Managing modern infrastructure is harder than ever. Teams must balance speed, reliability, and cost efficiency while dealing with complex APIs, configuration drift, and operational incidents. Traditional approaches leave engineers buried in manual tasks and reactive firefighting instead of driving innovation.

Omnistrate's new **MCP server** changes that. Built on the Model Context Protocol and powered by AI-driven agents, it enables a new way of operating infrastructure—one where interacting with your services is as simple as having a conversation. . As outlined in this [article](https://blog.omnistrate.com/posts/159), this capability goes beyond automation by making DevOps and SRE workflows more intuitive, accessible, and reliable.


### Revolutionize Your DevOps and SRE with AI-Driven Operations


With the MCP server, agents can:

- **Provide actionable insights** across cost, reliability, and operations with FinOps, DevOps, and RCCA reports.
- **Directly inspect, debug, and act** across environments without requiring deep cloud or Kubernetes expertise.
- **Automate routine workflows** so teams can focus on features rather than infrastructure management.
- **Surface trends and anomalies** so you can take faster, data-driven decisions.

**Real-World Scenarios**

- **Onboarding a new service**: Agents can bootstrap repositories, generate Dockerfiles or manifests, and deploy with environment promotion and CI/CD flows.
- **Iteration & debugging**: When rollouts fail, agents retrieve logs, trace deployment states, and suggest fixes—eliminating the need to navigate multiple consoles.
- **Incident response**: If a service degrades, agents detect and triage the issue, build a timeline, and post updates into Slack or your alerting channel, while reports highlight recurring risks and costs.

**Why This Matters**

By combining governance, automation, and AI-driven workflows, the Omnistrate MCP server delivers faster time to value, improves visibility for both engineering and leadership, and reduces operational friction. It's not just another feature—it's a step toward making DevOps and SRE more intuitive, accessible, and reliable.

[👉 Learn how to revolutionize Your DevOps and SRE](https://blog.omnistrate.com/posts/159)

![Section Image](https://mcusercontent.com/08ffbac64293e1abc50999571/images/1d6df71d-25ca-1713-e01a-c8dd3fc03771.png)

The **Omnistrate MCP tool (stdio) is fully open source**, enabling you to explore, extend, and integrate it into your own workflows. This transparency ensures that teams can trust, contribute to, and customize their AI-driven operations.

Learn how to configure the MCP server on your favorite tools following the instructions on the [repo](https://github.com/omnistrate-oss/omnistrate-ctl?tab=readme-ov-file#configuring-the-omnistrate-mcp-server).

[👉 Check the open source project](https://github.com/omnistrate-oss/omnistrate-ctl?tab=readme-ov-file#configuring-the-omnistrate-mcp-server)

![Section Image](https://mcusercontent.com/08ffbac64293e1abc50999571/images/9f4b94bb-c6a9-4198-2e21-c103b39d8b33.png)

We renamed our "SaaS Mondays, Live on Fridays" series to "Practical Aspects of Agentic SaaS" to better align with our community aimed for SaaS builders, operators, and leaders who are shaping the future of software and agent delivery.

For years, SaaS was about apps with static workflows. Today, it's shifting to outcomes driven by AI agents. But while apps evolve, the distribution layer of SaaS—deployment, tenancy, packaging, infrastructure, billing—remains just as critical. In fact, agents make it more complex.

In this group, we break down the pitfalls of building SaaS, and why the next decade of SaaS depends on treating agents, and models as first-class citizens. If you're scaling a SaaS—or planning to distribute AI agents—let's come together to share our experiences with each other, discuss the best ways forward and help the broader community!


### Episode 13 – From Chaos to Control


The talk discusses how SaaS (Software as a Service) companies can transition "from chaos to control" by implementing robust SaaS control planes, which are critical for managing scale, speed, and security—especially across multi-tenant systems and in the era of agentic AI. Industry leaders from **Omnistrate** and **AWS** share historical context, best practices, and evolving requirements for control planes, emphasizing their foundational role in modern SaaS businesses.

[👉 Watch Episode 13](https://www.youtube.com/watch?v=Wp1iEZnhJ-o)

Don't miss our next episode!

[👉 Watch the full series and subscribe](https://youtube.com/playlist?list=PLT2Zisspnj0fsEqkag0AtmPnw3mRfF3j_)


### About Omnistrate


We are the Developer platform to build your software distribution channels (**OnPrem**, **BYOC**, **PaaS**, **SaaS**, **Agentic SaaS**). You can also think of it as a copilot for platform teams from managing tenants, subscriptions, deployments, infrastructure including automating Day-2 operations to seamless integration with your favorite developer tooling either open-source or **SaaS** or **AI Agents**.

We also have extensive [docs](http://docs.omnistrate.com/), a [Slack community](https://join.slack.com/t/cloudnative-u5h1399/shared_invite/zt-1qf3cgi37-lCV1vKJlrBioqGuVjKBtyw), a [YouTube channel](https://www.youtube.com/@omnistrate), and [LinkedIn page](https://www.linkedin.com/company/omnistrate/) where you can follow us to stay updated with our latest news.

