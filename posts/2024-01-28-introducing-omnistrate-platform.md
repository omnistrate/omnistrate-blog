---
title: Introducing Omnistrate Platform
tags: "cloud, multi-cloud, open-source, SaaS"
date: '2024-01-28 20:20:40'
author:
  name: Kamal Gupta
  email: kamal@omnistrate.com
  picture: ''
excerpt: 'As we contemplated building the SaaS platform, we divided the requirements into 5 packages. If you are building a SaaS from scratch, you will likely need all the layers.'
slug: introducing-omnistrate-platform
---

As we contemplated building the SaaS platform, we divided the [requirements][1] into 5 packages. If you are building a SaaS from scratch, you will likely need all the layers. 

We also understand that some of you may have already started but are actively looking to accelerate your SaaS journey and scale with your current team better. Hence, we have divided the platform into 5 packages to make it easy to integrate and enable/disable specific pieces:

*Omnistrate Tenant Management*

- Tenant isolation: support different isolation modes from dedicated, account-based to resource-based without any application changes,

- Tenant provisioning and management: from provisioning to management operations at the per-tenant level depending on the isolation modes

- SaaS versioning: Be able to make changes and deploy new SaaS experiences in real-time,

- SaaS control plane UX: API, CLI, and even default GUI for your customers to perform different operations,

- Tenant capabilities: RBAC, Auth Keys, metrics, logging, auditing, and tenant level controls,

*Omnistrate Application Management*

- Scaling including advanced auto-scaling and serverless with scale down to zero,

- Upgrades (from upgrading infrastructure to patching your application) and ability to control per customer account,

- Service capabilities like auto-scaling, serverless, SSL offloading, load balancing, integration with your favorite CI tooling, etc.

*Omnistrate Operations Management*

- Monitoring from simple machine failures to complex AZ failures, network partitions, hung processes, etc.,

- Fleet-wide observability including alerting, metrics, and logging, inventory management,

- Automated operations from certificate rotation to L1 recovery mechanisms,

- Continuous deployment with access control.

*Omnistrate Infra Management*

- Automated IaC across clouds, across regions, across customer cloud accounts,

- Automated state management for every tenant,

- ACID compliant to keep your fleet consistent across different operations,

- Fully versioned to support failures, infra evolution, rollbacks.

*Omnistrate Commerce Management*

- Metering

- Billing

- Marketplace integration

Putting Omnistrate in action
----------------------------

Now, we will see with an example how one can transform their application into a multi-cloud service with enterprise capabilities in minutes. One of the core elements of the majority of the application stack is a database. One of the popular database choices is PostgreSQL. Let’s see how one can build a Multi-Cloud Vector Database SaaS with PostgreSQL.

Let's start simple and we will extend the offering incrementally. Here is a hello world version of PostgreSQL:

    version: "3"
    services:
     Database:
        image: 'bitnami/postgresql:latest'
        ports:
          - 5432:5432
        volumes:
          - ./data:/var/lib/postgresql/data
        environment:
          - POSTGRESQL_PASSWORD=password
          - POSTGRESQL_DATABASE=testdb
          - POSTGRESQL_USERNAME=root
          - POSTGRESQL_POSTGRES_PASSWORD=rootpassword
          - POSTGRESQL_PGAUDIT_LOG=READ,WRITE
          - POSTGRESQL_LOG_HOSTNAME=true
          - POSTGRESQL_REPLICATION_MODE=master
          - POSTGRESQL_REPLICATION_USER=repl_user
          - POSTGRESQL_REPLICATION_PASSWORD=repl_password
          - POSTGRESQL_DATA_DIR=/var/lib/postgresql/data/dbdata
          - SECURITY_CONTEXT_USER_ID=1001
          - SECURITY_CONTEXT_FS_GROUP=1001
          - SECURITY_CONTEXT_GROUP_ID=0

