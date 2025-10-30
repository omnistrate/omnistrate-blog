---
title: Understanding SaaS billing models
tags: 'billing, cloud, open-source, SaaS'
date: '2024-04-09 09:09:28'
author:
  name: Kamal Gupta
  email: kamal@omnistrate.com
  picture: ''
excerpt: >-
  When you are offering Software as a Service there are multiple options
  available on how to charge customers for the usage of your service.
slug: understanding-saas-billing-models
readTime: 6
---

When you are offering Software as a Service there are multiple options available on how to charge customers for the usage of your service. A couple popular models are Subscription Based and Usage Based.

For Subscription based models, an amount is charged every month based on features available to the user. Popular examples of this are Office 365, Google Suite or Salesforce. In general this model considers multiple plans, with each plan limiting either on the number of users (seats) or in the features available, enabling features only for plans where the subscription is more expensive. As companies grow and require more features and seats, they need to proactively transition to new plans to be able to operate. This module is popular for Software as Service offered to end users.

For Platform or Infrastructure services, it is more frequent to use models where the cost is based on usage. The price is calculated based on the time the service is in use. Some popular examples include Amazon Web Services, Google Cloud Platform and Microsoft Azure. For instance, if we use AWS EC2, we will incur a cost dependent on the capacity of the resource provisioned (CPU/Memory/Disk) and the charge will be billed per hour of use. Many services either require or offer more convenient pricing if there is a commitment at front, this means that there is a minimum charge to use the service and this charge includes usage of the service to some extent, when users exceed the usage on their commitment they incur an additional charge, but they can continue operating with their existing plans.

Of course, a combination of these factors exists, where services are offered based on usage but different plans are defined with different limitations. Even if a service is offered on usage-based, features can be limited or be different for each plan and the price can be different both for the required commitment and for the per-per-usage unit.

This document focuses on building a Usage Based model with Omnistrate as it is more challenging to implement and delivers on the promise of elasticity expected of a Cloud Service.


### Subscription based model


To implement a subscription we need to define different plans, each plan for the service will consider a different subscription cost, that needs to be paid monthly and gives access to a certain number of features.

An example case would be to have a Free plan subscription, that allow to use the platform to a certain extent but with limitations (only for personal usage for example, limited to certain usage of storage), and more sophisticated plans growing to Enterprise, where features that would be required for companies with hundreds of employees or bigger are available.

In this model there is no need to meter the usage of the service, as the limitations are given by the features enabled, or number of users enabled or units that are controlled or allocated based on the plan. For example, an administrator should not be able to add more than 10 users or users can not create more than 1 instance of a service and only with restricted capacity.

When using Omnistrate API, List and Describe APIs can be used to calculate the number of services, and requests can be limited to certain Service Offerings.

###Usage Based

The implementation of a Usage Based model requires collecting usage information from the service once it is provisioned. This usage information can be mapped to different dimensions of usage and the aggregation of these values will generate the final bill. To calculate the usage we need to monitor the live instances of the services, measure the defined dimensions and then do an aggregation per time.

An example of usage based metrics is to charge on the number of CPU metrics per time.


    Formula: Total = SUM (Dimension units per hour * unit price for dimension)  

    Examples: 
        Total = SUM (# of CPU cores used per hour  * cost per cpu core/hour) 
        Total = SUM (# of CPU cores used per hour  * cost per cpu core/hour,  #allocated disk * cost per GB/hour)
To obtain the usage information it is important to consider that the service needs to be monitored, if a service is not available due to failure during provisioning, for example due to lack of capacity in the cloud provider, that service should not record usage of the service until available.

Many services take the approach of measuring infrastructure metrics to calculate the actual cost of usage, an example is if you are running a relational database as a service, measures like CPU cores, provisioned memory, provisioned storage and storage IOPS are considered as dimensions to be measured periodically to assess if the service is active.

A different approach is used by services offered in a serverless or multi-tenant fashion, where the usage is mapped to specific custom metrics for the service and not directly tied to the infrastructure in use. One example is to measure based on the number of requests, hiding the details of the underlying infrastructure and charging only per use.


### Billing Plans


One of the key decision points for a SaaS service is to define its billing model and plans. We need to deliver the promises of elasticity based on usage on demand, while at the same time capture the value that the service is creating for the user.

Some of the service leaders in the industry try to be transparent on the infrastructure usage and allow customers to provision dedicated resources, while others, prefer to define custom metrics and be able to deliver optimization on the underlying infrastructure and have the flexibility of changing the underlying infrastructure to take advantage of its evolution over time.

To review some reference examples we can look at Amazon Aurora, Cockroachdb where there are 2 clear plan types, one is Serverless Based and the usage is metered based on specific metrics on the service, while a Dedicated version charges on usage per hour of the underlying infrastructure, including CPU cores, provisioned storage and provisioned IOPS. Other examples that we can look at are Confluent Cloud, where the pricing is based on the plan with each plan offering different features. For dedicated plan, the pricing is based on abstract units hiding the infrastructure details. Finally Couchbase is another example, where the usage is pay per usage, but the cost per hour and feature available vary depending on the selected plan.
