---
title: Omnistrate Platform Update (December 2024)
tags: 'cloud, platform, product-release, SaaS, update'
date: '2025-01-10 20:18:14'
author:
  name: Amit Sharma
  email: amits@omnistrate.com
  picture: ''
excerpt: >-
  We’re thrilled to introduce several powerful updates that enhance the
  Omnistrate platform!
slug: omnistrate-platform-update-december-2024
readTime: 5
coverImage: /images/posts/omnistrate-platform-update-december-2024-1.png
category: Product Updates
---

![Omnistrate Updates](/images/posts/omnistrate-platform-update-december-2024-1.png)

We’re thrilled to introduce several powerful updates that enhance the Omnistrate platform!

Omnistrate now supports automated **Custom DNS setup for Helm, Operators, and Kustomize resources,** just like it does for Docker Compose or Container images. This allows your customers to configure an alias on their own domain when creating a service instance. Omnistrate handles HTTPS support and certificate management seamlessly, saving you time and effort.


We upgraded the Day-2 experience to provide **better incident management and empower quicker resolutions** by providing more incident details at a glance, showing root causes of errors directly in the alarm notifications and allowing quick navigation, providing access to problematic instances via direct links in alarms or PagerDuty.



Based on customer feedback, we've enhanced **Admin Role permissions**. Admins can now manage Cloud Accounts, configure Team Roles and permissions, and oversee Customer Organizations. Previously restricted to the Root Role, these actions can now be delegated to team members with Admin Role for greater flexibility and efficiency.



***Deprecation Notice:*** In 30 days from this notice, we are removing the capability to on-board Cloud Account with Terraform for AWS, taking Cloud Formation as a preferred method for you to onboard new AWS Cloud Accounts on Omnistrate and for your customers to onboard new AWS accounts. This change is to ensure we enable the best experience during onboarding and updating of IAM policies. This will not affect existing onboarded accounts, but the existing Terraform stack will not be updated to support new features

**Additional Improvements:**

- **No-Code Multi-Service Orchestration:** Easily coordinate multiple services per tenant, automating scenarios like provisioning on both the cloud provider and customer accounts.
- **Enhanced Helm Customization:** Helm now supports additional parameters like custom arguments and wait, giving you greater flexibility.
- **Improved Google Cloud Account Verification:** Verification status now provides clearer insights, streamlining setup for both Service Provider hosted and BYOA services.
- **Instance Type Configuration for Helm:** Helm resources now allow multiple instance types, enabling you to select the right configuration for each resource.
- **Streamlined Terraform Resources:** Terraform resources can now be restricted to a single cloud provider when needed, simplifying management for single-cloud setups.
- **Network Type Visibility:** UI and API responses now specify whether service offerings support internal or public networks.
- **Optimized Node Pool Cleanup:** Improved logic prevents hitting cloud provider limits during development experimentation.
- **Managed S3 Storage:** S3 buckets are now treated as managed resources, allowing them to be mapped to multiple service components.
- **Open-source SaaSBuilder enhancements:**
    - Search support on the Nodes Tab
    - Enhanced summary headers for better readability on the Backup Tab
    - Disabled service plan subscriptions are now hidden to reduce confusion
- **Other UX improvements:**
    - Users can now edit previously disabled service plans
    - Cluster access details for BYOA accounts are now displayed on the Host Clusters page
    - Standardize sorting and filtering across various views for consistency
    - When landing on the Instance Details page for a deleted instance, users now see a more descriptive messages

Explore these new features today and elevate your SaaS experience with Omnistrate!

----------


### Recent and upcoming Livestreams

We’re excited to invite you to a special webinar featuring experts from AWS, The Linux Foundation, and Omnistrate on Jan 14, 9:00 – 10:00 AM (PST) as we explore how to build Open Core-based SaaS Cloud Services in 2025.

Whether you're an open-source developer, a cloud enthusiast, or a SaaS entrepreneur, this webinar is your chance to gain actionable insights for driving innovation in 2025 and beyond: [Cloud Native Live: Building open core SaaS services in 2025][2]

Also… here is a recording of our Live Stream from AWS Re:Invent: [Future of Open Source, DBaaS & AI in the Cloud][3], featuring:  [Peter Zaitsev][4], Founder and ex-CEO of [Percona][5] & [Gopi Duddi][6], SVP of Engineering at [Couchbase][7]

----------


### Thank you for an Amazing Year

As we close a remarkable year for our company, we want to take a moment to express our heartfelt gratitude to you—our valued customers and partners.Your support, collaboration, and trust have been instrumental in making 2024 a year to remember. From powering innovation together to building meaningful connections, your contributions have been at the heart of our success.

A special thank you goes out to everyone who joined us at our events and webinars this year. Whether you attended virtually or in person, your participation brought energy and insight that elevated every gathering. Your presence reminded us why we do what we do—helping businesses like yours achieve extraordinary outcomes.

As we look ahead to 2025, we’re excited to continue this journey with you, exploring new opportunities, solving challenges, and pushing boundaries together.

![AWS Re:Invent][8]

----------

We are the Operating system of your SaaS, offering enterprise-grade capabilities: automated provisioning, serverless capabilities, auto-scaling, billing, monitoring, centralized logging, self-healing, intelligent patching and much more!

We also have [amazing docs][9], a [Slack community][10], a [YouTube channel][11], Twitter (whoops, [X][12]) and of course a [LinkedIn page][13] where you can follow us to stay updated with our latest news


  [1]: https://drive.google.com/thumbnail?id=1TLmi87MFqPI2Sm9JVAETnu49nCbI6A5g&sz=w720
  [2]: https://community.cncf.io/e/m5j5ax/
  [3]: https://www.linkedin.com/posts/kkgupta2_building-ai-native-data-applications-in-the-activity-7269850118424600576-hoeP?utm_source=share&utm_medium=member_desktop
  [4]: https://www.linkedin.com/in/peterzaitsev/
  [5]: https://www.linkedin.com/company/percona/
  [6]: https://www.linkedin.com/in/gopi-duddi/
  [7]: https://www.linkedin.com/company/couchbase/
  [8]: /images/posts/omnistrate-platform-update-december-2024-2.png "AWS:reInvent"
  [9]: http://docs.omnistrate.com
  [10]: https://join.slack.com/t/cloudnative-u5h1399/shared_invite/zt-1qf3cgi37-lCV1vKJlrBioqGuVjKBtyw
  [11]: https://www.youtube.com/@omnistrate
  [12]: https://twitter.com/omnistrate
  [13]: https://www.linkedin.com/company/omnistrate/
