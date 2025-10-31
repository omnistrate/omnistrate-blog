---
title: Omnistrate Platform Update (January 2025)
tags: 'cloud, platform, product-release, SaaS, update'
date: '2025-02-19 22:55:17'
author:
  name: Pablo Berton
  email: pberton@omnistrate.com
  picture: ''
excerpt: "\U0001F680 Exciting New Features in Omnistrate We’re thrilled to introduce several powerful updates that enhance the Omnistrate platform! Revamped SaaSBuilder We have revamped SaaSBuilder!"
slug: omnistrate-platform-update-january-2025
readTime: 4
coverImage: /images/posts/omnistrate-platform-update-january-2025-1.png
category: Product Updates
---


## 🚀 Exciting New Features in Omnistrate


![Omnistrate Updates](/images/posts/omnistrate-platform-update-january-2025-1.png)

We’re thrilled to introduce several powerful updates that enhance the Omnistrate platform!

**Revamped SaaSBuilder**

We have revamped **SaaSBuilder**! The customer portal where your users access and manage SaaS offerings now offers a faster, more intuitive experience. With a unified interface, improved visibility, and optimized workflows, users can manage deployments effortlessly. We have also improved visibility across subscriptions and resources, making it easier to track and monitor deployments. Experience a smoother, more efficient way to interact with your SaaS offerings. See a [demo of the reimagined SaaSBuidler](https://www.youtube.com/watch?v=isTGi8tQA2w) on our YouTube channel.

**Google Cloud Shell Support**

Omnistrate now supports **Google Cloud Shell** for onboarding GCP Cloud Accounts, streamlining the setup process with a secure, browser-based terminal. This enables users to quickly configure and integrate their GCP environments without needing local installations or complex configurations. By leveraging Cloud Shell, Omnistrate ensures a seamless and efficient onboarding experience, allowing teams to focus on deploying and managing their cloud resources with minimal friction. To see a demo on how to set up your GCP Cloud account, visit our [YouTube channel](https://www.youtube.com/watch?v=isTGi8tQA2w).

**New Action Hooks**

We have introduced new **action hooks** to support more complex scenarios such as clean shutdowns, upgrade preparations, and long restores. These enhancements provide greater flexibility in managing SaaS operations by allowing customized actions at key lifecycle stages. To see the full list of available action hooks and how they can be implemented, visit our [documentation](https://docs.omnistrate.com/build-guides/actionhooks/).

**_Deprecation Notice_**

In **30 days**, we will be **removing the capability to onboard Cloud Accounts with Terraform for GCP**, making Google Cloud Shell the preferred method for onboarding new GCP Cloud Accounts. This change ensures the best onboarding experience. Existing onboarded accounts will not be affected, but the Terraform stack will not receive further updates.


### Additional Improvements ###


- **AWS Cloud Account Onboarding:** CloudFormation is now the only supported method for onboarding AWS Cloud Accounts.
- Added support for specifying memory and CPU requests/limits as configurable parameters for multi-tenant offerings.
- Enabled **custom DNS configuration** via input parameters, simplifying the operation of allowing your customers to set up a custom DNS for an HTTP service.
- Strengthened security validation measures for **custom DNS configurations**.
- Improved consistency on the instance and **fleet health status** reporting.
- Reduced permissions for onboarding Cloud Service Accounts for **Bring Your Own Account (BYOA)**.
- Added the capability to **delete customer accounts**.
- New **Bootstrap debug events** included on the workflows, providing visibility into deployment cell setup.
- Introduced comprehensive **audit logging across all services**.
- **Enhanced Fleet UI** with improved observability, refined health status indicators, alerts in instance view, and predefined filters for improved Fleet management.
- **Other UX Improvements**
    - Simplified **Storage Resource** creation and management.
    - Added **subscription details** to Alarm Notifications.
    - Enabled **renaming** of Custom Network configurations.
    - Moved **Tenant Billing** to Manage Account for easier access.
    - Added Instance ID and direct links in **Audit Logs**.
    - Improved UX for **Password Setup/Reset**.


Explore these new features today and elevate your SaaS experience with Omnistrate!

---

### Building Open-Core SaaS: Best Practices & Lessons from 2025


In this insightful session from Cloud Native Live, industry experts delve into the strategies and challenges of building open-core SaaS services in 2025. The discussion covers best practices, technological advancements, and real-world examples to guide organizations in successfully implementing open-core models. Whether you're a developer, product manager, or tech enthusiast, this [video](https://www.youtube.com/live/g1CbFW49OKY) offers valuable perspectives on the future of SaaS development. 


### SaaS Mondays: A New Community for SaaS Builders & Leaders!


We’re excited to announce **SaaS Mondays**, a community dedicated to everything SaaS—from technical hurdles in building and operating scalable platforms to business strategies that drive growth and success.

Whether you’re a Founder, Engineer, GTM Leader, Investor, this group is your space to:

- 💡 Discuss **real-world SaaS challenges & solutions**
- 📈 Share insights on **business models, pricing, and scaling**
- 🔧 Explore how **technical decisions impact business outcomes**
- 🎤 Learn from **top SaaS builders and operators**

Join the conversation, connect with like-minded professionals, and help shape the future of SaaS!

**👉 [Join SaaS Mondays LinkedIn Group](https://www.linkedin.com/groups/9880017/)**

Let’s make **Mondays the best day of the week for SaaS!** 🚀


### About Omnistrate


We are the Operating system of your SaaS, offering enterprise-grade capabilities: automated provisioning, serverless capabilities, auto-scaling, billing, monitoring, centralized logging, self-healing, intelligent patching and much more!

We also have [amazing docs][9], a [Slack community][10], a [YouTube channel][11], Twitter (whoops, [X][12]) and of course a [LinkedIn page][13] where you can follow us to stay updated with our latest news

  [9]: http://docs.omnistrate.com
  [10]: https://join.slack.com/t/cloudnative-u5h1399/shared_invite/zt-1qf3cgi37-lCV1vKJlrBioqGuVjKBtyw
  [11]: https://www.youtube.com/@omnistrate
  [12]: https://twitter.com/omnistrate
  [13]: https://www.linkedin.com/company/omnistrate/
