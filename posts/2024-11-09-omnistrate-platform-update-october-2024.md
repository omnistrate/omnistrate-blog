---
title: Omnistrate Platform Update (October 2024)
tags: 'Omnistrate, platform, product-release, SaaS, update'
date: '2024-11-09 23:31:35'
author:
  name: Kamal Gupta
  email: kamal@omnistrate.com
  picture: ''
excerpt: >-
  SaaS Portal has been revamped to deliver a more comprehensive experience to
  your customers.
slug: omnistrate-platform-update-october-2024
readTime: 4
coverImage: /images/posts/omnistrate-platform-update-october-2024-1.png
---

![Omnistrate features][2]

**SaaS Portal** has been revamped to deliver a more comprehensive experience to your customers. An improved navigation, simplified subscription management, a global dashboard presenting the distribution of deployed instances across cloud regions, dedicated pages for backups and per-deployment events, enriched deployment details such as HA, Backup, Autoscaling configuration and current load are some of the key improvements. These improvements are immediately available for your SaaS offering, making your UX more effective and user-friendly.

**Omnistrate UI better supports Helm, Terraform, Kustomize and Operators** resources including detailed information during creation, upgrade or modification. All the information required to diagnose problems is now accessible using a convenient UI and without the need of complicated steps to connect and extract information from the Kubernetes clusters. 

Omnistrate now supports **VPC peering** to connect networks in different accounts or regions, allowing private connectivity of resources, without exposing them to public internet. This feature can be used for the Provider Hosted model with Dedicated networks and for the BYOA Hosting model. 

**Additional Improvements:**

- We improved the visual display and content of our Debug Events presenting immediate clear information to help debug problems with your service
- Improved time to recovery in case of network failures or host unavailability, with 50% reduction of mean time to recover 
- Added support for Terraform Private modules
- Released an open source [Go SDK][3] to simplify the interaction with Omnistrate 
- [Omnistrate Open API specs][4] are more accessible 
- New detailed guideline on how to [Create your Own Custom Portal][5] leveraging the power of Omnistrate platform
- Improved support for tools like [Restish][6] to [explore and interact with Omnistrate APIs][7]
- We published schemas for [Service Spec][8] files and [System Parameters][9] to allow you to have validation and autocomplete on your favorite editor while working with your service definition
- Other UX improvements:
    - Auto-approve subscription settings introduced at the service plan level
    - Instance list page auto-refreshes to reflect real-time resource instance status
    - Enhanced service monitoring and improved Omnistrate [service status page][10]

Explore these new features today and elevate your SaaS experience with Omnistrate!


----------
<br/>


## Open Source updates ##

![OpenSource][15]

Continuing our effort on OpenSource contributions and foster our community, we created two new GitHub organizations:  

- [omnistrate-oss][11] space: This space hosts a variety of projects and tools designed to help developers leverage the full potential of Omnistrate’s platform. Our goal is to create an ecosystem where contributors can collaborate on building powerful, scalable solutions for cloud-native infrastructure management, continuous delivery, and SaaS development. We encourage community involvement, whether it’s through code contributions, issue reporting, or sharing ideas to improve our open-source offerings. Some of the projects you can find here are: SaaSBuilder, GitHub Actions, Omnistrate SDK and more

- [omnistrate-community][12] space: The code in these repositories is sourced from the Omnistrate user community and reflects contributions from developers who actively use and enhance the platform. Some example projects are examples on how to set up a DBaaS service, how to use Helm with Omnistrate and how to setup your CI/CD pipeline on Omnistrate. 


----------

<br/>


## KubeCon 2024 ##


![KubeCon][16]

Join Omnistrate at booth #Q39 for our Kubecon Coffee challenge. Omnistrate will transform your CNCF project into a Multi-Cloud SaaS solution, before you can finish your cup of coffee!  Also enter our raffle to win new tech gear, and collect our exclusive “Kick its SaaS” Kubecon 2024 stickers.


----------
<br/>


## AWS Re-Invent ##


![Reinvent][17]

**SaaS Builders at AWS Re-Invent : Happy Hour in a Private Suite**

Join Omnistrate @ the AWS SaaS Factory team for an exclusive SaaS Builders event Monday Evening (Dec 2nd, 5PM - 9PM) @ AWS Re-Invent Las Vegas.
[Contact us][14] for your invitation

— 

We are the Operating system of your SaaS, offering enterprise-grade capabilities: automated provisioning, serverless capabilities, auto-scaling, billing, monitoring, centralized logging, self-healing, intelligent patching and much more!

We also have [amazing docs][18], a [Slack community][19], a [YouTube channel][20], Twitter (whoops, [X][21]) and of course a [LinkedIn page][22] where you can follow us to stay updated with our latest news 🟩


  [1]: https://drive.google.com/thumbnail?id=1TLmi87MFqPI2Sm9JVAETnu49nCbI6A5g&sz=w720
  [2]: /images/posts/omnistrate-platform-update-october-2024-1.png
  [3]: https://github.com/omnistrate-oss/omnistrate-sdk-go
  [4]: https://docs.omnistrate.com/api/api-resources/
  [5]: https://docs.omnistrate.com/build-guides/build-your-own-portal/
  [6]: https://rest.sh/#/
  [7]: https://docs.omnistrate.com/build-guides/build-your-own-portal/?h=rest#restish
  [8]: https://docs.omnistrate.com/getting-started/service-plan-spec/#using-schema-validation
  [9]: https://docs.omnistrate.com/build-guides/system-parameters/#using-schema-validation
  [10]: https://status.omnistrate.cloud/
  [11]: https://github.com/omnistrate-oss
  [12]: https://github.com/omnistrate-community
  [13]: https://calendly.com/omnistrate
  [14]: email:team@omnistrate.com
  [15]: /images/posts/omnistrate-platform-update-october-2024-2.png
  [16]: /images/posts/omnistrate-platform-update-october-2024-3.png
  [17]: /images/posts/omnistrate-platform-update-october-2024-4.png
  [18]: http://docs.omnistrate.com
  [19]: https://join.slack.com/t/cloudnative-u5h1399/shared_invite/zt-1qf3cgi37-lCV1vKJlrBioqGuVjKBtyw
  [20]: https://www.youtube.com/@omnistrate
  [21]: https://twitter.com/omnistrate
  [22]: https://www.linkedin.com/company/omnistrate/