Let’s say that you want to host this SaaS in your account, just add this:

    x-omnistrate-my-account:
      AwsAccountId: '123456789012'  
      AwsBootstrapRoleAccountArn: 'arn:aws:iam::123456789012:role/omnistrate-bootstrap-role'
      GcpProjectId: 'omnistrate-internal'
      GcpProjectNumber: '1234567890123' 
      GcpServiceAccountEmail: 'bootstrap.service@gcp.test.iam'

Now, you want to provide visibility into application metrics and logging:

    x-omnistrate-integrations:
      - omnistrateLogging
      - omnistrateMetrics

With AI, your customers also want to use vector support, you can inject custom code at database initialization:

    x-omnistrate-actionhooks:
      - scope: CLUSTER
        type: INIT
        commandTemplate: >
          PGPASSWORD=rootpassword12345 psql -U postgres
          -h master testdb -c "create extension vector"

Let’s say you want to allow your users to customize instance type as input from your customers, just add:

    x-omnistrate-api-params:
      - key: masterInstanceType
        description: Master Instance Type
        name: Master Instance Type
        type: String
        modifiable: true
        required: true
        export: true
        options:
        - t4.large
        - t4.xlarge
        - t4.2xlarge

But lets say your customers want replica support. We can add a replica service component and add a numReadReplicas API parameter to allow your users to configure the number of read replicas:

  Replica:
    x-omnistrate-compute:
      replicaCountAPIParam: numReadReplicas
    x-omnistrate-api-params:
      - key: numReadReplicas
        description: Number of Read Replicas
        name: Number of Read Replicas
        type: Float64
        modifiable: true
        required: true
        export: true

Your customers are asking this service to Multi-Zone and auto-scaling with scale down to zero:

    x-omnistrate-capabilities:
      enableMultiZone: true
      enableEndpointPerReplica: true
      autoscaling:
        maxReplicas: 5
        minReplicas: 1
        idleMinutesBeforeScalingDown: 20
        idleThreshold: 1
        overUtilizedMinutesBeforeScalingUp: 3
        overUtilizedThreshold: 80
      serverlessConfiguration:
        targetPort: 5432
        enableAutoStop: true
        minimumNodesInPool: 5

To bill your customers, you have to meter their usage. To enable that, just add:

    x-omnistrate-integrations:
      - omnistrateMetering

Now, you will automatically get patching, monitoring with auto-recovery, alerting, fleet observability, continuous deployment with access control for your teams, automated fleet operations, infrastructure management, security controls and much more out of the box.

As you can see, we took an open-source PostgreSQL software and built a multi-cloud enterprise-grade PostgreSQL SaaS with vector extension. For full example, please see this: [Vector DB example][2]

Now, database is one of the components but let’s say you want to add more components to build a complex application. Let’s say you want to build a Wiki SaaS and deploy it in your customers’ account - an application with cache and database dependency. You can model dependencies using depends_on clause like this:

      app:
        ....
        image: omnistrate/outline:0.74.0
        depends_on:
          - postgres
          - redis
    
      redis:
        ....
        image: redis:7.0.12
    
      postgres:
        ....
        image: postgres:14.8

For full example, please see this: [simple application with multiple components][3]

In case you want to deploy your app in your customers’ account, you can add this block:

    x-omnistrate-byoa:
      AwsAccountId: 'your-aws-account-id'
      AwsBootstrapRoleAccountArn: 'arn:aws:iam::your-aws-account-id:role/omnistrate-bootstrap-role'
      GcpProjectId: 'your-gcp-id'
      GcpProjectNumber: 'your-project-number'
      GcpServiceAccountEmail: 'your-gcp-service-email'

For full example on BYOA (Bring Your Own Account), please see this: [BYOA example][4]

To get started and build your first SaaS in less than 15 minutes, please see the [getting started video][5] and [getting started docs][6]


  [1]: https://blog.omnistrate.com/posts/52
  [2]: https://docs.omnistrate.com/examples/DBaaS-usecase/
  [3]: https://docs.omnistrate.com/examples/wiki/
  [4]: https://docs.omnistrate.com/examples/prometheus-byoa/
  [5]: https://www.youtube.com/watch?v=oR5rDa_jiqE
  [6]: https://docs.omnistrate.com/getting-started/
