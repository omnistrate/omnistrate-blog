---
title: What is a SaaS Control Plane?
tags: 'cloud, k8s, Kubernetes, multi-cloud, open-source, SaaS, terraform'
date: '2024-01-28 20:16:31'
author:
  name: Kamal Gupta
  email: kamal@omnistrate.com
  picture: ''
excerpt: >-
  I was among the authors at AWS who pioneered the first SaaS control plane back
  in 2009, laying the groundwork for many SaaS offerings both within and beyond
  AWS.
slug: what-is-a-saas-control-plane
readTime: 14
---

I was among the authors at AWS who pioneered the first SaaS control plane back in 2009, laying the groundwork for many SaaS offerings both within and beyond AWS. Crafting the SaaS control plane, we delved deep into fundamental questions:

- How will customers sign up and access their resources?
- How will provisioning and de-provisioning work from infrastructure to user experience?
- How will seamless scaling work? What about capacity management?
- How will we bill our customers for such a service?
- How can we roll out new updates from infrastructure to the software level without impacting our customers?
- How can we provide visibility to our customers on their usage and other relevant information?
- How will we automatically handle failures at different layers to provide them with a fully managed experience?
- How will our customers manage different users?
- How will customers manage their account?
- How will we isolate different customers to meet their expectations?
- How will we automate day-to-day operations to operate the SaaS at scale?

In addition, numerous internal requirements surfaced, spanning operations, security, cost, developer productivity, and insights.

![before and after][1]

To address these questions, as we expected, it took us a couple of years to build our first SaaS control plane. I think what we didn’t anticipate is that it would continue to take years to build a SaaS control plane even 15 years later. As we thought about it, the reason it takes so much time and effort is that cloud abstractions are too low-level to build SaaS and are not compatible across clouds for multi-cloud SaaS offerings.

The other surprise is that we see some organizations putting together some Terraform scripts to deploy things on K8s behind a nice UI and call it a SaaS. We think there is a real scarcity of such people who truly understand building a real SaaS service. Consequently, many of these organizations invest several quarters or even years, only to fall short in establishing a viable SaaS offering with favorable net SaaS margins. Instead, you see a SaaS with month-over-month negative margins, slow growth, and existing customers losing trust over time.

![spider chart][2]

In the next section, I will cover some of the core capabilities that one need to deliver a SaaS offering. Note that these are some of the basic requirements. Your control plane may have more specific needs in addition to what I have listed below.

**Tenant Isolation**

A SaaS application serves several tenants, and each tenant should be isolated from one another. Depending on several factors such as risk, customer experience, cost, etc., you may choose one or more types of isolation for your application:

- Account/VPC/K8s-based: You may need separate infrastructure for each tenant in their account. This mode provides the strongest isolation guarantees, but it comes with a huge operational overhead. It requires deploying across thousands of tenants without requiring them to puncture a hole in their firewall and being able to manage all these tenants in one place. Examples include Databricks, Onehouse, Redpanda.

- Dedicated: You may need separate infrastructure for each tenant. This mode provides strong isolation guarantees, but it comes with extra infrastructure cost. It requires building and keeping track of infrastructure at the per-tenant level and automating the associated operational challenges. Example applications include MongoDB, Confluent, Redis, Elastic.

- Resource shared: You may want to share infrastructure for some of your micro-services for the same tenant. Extra controls are needed to protect different services from one another.

- Multi-tenant: You may want to share infrastructure across groups of tenants. This mode is cost-effective but requires extra controls to isolate tenants from API throttling, per-tenant resource quotas, bin-packing, tenant-level circuit breakers. Isolated cells are needed to minimize cross-tenant impacts. Example applications include HubSpot, Pulley, FireFlies, Workday.

- Hybrid: A modern-day SaaS may have some micro-services in one isolation mode and other micro-services in another isolation mode. For example, running a critical tier like a database as dedicated but the web tier may be shared across tenants, or some of the auxiliary services are resource-shared per tenant.

Given these tradeoffs, some SaaS providers offer multiple isolation levels for the same reason. For example, at Confluent, we offered a multi-tenant offering for a seamless experience and usage-based pricing based on throughput, but we also offered a dedicated offering for enterprises that needed that extra level of isolation from other tenants. Other SaaS providers like Workday share database clusters across tenants to keep the cost down but have dedicated databases for some tenants based on the load and tenant requirements.

It's not sufficient to just achieve tenant isolation but also to implement all the features at the tenant level from billing, scaling, backups, monitoring, patching, audit logs, metrics, service logs, etc. Depending on the isolation levels discussed above, every feature has to be designed properly for that isolation level. If your business requires multiple isolation levels, you may end up implementing these features again for different isolation levels.

