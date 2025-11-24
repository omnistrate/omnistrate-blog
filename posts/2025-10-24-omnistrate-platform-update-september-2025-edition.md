---
title: Omnistrate Platform Update - September 2025 edition
tags: 'Cloud, Platform, Product-release, SaaS, Update'
date: '2025-10-24  23:25:25'
author:
  name: Pablo Berton
  email: pberton@omnistrate.com
  picture: ''
excerpt: >-
  Omnistrate now makes it seamless to distribute and install your software in air-gapped or customer-managed environments with the new On-Prem Distribution Channel. This unifies the experience of delivering your product across cloud and on-prem setups—preserving the same automation, security, and lifecycle management everywhere.
readTime: 7
coverImage: /images/posts/omnistrate-platform-update-august-2025-edition-1.png
category: Product Updates
---

## 🚀 Exciting New Features in Omnistrate 

![Omnistrate Updates](/images/posts/omnistrate-platform-update-september-2025-1.png)

### 🏢 On-Prem Distribution Channel
Omnistrate now makes it seamless to distribute and install your software in **air-gapped or customer-managed environments** with the new **On-Prem Distribution Channel**.This unifies the experience of delivering your product across cloud and on-prem setups—preserving the same automation, security, and lifecycle management everywhere.

With the **On-Prem Installer**, you can:

