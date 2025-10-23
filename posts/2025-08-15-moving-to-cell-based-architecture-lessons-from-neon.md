---
title: 'Moving to Cell-Based Architecture: Lessons from Neon'
tags: "architecture, cell, cloud, platform"
date: '2025-08-15 01:51:11'
author:
  name: Pablo Berton
  email: pberton@omnistrate.com
  picture: ''
excerpt: The recent stability issues at Neon provide a compelling case study of what happens when products grow beyond their initial architectural assumptions.
slug: moving-to-cell-based-architecture-lessons-from-neon
---

The recent [stability issues at Neon](https://neon.com/blog/an-apology-and-a-recap-on-may-june-stability) provide a compelling case study of what happens when products grow beyond their initial architectural assumptions. Neon's experience—moving from a monolithic control plane to a cell-based architecture under pressure—illustrates a critical pattern in SaaS evolution: the inevitable need for horizontal scaling through cellular architecture.


# The Neon Story: When Growth Outpaces Architecture


Neon's May-June 2025 stability incidents weren't caused by poor engineering—they were the predictable result of exponential growth hitting architectural limits. Here's what happened:


### **The Scaling Wall**


Neon's architecture was designed around a single Kubernetes cluster per region, with every active database running as a pod. Their testing showed service degradation beyond 10,000 concurrent databases due to:

- EKS etcd memory limits (8GB ceiling)
- Network configuration constraints (~12,000 concurrent databases in us-east-1)
- Pod start time degradation below acceptable thresholds
- Kubernetes API rate limiting under high load

**Note**: While AWS continues to lift some EKS limits recently, having a cell-based architecture fundamentally prevents hitting bottlenecks on any single cell. Instead of relying on vertical scaling improvements from cloud providers, cellular architecture provides horizontal scaling that distributes load across multiple isolated environments, ensuring no single resource becomes a system-wide bottleneck.


### **The Growth Explosion**


What made this critical was the timing. Agentic AI platforms drove a *5x increase in database creation* and a *50x increase in branch creation*—far exceeding their projections. As Neon's CEO noted:

> We forecasted that we would hit these limits by the end of the year... However, starting in May agentic AI platforms drove sustained 5x increase in database creation in US regions and our projections were wrong.


### **The Emergency Response**


Neon had to implement their "Cells" architecture—multiple Neon deployments per region—under pressure while keeping the service running. This involved:

- Substantial Terraform changes for region provisioning
- Complex migration logic to route new projects to new cells
- Operational overhead of managing multiple deployment cells
- Risk mitigation through various configuration changes that increased failure probability

The result? **More incidents in two months than the entire previous year**.


# The Universal Pattern: Monolith to Cells


Neon's experience reflects a universal pattern in SaaS evolution. Every successful SaaS product eventually faces the same architectural transition:


### **Phase 1: Monolithic Control Plane**


- Single deployment handles all tenants
- Shared infrastructure and control plane
- Simple operations and management
- *Works until it doesn't*


### **Phase 2: The Scaling Crisis**


- Exponential growth hits architectural limits
- Performance degradation under load
- Increased incident frequency
- *Emergency architectural changes under pressure*


### **Phase 3: Cell-Based Architecture**


- Multiple isolated deployment cells
- Horizontal scaling capability
- Improved fault isolation
- *Massive engineering investment required*


# The Cell-Based Architecture Imperative


Cell-based architecture isn't just a scaling solution—it's an operational necessity for any SaaS product that achieves significant growth. The benefits are compelling:


### **Fault Isolation**


When one cell experiences issues, other cells remain unaffected. Neon's new architecture ensures that problems in one deployment cell don't cascade across their entire customer base.


### **Horizontal Scalability**


Instead of vertically scaling a single deployment, you can add new cells as demand grows. This provides virtually unlimited scaling potential.


### **Operational Flexibility**


Different cells can run different versions, configurations, or even be deployed in different regions or cloud providers.


### **Blast Radius Reduction**


Security incidents, configuration errors, or infrastructure failures are contained within individual cells rather than affecting the entire platform.


# The Traditional Approach: Expensive and Risky


Most companies follow Neon's path: build a monolithic architecture, hit scaling limits, then invest heavily in cellular architecture. This approach has significant drawbacks:


### **Massive Engineering Investment**


Neon's cell implementation required "substantial changes to the Terraform code that provisions regions" and was a "major project" requiring months of development.


### **Operational Complexity**


Managing multiple cells introduces operational overhead:

- Cell placement logic
- Cross-cell monitoring and management
- Data migration between cells
- Load balancing across cells


### **Risk During Transition**


Implementing cellular architecture under pressure increases the risk of incidents. Neon experienced exactly this—more stability issues during their transition period.


### **Opportunity Cost**


Engineering teams spend months building infrastructure instead of product features, delaying innovation and competitive advantage.


# The Omnistrate Advantage: Cell-Ready from Day One


Omnistrate fundamentally changes this equation by providing cell-based architecture capabilities from day one, without requiring massive upfront investment or complex migrations.


### **Built-in Cellular Architecture**


SaaS Products created using Omnistrate's are ready to evolve to a multi-cell architecture. Omnistrete is designed around distributed deployment models that naturally support cellular patterns:

    # Enable custom deployment cell placement
    x-omnistrate-service-plan:
      features:
        CUSTOM_DEPLOYMENT_CELL_PLACEMENT:
          maximumDeploymentsPerCell: 100  # Max deployments per cells

By default Omnistrate will create a single deployment cell for all your services, but evolving to a cellular base architecture is as simple as adding the annotation described above to your service definition.

This simple configuration provides the same isolation benefits that took Neon months to implement.


### **Multiple Deployment Models**


Omnistrate supports various [deployment models](https://docs.omnistrate.com/build-guides/deployment-models/) that enable cellular architecture:

- Your Account: Deploy cells in your infrastructure
- BYOA (Bring Your Own Account): Deploy cells in customer accounts

This flexibility allows you to implement cellular architecture across different customer segments and compliance requirements.


# Real-World Implementation: Database SaaS Example


Consider how you might implement a PostgreSQL SaaS with cellular architecture using Omnistrate. The [DBaaS example](https://docs.omnistrate.com/examples/DBaaS-usecase/) shows how to build a production-ready database service with:


### **Master-Replica Architecture**


    services:
      Master:
        image: 'omnistrate/pgvector:c227409'
        x-omnistrate-capabilities:
          serverlessConfiguration:
            targetPort: 5432
            enableAutoStop: true
            minimumNodesInPool: 5
  
      Replica:
        x-omnistrate-compute:
          replicaCountAPIParam: numReadReplicas
        x-omnistrate-capabilities:
          enableMultiZone: true
          endpointPerReplica: true


### **Cellular Deployment Control**

 
    x-omnistrate-service-plan:
      features:
        CUSTOM_DEPLOYMENT_CELL_PLACEMENT:
          maximumDeploymentsPerCell: 100  # Shared cells for cost efficiency

This configuration provides the same architectural benefits that Neon implemented, but available from day one without custom development.


# Getting Started with Cellular Architecture



### **Start Simple, Scale Smart**


Begin with Omnistrate's basic tenancy models and add cellular features as you grow:

    # Start with multi-tenancy
    x-omnistrate-service-plan:
      tenancyType: 'OMNISTRATE_MULTI_TENANCY'

    # Evolve to dedicated cells as needed
    x-omnistrate-service-plan:
      tenancyType: 'OMNISTRATE_DEDICATED_TENANCY'
      features:
        CUSTOM_DEPLOYMENT_CELL_PLACEMENT:
          maximumDeploymentsPerCell: 100
 

### **Leverage Existing Investments**


Omnistrate works with your existing infrastructure:

- Docker Compose files
- Helm charts
- Kubernetes operators
- Terraform modules

You don't need to rebuild—you can evolve your current architecture into a cellular model.


# Conclusion: Be Ready from Day One


Neon's experience teaches us that cellular architecture isn't optional for successful SaaS products—it's inevitable. The question isn't whether you'll need cellular architecture, but whether you'll implement it proactively or reactively.

With Omnistrate, you can:

- Start with cellular ready architecture from day one, without incurring additional cost
- Avoid the scaling crisis that forces emergency architectural changes
- Save millions in development costs compared to building it yourself
- Focus on product innovation instead of infrastructure complexity
- Scale confidently knowing your architecture can handle exponential growth

Don't wait until you're experiencing Neon's scaling crisis. Build your SaaS ready for cellular architecture from the beginning, and be ready for whatever growth comes your way.

The future of SaaS is cellular. With Omnistrate, that future is available today.

---

*Ready to build your SaaS with cellular architecture? Get started with Omnistrate's [getting started guide](https://docs.omnistrate.com/getting-started/) and deploy your first cellular SaaS in minutes, not months.*

