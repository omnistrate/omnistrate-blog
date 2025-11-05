---
title: Tenant Isolation Strategy for Your SaaS Application
tags: 'cloud, SaaS, tenant isolation'
date: '2024-02-01 21:03:07'
author:
  name: Kamal Gupta
  email: kamal@omnistrate.com
  picture: ''
excerpt: >-
  A SaaS application serves several tenants, and each tenant should be isolated
  from one another.
slug: tenant-isolation-strategy-for-your-saas-application
readTime: 3
coverImage: ''
category: Engineering & Tech
---

A SaaS application serves several tenants, and each tenant should be isolated from one another. Depending on where and how you want to deploy, you may choose one or more types of isolation for your application.

**Hosting model**

- In your account: one of the most common hosting models for your customers to not worry about anything and you have to handle all the challenges to isolate different tenants securely.

- BYO-Cloud/BYO-Account/BYO-VPC: This hosting model provides the strongest isolation guarantees, but it comes with a huge operational overhead. It requires deploying across thousands of tenants without requiring them to puncture a hole in their firewall and being able to manage all these tenants in one place. Examples include Databricks, Onehouse, Redpanda.

**Deployment model**

- Dedicated: You may need separate infrastructure for each tenant. This mode provides strong isolation guarantees, but it comes with extra infrastructure cost. It requires building and keeping track of infrastructure at the per-tenant level and automating the associated operational challenges. Example applications include MongoDB, Confluent, Redis, Elastic.

- Resource shared: You may want to share infrastructure for some of your micro-services for the same tenant. Extra controls are needed to protect different services from one another.

- Multi-tenant: You may want to share infrastructure across groups of tenants. This mode is cost-effective but requires extra controls to isolate tenants from API throttling, per-tenant resource quotas, bin-packing, tenant-level circuit breakers. Isolated cells are needed to minimize cross-tenant impacts. Example applications include HubSpot, Pulley, FireFlies, Workday.

- Hybrid: A modern-day SaaS may have some micro-services in one isolation mode and other micro-services in another isolation mode. For example, running a critical tier like a database as dedicated but the web tier may be shared across tenants, or some of the auxiliary services are resource-shared per tenant.

Given these tradeoffs, some SaaS providers offer multiple isolation levels for the same reason. For example, at Confluent, we offered a multi-tenant offering for a seamless experience and usage-based pricing based on throughput, but we also offered a dedicated offering for enterprises that needed that extra level of isolation from other tenants. Other SaaS providers like Workday share database clusters across tenants to keep the cost down but have dedicated databases for some tenants based on the load and tenant requirements.

It's not sufficient to just achieve tenant isolation but also to implement all the features at the tenant level from billing, scaling, backups, monitoring, patching, audit logs, metrics, service logs, etc. Depending on the isolation levels discussed above, every feature has to be designed properly for that isolation level. If your business requires multiple isolation levels, you may end up implementing these features again for different isolation levels.

To learn more about all the core capabilities that we need to deliver a SaaS offering, see [here][1]

To learn more about how users can leverage a SaaS platform like Omnistrate to address many of these challenges, please see [here][2].


  [1]: https://blog.omnistrate.com/posts/52
  [2]: https://blog.omnistrate.com/posts/53
