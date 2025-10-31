---
title: Omnistrate Platform Update (Jun 2025)
tags: 'cloud, platform, product-release, SaaS, update'
date: '2025-07-11 04:43:29'
author:
  name: Pablo Berton
  email: pberton@omnistrate.com
  picture: ''
excerpt: >-
  Exciting New Features in Omnistrate We're thrilled to introduce several
  powerful updates that enhance flexibility, security, and operational control
  across the Omnistrate platform.
slug: omnistrate-platform-update-jun-2025
readTime: 7
coverImage: /images/posts/omnistrate-platform-update-jun-2025-1.png
---


## 🚀 Exciting New Features in Omnistrate


![Omnistrate Updates](/images/posts/omnistrate-platform-update-jun-2025-1.png)

We're thrilled to introduce several powerful updates that enhance flexibility, security, and operational control across the Omnistrate platform.

**Bring Your Deployments (BYD)**

If you've previously onboarded customers by installing your product via **Helm** directly, you can now seamlessly migrate those deployments into Omnistrate with **BYD (Bring your Deployments)**. Simply import the deployment definition and continue managing it as you would with a new deployment. This allows you to unify all tenants under a single control plane, simplifying updates, improving visibility, and reducing the operational burden of maintaining separate, inconsistent deployments.

**Omnistrate Secrets Management**

We're introducing **Omnistrate Secrets Management**, a secure and centralized way to manage secrets per environment. You no longer need to embed credentials into service definitions or have to manually integrate with external secret managers. Instead, define and store secrets directly in the **Omnistrate** platform, making your deployments cleaner, more secure, and easier to manage—all from one place.

**On-Prem Copilot Azure Support**

**On-Prem Copilot** now supports **Microsoft Azure**, completing our vision of full multi-cloud compatibility across **AWS**, **GCP**, and **Azure**. Whether you're deploying in the cloud, on-prem, or in hybrid environments, you can now rely on a consistent operational experience. This unlocks even more flexibility for enterprise customers with diverse infrastructure strategies, ensuring that you can reach them wherever they are.

**Additional Improvements**

***Automation***

- **Offboarding Automation**: Offboarding from the **Omnistrate** is now fully automated and self-serve, reducing risk and simplifying the process. Whether you're evaluating or transitioning away, you can now confidently explore the platform knowing that exit paths are clean, reliable, and hassle-free.

