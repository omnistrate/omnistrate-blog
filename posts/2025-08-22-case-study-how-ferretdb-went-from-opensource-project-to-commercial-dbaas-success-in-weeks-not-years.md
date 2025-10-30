---
title: >-
  Case Study: How FerretDB went from OpenSource Project to Commercial DBaaS
  success in weeks, not years
tags: 'case-study, cloud, DBaaS, FerretDB, MultiCloud, Omnistrate, PostgreSQL'
date: '2025-08-22 12:59:30'
author:
  name: Kamal Gupta
  email: kamal@omnistrate.com
  picture: ''
excerpt: >-
  Omnistrate gave us an enterprise-grade control plane without the need to hire
  or build one in-house.
slug: >-
  case-study-how-ferretdb-went-from-opensource-project-to-commercial-dbaas-success-in-weeks-not-years
readTime: 5
---

> "Omnistrate gave us an enterprise-grade control plane without the need
> to hire or build one in-house. With their decade of expertise baked
> in, we launched faster, cut costs, and focused on growing our business
> from day one. Highly recommended for any team building a managed
> SaaS." - Peter Farkas - Co-Founder & CEO Ferret DB


## Overview


FerretDB implements the MongoDB wire protocol so developers can often use MongoDB drivers to connect. FerretDB is an independent project and not affiliated with MongoDB.

Developers can use all tools, drivers, UIs, and the same query language, while staying open-source and leveraging the power of PostgreSQL.  Designed to empower developers with open and flexible database infrastructure, FerretDB has quickly grown in adoption across modern, cloud-native application teams looking for transparency, portability, and full control over their data layer.

As FerretDB evolved from a community-driven project into a commercial offering, the company faced a critical question: How can we deliver a cloud-native, fully managed experience that supports both developer simplicity and enterprise flexibility—without building the entire cloud service from scratch?

[FerretDB][1] turned to [Omnistrate][2] to bring their SaaS product to market—fast, securely, and with an advanced, multi-cloud deployment model.


## The Challenge: From OSS to DBaaS without Reinventing the Wheel


FerretDB wanted to provide its users with a seamless managed experience across cloud environments. This meant launching:

- A **Fully Hosted SaaS** model—where all infrastructure runs within FerretDB’s own cloud accounts.
- A **Bring Your Own Cloud (BYOC)** model—where customers can run FerretDB instances inside their own AWS, GCP, or Azure environments, while FerretDB still manages provisioning, updates, scaling, and support via a central control plane.

This BYOC model follows a similar pattern to the Databricks "Bring Your Own Account" approach and mirrors the streamlined experience recently highlighted by AWS’s Quick Launch initiative.

Building and operating such an architecture—especially the orchestration, lifecycle automation, monitoring, metering, billing, and compliance required for multi-cloud delivery—would have taken FerretDB's engineering team years and diverted focus from core product development.


## The Solution: Control Plane as a Service from Omnistrate


Omnistrate provided FerretDB with a turnkey SaaS control plane that powers both deployment models—Fully Hosted and BYOC—without the need to build or maintain complex infrastructure themselves.

With Omnistrate:

- FerretDB runs its **SaaS control plane** inside their own cloud account, maintaining full control over the logic, branding, and customer experience.
- For **Fully Hosted deployments**, Omnistrate provisions and manages FerretDB clusters in FerretDB's cloud accounts with built-in metering, health checks, and lifecycle automation.
- For **BYOC deployments**, the same control plane dynamically provisions FerretDB-managed instances directly into the customer’s cloud account (AWS, GCP, or Azure). This allows customers to retain data sovereignty and cloud-provider affinity—critical for security-conscious and enterprise customers.


## Benefits: Fast Launch, Flexible Delivery, Enterprise-Ready


- **Speed to Market:** FerretDB went from code to a commercially viable SaaS offering in weeks, not years.
- **Multi-Cloud, Multi-Tenant Ready:** Omnistrate abstracts away the complexity of running FerretDB across different clouds and tenant models.
- **Operational Efficiency:** FerretDB’s engineering team stays focused on product improvements, not cloud orchestration.
- **Customer Choice:** End users can now choose where they want FerretDB to run—fully managed by FerretDB, or isolated within their own environment—with no change to the user experience.


## Results: FerretDB Cloud (SaaS Product)


By leveraging Omnistrate’s Control Plane-as-a-Service, FerretDB was able to transform its offering into a full-featured SaaS platform with BYOC support and comprehensive operational tooling. The results delivered value to both FerretDB’s customers and its internal teams:


### Self-Service Customer Portals with BYOC Support

FerretDB customers can now provision, monitor, and manage their own FerretDB deployments through a self-service portal, powered by Omnistrate’s Control Plane:

- Customers deploy FerretDB instances inside their own cloud accounts (BYOC), gaining full data ownership and compliance alignment.
- Customers can scale resources or update configurations on demand, through a simple UI or API.

**Result**: FerretDB delivers their SaaS product inside the customer’s cloud, accelerating adoption among enterprise customers with strict cloud and compliance requirements.


### Internal Operations Portal for Cost, Security, and CI/CD


Internally, FerretDB’s engineering and operations teams gained a unified Operations Portal to manage:

- Fleet-wide visibility across customer deployments and Deployment Models (Fully Hosted and BYOC)
- CI/CD pipelines for rolling out new versions of FerretDB seamlessly across both fully hosted and customer-hosted environments.

**Result**: The internal team operates FerretDB SaaS with confidence and efficiency, supporting BYOC and multi-tenant models without linear increases in operational overhead.


### Metering and Billing Integration

Usage data — including compute hours is automatically captured across each customer instance, whether hosted by FerretDB or BYOC.

- Metering data feeds directly into the billing management system, enabling flexible billing models (pay-as-you-go, tiered plans, or reserved capacity)
- Empowering FerretDB to offer differentiated plans based on customers needs

**Result**: FerretDB automated usage and billing capabilities — a critical foundation for growing its SaaS business while maintaining operational transparency and control.


## Conclusion

By partnering with Omnistrate, FerretDB was able to transform its open-source project into a powerful, flexible, and enterprise-grade cloud service. Omnistrate’s SaaS Control Plane as a Service enabled FerretDB to support both modern DevOps users and large enterprises with a deployment model tailored to each need.

FerretDB now offers what every modern software company wants: **the ability to serve customers in any cloud, with any deployment preference, all from a single, unified control plane**—without sacrificing focus, speed, or customer trust.

📢 Sign up for the FerretDB Cloud waitlist today! 👉 [Join Here][3]


  [1]: https://www.ferretdb.com/
  [2]: https://www.omnistrate.com/
  [3]: https://www.ferretdb.com/