Package and deliver fully self-contained deployments for isolated or restricted networks.
Ensure consistent version control across air-gapped and connected environments.
Maintain unified visibility, governance, and control across any distribution channel including On-Prem via one unified control plane.
Delivering **enterprise-ready software** through any distribution channel has never been easier. Explore an [example](https://github.com/omnistrate-community/examples/blob/main/docs/onprem/README.md) on how to setup an On-Prem Distribution Channel from Helm chart.

### 📂 Multi-Cloud Shared File Storage Support
Omnistrate now supports **network file storage as a managed resource** in all major Cloud Providers, enabling you to build services that require persistent, shared file systems without worrying about underlying infrastructure.

No matter where your service runs—AWS, GCP, or Azure—Omnistrate automatically provisions, configures, and manages the storage backend for you.

You define *what* your service needs; Omnistrate handles *how* it's provisioned.

### 🏠 OmniDashboard - Dashboard for Growth, Usage & Ops Intelligence
The new [OmniDashboard](https://omnistrate.cloud/signin?destination=%2Fservices) brings together every aspect of your product's performance — signups, deployments, usage, cost, revenue, and operational health — into a single, unified view.

This new dashboard helps you stay connected to both your business and your operations, all in one place.

![OmniDashboard](/images/posts/omnistrate-platform-update-september-2025-2.png)


### Additional Improvements
**Build faster**

- **Get Compose Spec of a Service Plan** – Retrieve the full     Compose specification directly from service plans for faster debugging, validation, and version tracking.
- **Swytchcode Integration** – Generate tailored SDKs for Omnistrate using AI-powered Swytchcode, reducing the effort to build custom customer-facing UIs.

**Improved operations**

- **Prepare Node Pool Before Upgrade** – Added pre-upgrade validation to ensure node pools are healthy before upgrades, reducing downtime and speeding up maintenance.
- **Workflow Restart Option** – Restart workflows directly in the platform to simplify recovery from transient issues and enable quick reruns.

**Improve your service reliability**

- **Validate Node Health Before Replacement** – Added a final verification step before node replacements to prevent unnecessary churn and improve service availability.
- **Custom Network Status** – Enhanced visibility into custom network states to simplify diagnosis and troubleshooting of 
connectivity issues.

**More options for FinOps**

- **Usage Metering Dashboard** – New dashboard for visualizing usage and billing metrics, providing clearer insights into consumption and financial performance.
Explore these new features today and elevate your SaaS Product with Omnistrate.

![Section Image](/images/posts/omnistrate-platform-update-september-2025-3.jpeg)

### New Omnistrate's "Skills"
Managing modern infrastructure is complex. Engineers juggle speed, reliability, and cost efficiency—often buried in manual tasks. Omnistrate's MCP Server, now empowered by **Skills**, changes that.

[Skills](https://claude.com/blog/skills) are pre-built, ready-to-use instructions that encapsulate your most common DevOps and SRE tasks, making infrastructure management intuitive, accessible, and reliable.

**Handle real-world scenarios:**

- **Onboarding a new service:** Omnistrate Skills allow agents to bootstrap repositories, generate Dockerfiles/manifests, and deploy with CI/CD flows in moments.
- **Iteration & debugging:** Omnistrate Skills instantly retrieve logs, trace deployments, and feed data to AI agents for suggested fixes.
- **Incident response:** Omnistrate Skills allow to detect, triage, and update your team on service issues, highlighting recurring risks and costs.

**Practical application:**

See an example [spec](https://github.com/omnistrate-community/examples/blob/main/compose/services/flowise.yaml) that Omnistrate's new FDE skill generated for deploying [Flowise](https://github.com/FlowiseAI/Flowise).

Below is the live transcript from a session in Claude Code on how it leveraged the new skills to build and iterate on the [Flowise](https://github.com/FlowiseAI/Flowise) PaaS.

![Skills Demo 1](/images/posts/omnistrate-platform-update-september-2025-4.png)


![Skills Demo 2](/images/posts/omnistrate-platform-update-september-2025-5.png)

![Skills Demo 3](/images/posts/omnistrate-platform-update-september-2025-6.gif)

Integrate Omnistrate Skills with your existing solution to streamline your unlock your distribution channels.



👉 [Follow our simple setup instructions to get started today!](https://docs.omnistrate.com/getting-started/mcp-server/#using-skills)

![Section Image](/images/posts/omnistrate-platform-update-september-2025-7.png)

We're **open-sourcing our AI instruction prompts**—structured guidance that helps your AI agents fully leverage **Omnistrate MCP tools**. These prompts show how agents can assist in building your services and infrastructure, automating workflows, and extending capabilities to operate your platform.

### Agent Instructions to interact with Omnistrate
You can explore and contribute to them at [omnistrate-oss/agent-instructions](https://github.com/omnistrate-oss/agent-instructions).

To try these instructions in practice, check out the [Getting Started with the MCP Server guide](https://docs.omnistrate.com/getting-started/mcp-server/) to see how to integrate them with your favorite AI tools.

### Omnistrate Community Examples
The [Omnistrate Community Examples repository](https://github.com/omnistrate-community/examples) is a collaborative, open-source initiative aimed at simplifying the deployment of SaaS applications using the Omnistrate platform. It offers a collection of Docker Compose and YAML configuration files, along with detailed documentation, to guide developers in building and deploying various services as Software-as-a-Service offerings. This repository serves as a valuable resource for the community, providing ready-to-use configurations, best practices, and integration examples to accelerate development processes. By fostering a collaborative environment, the Omnistrate community encourages contributions and knowledge sharing, enhancing the collective expertise and innovation within the open-source ecosystem.



👉 [Check the open source project](https://github.com/omnistrate-community/examples)



## Meet us at KubeCon

![Section Image](/images/posts/omnistrate-platform-update-september-2025-8.png)

As AI reshapes software delivery, the next frontier isn't just building great products — it's delivering them anywhere. The control plane behind it will define tomorrow's winners.

Meet us at **KubeCon 2025** and see how **Omnistrate** is redefining software distribution across clouds, regions, and customer environments.

📅 Let's connect, exchange ideas, and shape the next era of intelligent software delivery — together.

👉 [Book a time with us](https://calendly.com/omnistrate)



## Meet us at AWS re:Invent
![Section Image](/images/posts/omnistrate-platform-update-september-2025-9.png)

**AI is redefining how software is delivered and monetized — and we're bringing that conversation to Vegas.**

Catch us **live at AWS re:Invent 2025 (Tuesday, 3PM)** for two sessions on:

- *AI vs. SaaS — or the Next Chapter of Software?*
- *Open Source to Open Core — balancing community and commercialization*
Stop by our **meeting space** to connect, share ideas, and see how **Omnistrate** is helping companies deliver anywhere.

✨ **Let's meet at re:Invent and shape the future of software delivery — together.**


👉 [Book a time with us](https://calendly.com/omnistrate)

![Section Image](/images/posts/omnistrate-platform-update-september-2025-10.png)

For years, SaaS revolved around apps with fixed workflows. Today, the focus is shifting toward outcomes powered by AI agents. Yet as applications evolve, the SaaS distribution layer—covering deployment, tenancy, packaging, infrastructure, and billing—remains just as vital. In fact, AI agents make it even more complex.

In the Agentic SaaS group, we explore the challenges of building SaaS and why the next decade will hinge on treating agents and models as first-class citizens. If you're scaling a SaaS—or planning to distribute AI agents—join us to share experiences, discuss best practices, and support the broader community!

🌟 [Join the Linkedin group](https://www.linkedin.com/groups/9880017/)

**Don't miss our next episode!**

👉 [Watch the full series and subscribe](https://www.youtube.com/playlist?list=PLT2Zisspnj0fsEqkag0AtmPnw3mRfF3j_)



### About Omnistrate
We are the **Developer platform to build your software distribution channels**, aka CoPilot for Platform teams from managing tenants, subscriptions, deployments, infrastructure including automating Day-2 operations and seamless integration with your favorite developer tooling either Open Source or SaaS or AI Agents.

We also have extensive [documentation](https://docs.omnistrate.com/), a [Slack community](https://cloudnative-u5h1399.slack.com/join/shared_invite/zt-1qf3cgi37-lCV1vKJlrBioqGuVjKBtyw#/shared-invite/email), a [YouTube channel](https://www.youtube.com/@omnistrate), and [LinkedIn](https://www.linkedin.com/company/omnistrate/posts/?feedView=all) page where you can follow us to stay updated with our latest news.