- **GPU Configuration in GCP and Azure**: **Omnistrate** now supports a simpler way to [set up GPU configuration in both **GCP** and **Azure**](https://docs.omnistrate.com/build-guides/gpu-accelerator-configuration), allowing you to specify instance types and accelerators that best suit your workload. Take full advantage of cloud-native **GPU** offerings to run compute-heavy services efficiently and cost-effectively.

- **Helm Chart Values Layering Support**: We've introduced [layered **Helm** values](https://docs.omnistrate.com/getting-started/helm-charts/layered-chart-values), enabling reusable, conditional configurations that simplify management of complex **Helm** charts. This makes it easier to support multi-cloud deployments by customizing parameters based on cloud providers or deployment environments, without duplicating configurations.

***Reliability***

- **Improved isolation between System workload and Application workload**: **Kubernetes** system nodes running core **Control Plane** services are now tainted to prevent unintended scheduling of application pods. Even pods without affinity rules won't land on system-critical nodes, ensuring better isolation and reliability. This is especially useful when deploying via **Helm**, as it enforces stricter boundaries and avoids performance issues or accidental use of nodes that don't meet your service's requirements.

- **Storage Usage Alerts**: Gain visibility into volume health and storage usage for your deployments. **Omnistrate** now monitors attached storage volumes and provides alerts when usage approaches capacity, helping you prevent disruptions and maintain optimal performance.

***SaaSPortal improvements***

- **Custom Order for Input Parameters**: Our no-code deployment forms are now more customizable—you can reorder input parameters to match your preferred structure or highlight key configuration options. This provides a more user-friendly experience for both internal teams and end customers managing deployments.

***Usability***

- **Enhanced UX Navigation and Terminology**: The **Omnistrate** portal now features a more intuitive and streamlined navigation experience, with improved terminology and clearer categorization across the **UI**. References to key components are now consistent and easier to understand, eliminating confusion and making it faster to locate the information you need to manage and operate your services.

- **Performance Optimizations**: We've made significant improvements across the platform to scale our **APIs** for customers, subscriptions, deployment cells, and instances. These enhancements boost overall responsiveness and reduce latency, especially for high-scale fleets, making operational tasks smoother and more efficient.

***Other UX improvements:***

  - You can now terminate multiple workflows in a single action to speed up operations.
  - **Deployment Cells** can now be loaded across all services or filter by a specific one for focused insights.
  - Logs view improved with syntax highlighting and in-log search for easier debugging/troubleshooting.
  - Subscription-specific pricing includes a complete audit trail for improved transparency.
  - Billing status is displayed directly on the **Service Plan** card for quick visibility.
  - **Custom Metrics** charts support negative values for more flexible analysis.
  - **K8s** dashboard access is improved with one-click token copy and launch.

<br/>

![Omnistrate loves OpenSource](/images/posts/omnistrate-platform-update-jun-2025-2.png)


### Omnistrate CTL is now Open Source!


You can now access, contribute to, and customize the **Omnistrate Command Line** directly from our public repository.

[👉 Check out the public CTL Github repo](https://github.com/omnistrate-oss/omnistrate-ctl).

Note: Older **CTL** image repos will continue to function but will no longer receive updates. To stay current, please switch to the new open-source repository.


### Try our Open Source Guide to onboard a new project


We've recently shared a new blog post "[Control Plane: Operating System of Software Distribution](https://blog.omnistrate.com/posts/152)" describing in detail the problem we are trying to solve at Omnistrate. In addition, we have added links to the demos for the different distribution channels, along with links to some technical whitepaper blogs.

We are now releasing an open-source guided example on how to onboard a new service. Want to try it yourself? The guide is free to use and publicly shared with our community.

[👉 Check out the open source step-by-step guide](https://github.com/omnistrate-community/datalab)

<br/>


### New Omnistrate Plans: Better Pricing


At **Omnistrate**, customer feedback is at the heart of our product evolution. We're excited to announce new pricing plans designed with your needs in mind—offering simpler, outcome-based pricing that aligns better with the value you get from the platform. Whether you're just getting started or scaling rapidly, our new plans provide more flexibility and transparency, making it easier to grow with **Omnistrate**.

[👉 Explore our new pricing plans here](https://omnistrate.com/pricing)

<br/>


### 📣 Introducing our video series: SaaS Mondays, Live on Fridays!


Every other week, we're bringing together **SaaS** founders, builders, and industry experts for candid, in-depth conversations on the topics shaping the future of **SaaS**. From scaling vertical **SaaS** businesses to the impact of **AI** on product architecture and go-to-market, each episode is packed with real-world insights, actionable strategies, and lessons learned from leaders in the field.

Catch up on recent episodes—like building vertical **SaaS** with **Checkly** and **Plotline**, or deep dives into **SaaS** deployment models and **AI**-driven innovation. Whether you're an engineer, product leader, or founder, you'll find practical takeaways to help you build, scale, and operate **SaaS** at the next level.

[🎥 Watch the full series and subscribe here](https://youtube.com/playlist?list=PLT2Zisspnj0fsEqkag0AtmPnw3mRfF3j_)

Don't miss our next episode coming up July 11th—join us as we dive into one of the most critical aspects of **SaaS** Growth: **Mastering SaaS Growth Through Subscription Excellence**. Hear from [**Prakash Kadirvelu**](https://www.linkedin.com/in/prakashkadirvelu/): Sr. Director at **CapGemini**, [**Koyel De**](https://www.linkedin.com/in/koyelde/): **SaaS** Strategist at **AWS**, [**Ermin Dzinic**](https://www.linkedin.com/in/ermindzinic/): **SaaS** specialist at **AWS**, and [**Bill Tarr**](https://www.linkedin.com/in/saastarr/): Principal at **AWS SaaS Factory** discuss growth strategies and frameworks for **SaaS**.

[![Mastering Growth Through Subscription](/images/posts/omnistrate-platform-update-jun-2025-3.png)](https://lu.ma/tbadof7f)

[🔗 Register here to get the live link!](https://lu.ma/tbadof7f)

<br/>


### 🚀 Meet with us at GenAI Summit!


We're excited to announce that **Omnistrate** will be attending [**GenAI Summit**](https://genaisummit.ai/) in **Santa Clara**, July 13–17!

[![GenAI Summit](/images/posts/omnistrate-platform-update-jun-2025-4.png)](https://genaisummit.ai/)

If you're planning to be at the **Santa Clara Convention Center**, let's connect! Our team will be on-site to discuss the latest in software distribution (**OnPrem**, **BYOC**, **PaaS**, **SaaS**, **Agentic SaaS**), and how **Omnistrate** can help distribute your App to your customers in days at 1/10th the cost.

[👉 Book a time with us](https://calendly.com/omnistrate)

<br/>


### About Omnistrate


We are the Developer platform to build your software distribution channels (**OnPrem**, **BYOC**, **PaaS**, **SaaS**, **Agentic SaaS**). You can also think of it as a copilot for platform teams from managing tenants, subscriptions, deployments, infrastructure including automating Day-2 operations to seamless integration with your favorite developer tooling either open-source or **SaaS** or **AI Agents**.

We also have amazing [docs](http://docs.omnistrate.com/), a [Slack community](https://join.slack.com/t/cloudnative-u5h1399/shared_invite/zt-1qf3cgi37-lCV1vKJlrBioqGuVjKBtyw), a [YouTube channel](https://www.youtube.com/@omnistrate), [Twitter](https://twitter.com/@omnistrate) (whoops, X) and of course a [LinkedIn page](https://www.linkedin.com/company/omnistrate/) where you can follow us to stay updated with our latest news. Follow us anywhere, just in case this newsletter goes to spam.
