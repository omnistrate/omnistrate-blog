---
title: The Three Key Components of Building a Billing System
date: '2024-04-09 09:27:06'
author:
  name: Kamal Gupta
  email: kamal@omnistrate.com
  picture: ''
excerpt: 'When building a billing system there are 3 main components to consider: Usage metering: Collect and aggregate usage data of the service.'
slug: the-three-key-components-of-building-a-billing-system
---

When building a billing system there are 3 main components to consider:

- Usage metering: Collect and aggregate usage data of the service.
- Invoice generation: Take usage data and generates invoices based on the customer plan.
- Payment management: Manages payments and receives funds using payment processors


### Usage metering

To measure the usage of the service its not only to collect information about events in the system, like when a new service is created or deleted, we need to be able to identify that the service is actually running, identify when the service failed to be provisioned or is unavailable and collect data points about the actual infrastructure in use or custom metrics emitted by the service (ie current number of request/transactions/queries). This data needs to be collected periodically and then complemented with metadata of the service, for example the ID of the customer, the plan that this customer is using, static information like region and cloud, and finally aggregated to reflect the usage per hour for a service instance or a customer.

Usage per hour is currently the conventional way to bill usage in the industry. Usage could be technically aggregated in a lower time unit, per minute for instance, but major granularity becomes very expensive or inaccurate as billing records are sensitive data and we need to consider the impact of potential data loss.

A key factor to consider when collecting the data points is making sure that there is efficiency and accuracy in the process, that missing data points can be repaired and will not cause incorrect billing charges to the customer. This needs to be done for all the dimensions that we want to use to charge the customers.

An example on metering usage would be;

- Customer provision a new instance of the service
- Once the service is provisioned, we start collecting the usage information, for example number of CPU cores
- Once the service is decommissioned, or stopped, metering data that should stop being collected.
- If the service is resumed we need to restart the monitoring of the service and send metering information


### Tracking usage and generating invoices

After the metering information is collected we need to be able to generate the invoices for customers. This part might seem simple but there are complexities on generating and managing invoices once customers are onboarded.

First, we need to establish the billing cycle for customers, we can define a billing cycle that starts monthly from the time they sign up. Then we need to collect the metering information for all the dimensions during the billing period and multiply each hour of usage by the unit cost for the customer plan and sum the total. Invoices should have a level of granularity that allows customers to identify where the usage is coming from. This information typically implies adding lines per region, or per instance and then summarizing the total. There are some other factors that need to be considered when generating invoices, and events that can happened during the billing cycle, customer might have changed or canceled their plan, some plans might offer free trial periods or credits that need to be included in the end bill calculation, some customers might have discounts applied to their bill. All these events can be managed on one-off bases when the scale is low, but keeping a manual track of things like credits takes time and is error prone.

Managing invoices requires us to have a centralized view of all the invoices pending payment while also keeping history of old invoices, notify customers when new invoices are available, provide reminders on pending payments and allow them to download the invoices for archiving.

Customers don’t like to be surprised with large bills at the end of the billing cycle, so tracking usage is an important feature for usage based services. Tracking usage requires either exposing the current usage of the dimensions in units or generating a draft bill with current usage and exposing this to the customer. More advanced service providers, like AWS, will try to forecast the infra cost to the customer and give the capability to build alarms to notify on substantial changes in usage.

Making sure that the invoice calculation is correct is a compliance requirement, a good practice is to generate internal canaries with a controlled load and validate that the usage and invoice are within the expected values.

Invoice generation always needs to consider exceptions, specially for bigger deals there will be adjustments on the pricing and payment plans, customers may agree to better pricing in exchange for a bigger commitment on usage or more convenient payment plans. Managing these exceptions requires to include more logic on the invoice generation. We are not covering all the exceptions here, but a system that allows us to generate and manage these exceptions is required at scale.


### Managing payments

There are several payment processors that can be used to manage payment, popularity can vary depending on the country and currency. We will talk about some of the most popular ones to use in the US.

If you want customers to be able to sign up and pay using credit cards, a typical payment processor to use is Stripe, given the simplicity of setting it up and ease of integration with their platform.

Another popular payment processors are Cloud Marketplaces, Marketplaces allow you to provide visibility to the service and simplify payment processing for your customers that already use that Cloud Provider, your service will be charged using the same payment process they are already using for their Cloud expenses.

When you set up a payment processor you will create a Merchant account with them and then set up your information. The payment processor will expect the input of invoice information mapped to the customer data, including payment information (ie credit card or billing id) to process the payment. The payment status will change on the Payment processor system once the customer completes the transaction and the funds will be available to you after a period of time.

To mark an invoice as paid, one needs to subscribe to hooks or poll periodically for the status of the requested payment and track the status accordingly.

Misunderstandings and errors can happen, so refund processing also needs to be done eventually, reverting some of the payment previously done or adding credits for future usage. This has implications either in the payment that needs a refund, the invoices that need to be voided and/or credits that need to be issued.


### Summary


In this post, we discussed what it takes to build a billing system for your SaaS. In practice, there are a lot more nuances from compliance, auditing, handling custom pricing, quotas, managing subscriptions, paywall removal and much more. At Omnistrate, we take care of automating the entire flow so that you can focus on what matters most for your business. To learn more, please visit [Omnistrate website](https://omnistrate.com/)