**Tenant Provisioning**

Tenant provisioning requires tenant account creation, user provisioning, figuring out the tenant placement, configuring the tenant, and storing all the metadata. We also need to set up all the infrastructure, deploy software, configure software based on user input, enable monitoring, set up certificates, secure end-to-end access, safely coordinate everything during failures, and notify users of the provisioning progress.

Now, you may be required to do this seamlessly across different cloud providers, hundreds of different regions, and keep the entire SaaS stack in sync, deploying it in your account or your tenant's account, and supporting different tenant isolation models as mentioned above. Even for multi-tenant applications, we typically need to create cells to isolate groups of tenants from one another to limit the blast radius. There could be many factors that decide tenant-to-cell placement. As a result, you need a mechanism to create, upgrade, scale, and manage these cells.

Is that all? Not even remotely.

I still remember it used to take months going through the IT department to procure databases in the old days. Early-generation SaaS offerings dramatically changed that to 10-60 minutes, even for dedicated tenancy. The expectation these days is a couple of minutes at best.

If that was not enough, life is not static. Your users may need more capacity for a planned event, or there may be a sudden spike due to an unplanned event, or maybe you want to upgrade their infrastructure to take advantage of cheaper and latest generation hardware, or roll out performance improvements or security patches. Imagine telling your customers to wait for an hour, and we will scale your capacity. It has to be real-time.

But hang on, what happens after the spike? Do you want to continue to charge your customers at that rate? Now, you have to scale down your entire stack of microservices and infrastructure, and maybe even have to go down to zero and seamlessly scale up on-demand.

Finally, you have to worry about tenant data after de-provisioning or off-boarding, considering experience, regulatory and privacy requirements, and cost perspective. For example, how would you handle accidental deletes by your tenants and yet address all the above requirements?

**Tenant Health**

SaaS applications need to be highly available, with several 9’s of SLA. We have to deal with all sorts of failures, ranging from hardware failures, software failures, hung processes, data center power outages, networking switch failures, degraded storage, to correlated failures, and so on. You will have to keep track of per-tenant SLAs not only to monitor their health and take proactive actions before their availability falls below their SLA, but also to take necessary actions to remediate common issues.

In addition, there are times when you will have to perform upgrades: this includes infrastructure upgrades, OS upgrades, K8s upgrades, software upgrades, CVEs, etc. First, you will need to automate the whole process at every level and build a reliable zero-downtime mechanism. Second, some of your tenants may have constraints on when and how they can be upgraded. For example, most retailers don’t want to touch their tech stack during their Black Friday sale event, as any downtime during that time will have a huge financial impact. Third, your tenants may have special requirements, from communication and visibility to testing requirements. Now, there are several tenants, and depending on the isolation mode, there might be cross-tenant impact, and then, as a given tenant scales, the service should be able to scale to keep up with the load.

Handling reliability from common managed and unmanaged failures is one thing; protecting against disasters like region-wide failures is another. You will have to build solutions and offer controls to protect against such disasters or live with the risk of the entire business going down any day. As an example, one classic mistake that many SaaS companies make is to run their entire control plane in one region and in one cloud, putting not only their business at risk but also all of their customers.

Building a service to handle everything from scaling seamlessly, protection against noisy tenants, detecting different failures quickly, performing L1 recovery and logging the event, alerting the operator to loop in support, upgrading with zero downtime, and having per-tenant control on when/how to upgrade, along with fleet-wide visibility, is NOT trivial.

**Tenant Experience**

To interact with the SaaS service, we will need to build some sort of UX (API, GUI, CLI) interaction. We will need UX for your core application and also for management operations like tenant onboarding, access control, account management, auditing, etc. For HubSpot, the core application is CRM, for MongoDB it's the database, for Zendesk it's customer service software.

These UX across core application and management operations may be blended together like HubSpot SaaS or may be disjointed like MongoDB SaaS, depending on the domain and product. In the latter case, even though you have a separate management portal from the application (MongoDB database) experience itself, they are still linked together. A SaaS user interacts with the management portal/API to provision (and other management operations) and uses the generated endpoint to interact with their database.

Now, you will likely have to evolve your experience quickly, version it to protect against bad rollouts, and keep different interface mechanisms (API, CLI, GUI) in sync with no additional overhead. Each one of them takes time and energy.

**Tenant Security**

