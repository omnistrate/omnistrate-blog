---
title: Omnistrate Platform Update (May 2025)
date: '2025-06-10 16:23:04'
author:
  name: Pablo Berton
  email: pberton@omnistrate.com
  picture: ''
excerpt: "Exciting New Features in Omnistrate End-customer SSO support in SaaSPortal End-customer SSO support in SaaSPortal enables it to easily integrate with your customers’ Identity Provider (IdP),..."
slug: omnistrate-platform-update-may-2025
---


## 🚀 Exciting New Features in Omnistrate


![Omnistrate Updates](https://mcusercontent.com/08ffbac64293e1abc50999571/images/f018c676-784a-f2ee-0b93-afd832fbade5.png)

**End-customer SSO support in SaaSPortal** 

End-customer SSO support in SaaSPortal enables it to easily integrate with your customers’ Identity Provider (IdP), allowing secure and unified access management. By linking a customer’s IdP—whether it’s Okta, Azure AD, or any OIDC-compliant provider—users can authenticate using their existing enterprise credentials. This ensures a frictionless login experience for end-users while giving administrators full control over user provisioning, access policies, and session security. SaaSPortal handles the SSO configuration and metadata exchange, streamlining onboarding and reducing the burden of identity management for your SaaS product.

**Per-Subscription Pricing**

We’re excited to announce a major upgrade in our billing system: Per-Subscription Pricing. This powerful new feature allows you to customize pricing at the individual subscription level, giving you the flexibility to support customer-specific exceptions that are especially common during new product launches or pilot programs. Whether it’s offering tailored discounts, special rates for strategic partners, or custom packages for early adopters, Per-Tenant Pricing ensures your billing can adapt to real-world go-to-market needs without disrupting your standard pricing tiers.

**Isolated Kubernetes (K8s)**

We’re introducing a new level of tenant isolation with Isolated Kubernetes (K8s). In addition to our existing isolation options at the pod, VM, and account levels (including Bring Your Own Account), you can now run each service in its own dedicated Kubernetes installation. This model is especially valuable for large, complex systems that require cluster-level features, advanced networking, or dedicated shared resources. Isolated K8s gives you another powerful way to package and distribute your services while maintaining high-level abstractions—Omnistrate continues to manage the infrastructure so you can focus on your product, not the plumbing.

**Additional Improvements**

- **Enhanced UX Navigation**: We’ve rolled out major UX updates to make Omnistrate more intuitive and aligned with your workflows.

- **Support for BYO payment channel**: Empowers each subscription to be linked with a distinct payment method, enabling flexible integration with your pre-existing billing systems. Allows mapping subscriptions to external billing systems using a custom payer ID.

- **Support for adding custom taints**: Introduces the ability to add taints to Kubernetes node groups, giving you finer control over workload placement and resource segregation when distributing services via Helm or Kuztomize.

- **Improved support for private deployments**: Let your customers toggle deployments between publicly accessible endpoints and private network-restricted modes to meet security or compliance requirements in a self served way.

- **Improved build experience with dry-run capability**: Introduces an early validation command for service plan updates, allowing teams to safely preview changes, catch misconfigurations early, and increase confidence in CI/CD rollouts.

- **GitHub Actions integration for Build from Repository**: Enables full automation of builds from code repositories as part of your CI/CD pipeline, improving development velocity and consistency.

- **Identity Provider (IdP) configuration supported per environment**: Allows the SaaSBuilder for your different environments (e.g., dev, staging, prod) to connect with distinct IdPs, supporting varied authentication strategies for your team.

- **Optimized onboarding for GCP accounts**: Delivers a 10x faster time in initial provisioning time for new accounts and connect/disconnect latency for Onpremise Copilot deployments.

- **Configurable Root EBS Volume Size and Instance Types**: Allows you to define the root volume size and instance type per deployment using input parameters—enabling tailored storage allocation that matches the specific needs of each workload and improving resource efficiency.

- **Storage Usage Alerting**: Adds proactive alerting on storage consumption thresholds, enabling early intervention before reaching critical disk space limits and ensuring consistent service availability.

- **System-Wide Performance Optimizations**: Platform-level improvements have significantly reduced latency across APIs and the UI, delivering a faster, smoother, and more responsive user experience.

**Other UX improvements**

  - Customer portal dashboard now includes detailed deployment insights.

  - Users can now view detailed version info during upgrades and in upgrade history for better context.

  - The selected environment is now preserved when switching between services.

  - In the Fleet dashboard honeycomb chart, instance IDs are now clickable on hover for quicker access.

  - System-managed serverless proxy deployment instances can now be deleted manually.

  - Invoice list now includes Org ID, User Name, and User ID for easier identification.

  - Deprecated versions are hidden by default when launching an instance but can be revealed with a toggle.

<br/>


### Omnistrate Azure Support is now Generally Available


[![Omnistrate Azure Support is now GA](https://mcusercontent.com/08ffbac64293e1abc50999571/images/4df2ff73-9a98-7677-9044-7ac480145e33.png)](https://omnistrate.com)

We’re thrilled to announce Omnistrate’s Azure is Generally Available! Whether you’re migrating an existing service or building something new, our fully managed platform makes it effortless to run on Azure Cloud. From startups embracing Azure for the first time to enterprises expanding into multi-cloud, Omnistrate delivers a smooth, automated, and scalable experience.

In-fact, Omnistrate is now listed on Azure marketplace, making it easier for Microsoft customers to procure Omnistrate Platform.

<br/>


### 📢 Upcoming Event: From Open Source to SaaS: Turning AI Innovation into Scalable Products


Open source is powering the next wave of AI—but turning innovation into a scalable SaaS business is another challenge entirely.

Join us for an expert-led session featuring leaders from AWS, Omnistrate, Anyscale, Confluent, Couchbase, and Onehouse as they share how to:

  - Build scalable, multi-tenant AI apps

  - Monetize open source with usage-based pricing & marketplaces

  - Designing a modern AI compute stack and data layer to scale AI-powered SaaS app

  - Avoid the most common OSS-to-SaaS pitfalls

<br/>

🗓️ Date: Tuesday, June 24th, 1:30-6:00pm PT

📍Location: Join virtually or live from the AWS Office in San Francisco

[👉 Register now](https://lu.ma/4nwzwq0i?utm_source=Newsletter)

<br/>

[![Upcoming Event](https://mcusercontent.com/08ffbac64293e1abc50999571/images/52687898-e37c-6656-a3d0-592739df929a.png)](https://lu.ma/4nwzwq0i?utm_source=Newsletter)


<br/>


### 📣 Introducing our video series:

SaaS Mondays, Live on Fridays!

Every other week, we’re bringing together SaaS founders, builders, and industry experts for candid, in-depth conversations on the topics shaping the future of SaaS. From scaling vertical SaaS businesses to the impact of AI on product architecture and go-to-market, each episode is packed with real-world insights, actionable strategies, and lessons learned from leaders in the field.

Catch up on recent episodes—like building vertical SaaS with Checkly and Plotline, or deep dives into SaaS deployment models and AI-driven innovation. Whether you’re an engineer, product leader, or founder, you’ll find practical takeaways to help you build, scale, and operate SaaS at the next level.

[👉 Watch the full series](https://www.youtube.com/playlist?list=PLT2Zisspnj0fsEqkag0AtmPnw3mRfF3j_)

Don’t miss our next episode coming up June 13th —join us as we dive into one of the most critical aspects of SaaS Growth: Pricing and Packaging. Hear from Fynn Glover, CEO of Schemantic and Bill Tarr, Principal at AWS SaaS Factory discuss strategies and frameworks for pricing innovation.

[👉 Register here for the live link!](https://lu.ma/eykxkrqi)

<br/>


### 🚀Meet with us at Databricks Data and AI Summit!


We're excited to announce that Omnistrate will be attending [Databricks Data + AI Summit](https://www.databricks.com/dataaisummit?scid=701Vp000004h4bmIAA&utm_medium=paid+search&utm_source=google&utm_campaign=21064981634&utm_adgroup=163173395887&utm_content=summit&utm_offer=dataaisummit&utm_ad=736551511155&utm_term=databricks%20data%20and%20ai%20summit&gad_source=1&gad_campaignid=21064981634&gbraid=0AAAAABYBeAjp1pgxLfPPgtt89onUk0NKP&gclid=Cj0KCQjwuvrBBhDcARIsAKRrkjdedmZN8emnfwrXJMJ7bcSynXvsuQIpFVw2eS3kHHX8fez-ovHz6soaAqSgEALw_wcB) in San Francisco, June 9–12!

If you’re planning to be at the Moscone Center, let’s connect! Our team will be on-site to discuss the latest in SaaS deployment, AI-driven innovation, and how Omnistrate can help you accelerate your data and AI initiatives.

[👉 Book time with us](https://calendly.com/omnistrate)

<br/>


### About Omnistrate


We are the operating system of your SaaS, offering enterprise-grade capabilities: automated provisioning, serverless capabilities, auto-scaling, billing, monitoring, centralized logging, self-healing, intelligent patching and much more!

We also have [amazing docs][9], a [Slack community][10], a [YouTube channel][11], Twitter (whoops, [X][12]) and of course a [LinkedIn page][13] where you can follow us to stay updated with our latest news

  [9]: http://docs.omnistrate.com
  [10]: https://join.slack.com/t/cloudnative-u5h1399/shared_invite/zt-1qf3cgi37-lCV1vKJlrBioqGuVjKBtyw
  [11]: https://www.youtube.com/@omnistrate
  [12]: https://twitter.com/omnistrate
  [13]: https://www.linkedin.com/company/omnistrate/
