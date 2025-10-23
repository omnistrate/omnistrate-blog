---
title: Hello world SaaS design and its challenges
tags: "cloud, Kubernetes, SaaS"
date: '2024-01-30 23:09:10'
author:
  name: Kamal Gupta
  email: kamal@omnistrate.com
  picture: ''
excerpt: 'Time and time again, we observe organizations grappling with the right design, consequently entangled in perpetual operations.'
slug: hello-world-saas-design-and-its-challenges
---

Time and time again, we observe organizations grappling with the right design, consequently entangled in perpetual operations. Initially, with 5 or 10 customers, everything seems promising, but as you scale, the cracks start to appear from every direction.

For instance, a common pattern in SaaS with dedicated tenancy involves a web service operating in a specific region, which triggers the backend team to cobble together terraform scripts for infrastructure provisioning, and use K8s on top to handle the application setup, scaling, monitoring etc

This entire onboarding and provisioning process often spans several hours or even days, resulting in unforeseen gaps that only reveal themselves when customers start engaging with the platform. This leads to shattered customer trust, exorbitant infrastructure and engineering expenses, and an expensive recovery path forward. Here are some challenges with this setup:

- Deploying in hours or days is not considered SaaS anymore.
- Deployment alone does not constitute SaaS. You require scaling, monitoring, patching, observability, SaaS essentials, billing, and much more.
- Operating a SaaS is not free. To manage hundreds of thousands of clusters, you can't sustain a 10:1 system/administrative ratio; you need to achieve > 1000:1 for a successful SaaS business.
- Designing the entire control plane to operate in one region and one cloud provider is a bad design. Basically, if a region goes down, your entire SaaS business will go down.
- Glaring security gaps, including the absence of tenant isolation mechanisms, fine-grained user permission models, audit records, and protection against cross-tenant impacts.
- Not flexible - no easy way to extend to different clouds, regions, environments. Replacing something as simple as instance type is painful.
- Not resilient - even basic failures like machine failures, AZ failures, network partitions are not handled properly with no clear observability. 
- No proper tooling from CI/CD, access control to auditing for developers to collaborate and maintain compliance.

Building and operating SaaS is not rocket science, but it demands significant investment and the right experience. We believe it should be more accessible, and thus, we offer a SaaS platform for everyone to build and operate so that you don't have to reinvent the wheel.

To learn more about SaaS Control Plane and the challenges involved, please see [here][1]
<br>
To learn more about Omnistrate Platform, please see [here][2]
<br>
To get started with Omnistrate, see [here][3]

  [1]: https://blog.omnistrate.com/posts/52
  [2]: https://blog.omnistrate.com/posts/53
  [3]: https://docs.omnistrate.com/getting-started/