One of the core tenets of SaaS is to be secure. Security spans across many layers from controlling access with IP whitelisting or Private Link, validating access with authentication to validate identity, authorization to assign permissions to users within tenant organizations, auditing to record every activity, tenant isolation to guard against malicious tenants, regulatory requirements from securing third-party services accesses to operational processes to achieve different compliance standards, and so on.

In addition, one of the key security risks is to protect tenant data. Now, we might use authentication and TLS mechanisms to secure data in transit, but it doesn’t address data at rest. If an attacker gains access or an internal employee misuses information, it may seriously impact your users and your business reputation. You may need extra layers of controls for some of the above, depending on the impact on your business. Finally, depending on the domain, your tenant may also need observability from application usage metrics/insights, performance metrics, logging, to notifications.

Each one of them takes time and resources to build and maintain. As an example for authentication, you may start with plain SASL, but you are expected to add SSO, OAuth mechanisms for other systems to securely interact with your service.

**Tenant Metering**

One of the core tenets of SaaS is to be able to meter tenant usage and then bill your customers. However, there are a lot of challenges in handling that.

The first challenge is to implement proper metering of the usage. In some cases, it may be tracking usage in the application, in other cases, you may want to charge customers based on the infrastructure type and may need to collect the usage over the month. Some of the infra usage is not straightforward, for example, tracking networking ingress/egress usage across a variety of configurations is not trivial. Then you have to aggregate across different dimensions. You may have different plans for different tenants, you may have free trials, discounts, custom pricing for your enterprise customers, everything adds complexity.

The next challenge is to integrate your tenant database with the billing system. You can’t have tenant management data in one data store and billing data in another data store with no connection on how the tenant id in the tenant management store maps to the billing system.

If that was not enough, you have to worry about SOX compliance, auditing the bills, monitoring the billing pipeline. You have to make sure you store the raw data so that if you have to recalculate in case of errors or failure to comply to any promises, you can recalculate the new bills for your customers. You have to store the data safely to avoid any financial loss, and keep it around for any future audit.

Then there are different billing channels from direct payment to marketplace, and you don’t have much choice but to meet your tenants based on their preferred channel of payment. All of these channels bring their own additional operational challenge.

**Operational Automation**

Building SaaS is just one part of the challenge. Operating a SaaS is another major challenge. We will need fleet-wide observability on what tenant-level activity is happening in the fleet including any operational issues, assistance with debugging active issues like metrics and logging, ability to hot patch tenants, rollout security fixes in <24 hours. In addition, we will need reliable monitoring, recovery mechanisms to common issues with full auditing of events on what happened. In case, things are not recoverable for any reason, we will need a reliable alerting mechanism so that you can stay ahead of your customers and address the issues quickly.

We will also need a layer to deal with capacity issues or other mundane tasks like rotating certificates. For account-level tenancy, we need a unified view across all the accounts and manage them effectively, draw out any patterns to provide the best experience and support to your customers. In addition, cost is a major issue and you will need to know the breakdown of where the cost is going from infra perspective, from tenant cost to pricing so that you can improve your pricing model, identify heavy hitters and address them to optimize the internal cost and business margins.

Developer productivity is another challenge with application, devops, support teams coming together. We will need core constructs like access controls, auditing etc. to secure the internal access. Another challenge that we have seen is how developers collaborate. We need developer environments that are easy to create, zero admin to maintain, seamlessly stay in sync with the production environment so that any testing done in these environments closely represents the production setup, proper CI/CD including production canaries to be able effectively operate any SaaS.

Finally, there are additional internal requirements from a compliance perspective, security perspective, scaling the SaaS components themselves, securing the SaaS metadata, adding controls to limit the blast radius for regulatory and BCP requirements. Building and maintaining them takes time and energy.

**Summary:**

These are only some of the common requirements, your SaaS and your customers may have many unique requirements on top. In addition, the cloud is a fast-moving space with constantly evolving security and regulatory requirements, hardware evolution, business needs like globalization and of course you will need a large team to keep all these pieces operational with day-to-day operations. No wonder, SaaS businesses need several dozens to several hundreds of engineers to properly build and manage their control plane components.

To learn more about why we built Omnistrate Platform, please see [here][4]. In the next [blog post][5], we will cover how users can leverage a SaaS platform like Omnistrate to address many of these challenges.


  [1]: https://drive.google.com/thumbnail?id=1A4Ukr_L0GISvab94gNmTMmIFEYmZGnrn&sz=w720
  [2]: https://drive.google.com/thumbnail?id=1ArdrtR8SUXBI7o93svn-16z50fhOyljP&sz=w720
  [3]: email:support@omnistrate.com
  [4]: https://blog.omnistrate.com/posts/51
  [5]: https://blog.omnistrate.com/posts/53
