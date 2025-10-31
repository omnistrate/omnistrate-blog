---
title: 'SaaS Reliability: Achieving High Availability'
tags: 'cloud, high availability, reliability, SaaS'
date: '2024-02-01 21:06:26'
author:
  name: Kamal Gupta
  email: kamal@omnistrate.com
  picture: ''
excerpt: 'SaaS applications need to be highly available, with several 9’s of SLA.'
slug: saas-reliability-achieving-high-availability
readTime: 2
coverImage: ''
---

SaaS applications need to be highly available, with several 9’s of SLA. We have to deal with all sorts of failures, ranging from hardware failures, software failures, hung processes, data center power outages, networking switch failures, degraded storage, to correlated failures, and so on. You will have to keep track of per-tenant SLAs not only to monitor their health and take proactive actions before their availability falls below their SLA, but also to take necessary actions to remediate common issues.

In addition, there are times when you will have to perform upgrades: this includes infrastructure upgrades, OS upgrades, K8s upgrades, software upgrades, CVEs, etc. First, you will need to automate the whole process at every level and build a reliable zero-downtime mechanism. Second, some of your tenants may have constraints on when and how they can be upgraded. For example, most retailers don’t want to touch their tech stack during their Black Friday sale event, as any downtime during that time will have a huge financial impact. Third, your tenants may have special requirements, from communication and visibility to testing requirements. Now, there are several tenants, and depending on the isolation mode, there might be cross-tenant impact, and then, as a given tenant scales, the service should be able to scale to keep up with the load.

Handling reliability from common managed and unmanaged failures is one thing; protecting against disasters like region-wide failures is another. You will have to build solutions and offer controls to protect against such disasters or live with the risk of the entire business going down any day. As an example, one classic mistake that many SaaS companies make is to run their entire control plane in one region and in one cloud, putting not only their business at risk but also all of their customers.

Building a service to handle everything from scaling seamlessly, protection against noisy tenants, detecting different failures quickly, performing L1 recovery and logging the event, alerting the operator to loop in support, upgrading with zero downtime, and having per-tenant control on when/how to upgrade, along with fleet-wide visibility, is NOT trivial.

To learn more about all the core capabilities that we need to deliver a SaaS offering, see [here][1]
<br>
To learn more about how users can leverage a SaaS platform like Omnistrate to address many of these challenges, please see [here][2].


  [1]: https://blog.omnistrate.com/posts/52
  [2]: https://blog.omnistrate.com/posts/53
