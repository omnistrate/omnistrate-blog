---
title: Provisioning and Deployments - Your SaaS Foundation
tags: 'cloud, platform engineering, provisioning, SaaS'
date: '2023-10-12 00:54:53'
author:
  name: Joshua Buss
  email: joshua@omnistrate.com
  picture: ''
excerpt: >-
  Before the cloud, getting fresh hardware and deploying your new software was
  always done in big budget events involving procurement, finance, several IT
  teams and the whole process included no small..
slug: provisioning-and-deployments-your-saas-foundation
readTime: 12
coverImage: ''
---

Before the cloud, getting fresh hardware and deploying your new software was always done in big budget events involving procurement, finance, several IT teams and the whole process included no small amount of arguing most of the time.

Now that we have the ability to just press a button or make an API call to have a trove of shiny, powerful VMs added to our fleet at a moments’ notice, surely all the other problems regarding provisioning have been simplified as well, right?

Sarcasm aside, the truth is that the SaaS landscape has actually created an entirely new dimension of complications for us to consider when talking about ‘procuring new infrastructure’.  Sometimes, you can still get stuff that looks and feels remarkably similar to the hardware of yesterday.  This stuff might even be measured in familiar units like cores and gigabytes.  But a lot of time, you might find yourself just getting access to an API, or some virtual namespace or token which allows you to make another thing that actually lets you do the thing you cared about in the first place.  Are both examples still considered provisioning?

We already looked at scaling, but how is actually getting new deployments of customer-requested infrastructure of software instances different from that?

Why do some products offer their services only behind obscure APIs which you have to connect to over public IP addresses, while others offer their services under a mechanism which can instantiate them right in your own AWS account?

Today we’re going to try to touch on all these topics and how they relate to each other.  In essence, they’re all a part of the complicated process most of us refer to as provisioning, but it’s such a broad term we’re going to have to break it down.

<h2>The Scheduler</h2>
To help guide discussion of a topic which has so many facets, let’s imagine we’ve made an amazing new database we’re really proud of and we’d like to build our own SaaS around AwesomeDB.  Like many newer databases, AwesomeDB takes pretty standard VMs, a few different storage technologies, and leverages multiple cloud network features to save money and keep performance consistent.  We also designed AwesomeDB to work both in dedicated tenant modes where single customers can get a guaranteed amount of compute, ram, and storage, and also a multi-tenant model where large AwesomeDB clusters isolated customers from each other using constructs built into the application.

When a new user signs up for their own slice of AwesomeDB on your new SaaS, before anything else happens, a predefined set of business-logic evaluation rules will undoubtedly be executed.  In my experience, this is almost all derived from the product selections the user has made, either implicitly or explicitly.  An example might be - they just signed up for a free trial, so we’re going to be provisioning an ‘instance’ of the simplest, cheapest multi-tenant product offering.  Or the user has already signed a big contract and the AwesomeDB engineer has used an internal tool to create a new dedicated cluster - hopefully this makes sense.

These software systems are some of the most important parts of the main control plane of your SaaS, and while I’ve heard a few different terms for them, I really gravitate towards referring to it as the scheduler.  The scheduler for a SaaS - even one that seems as simple as our toy example - has to consider a surprisingly large number of complications in its job, and most of the rest of the sections of this entire post are typically good examples of this.

To see why this is, let’s consider how the scheduler is going to decide where to put your new slice of AwesomeDB. In one style, users might not even get a choice; if you want a new AwesomeDB URL you’re gonna get it in us-east-1 AWS and you’re gonna like it.  This has lots of advantages from a service provider perspective but might not make lots of customers happy.  There is another style where you, the customer, gets to choose where you want your instance.  GCP?  Azure?  Which region?  How big do you want your DB?

In both styles, the scheduler has to consider not only what already exists, but also what can exist. It has to find the intersection of business logic, infrastructure capacity, and security/quota constraints, then determine if the request for this new slice is even permitted.  When designed well, the scheduler will take these concerns into account and automatically kicks off the process to create new infrastructure when needed, even if the majority of provisioning requests doesn’t require any VMs or clusters.  We’ll see what this means in the next section.

<h2>Getting the Servers</h2>
You might think the first thing that happens when you make a new AwesomeDB is a few VMs are spun up, but in reality this might be less common with your major SaaS providers than you realize.  The main reason for this is that it’s just not very quick (getting new VMs can take anywhere from 1-10 minutes), and most SaaS services have a multitenant design; what’s really getting created for you is probably just an isolated namespace within a larger singular cluster of the software shared by many users.

However, you still need something to run these clusters, and if this infrastructure doesn't exist at all yet it has to be created. There are a variety of ways in which you can do this, including autoscaling groups, (either manually managed or as part of k8s node pools), pre-baked machine images, launch templates, and more, but they all generally share a few characteristics:

- The number and type of machine
- The location (cloud, region, zone, placement groups)
- The machine image to be used
- Launch scripts

Ideally this all happens quickly and painlessly, but there are a few complications that can arise.  If you’re trying to make a large number of VMs at once you might run into a quota limit on your account, and even if you don’t hit that limit you could potentially hit a capacity limitation of the cloud provider itself.  These are typically scoped to each region or availability zone so be aware that some flexibility in zone placement will generally help you secure the capacity you want.

<h2>Quotas</h2>
Maybe the most surprisingly complicated aspect of regularly making more infrastructure without issue is dealing with quota limits.  I had encountered them plenty at previous companies, but while at Confluent we ran into so many issues with quotas and API rate limits that we ended up having to make a quota service just to automate our requests to increase them.

It’s understandable why cloud providers have created these; most users want to be protected from accidentally creating so many resources that they can’t afford their next bill.  But when your business is designed to make new infrastructure on-demand in response to your customers’ requests, quotas can become a real impediment to the growth you want to see.

Thankfully, there are still some things you can do to help here.  First of all, you’ll want to set up monitoring around your usage of existing quotas so you’ll know when you’re approaching the limits.  You can also work with your cloud support team to set up default quotas that are much higher than the standard defaults for new accounts, projects or regions you expand into.

Finally, if you want to go further, you can make a system that automatically creates quota increase requests as you approach your limits, greatly reducing the operational toil you’d otherwise encounter.

<h2>The Tools</h2>
A lot of people reading this post might be wondering why I haven’t talked about Terraform, Kubernetes, or other tools which are typically used in this space.  This is indeed the case, and in my last four companies we even used both (or close facsimiles).  The sad truth though is that as great as these tools are, they really don’t solve the problems you might expect them to when focusing on automated deployments and provisioning as we are here.

Terraform really really shines when your infrastructure is more static; the classic example is when you need to deploy a slowly-changing set of resources and all of the configs for a given stack / state file can be evaluated and reconciled in a minute or two.  As many terraform users can probably attest, these idealistic environments often quickly evolve into behemoth stacks of sprawling configs, with evaluation and reconciliation times climbing up to 10-30 minutes or more, greatly reducing the ability to perform the original function intended - especially if they’re in the critical loop for new customer on-demand provisioning.

What some people have done is leveraged more terraform automation to run these processes on-demand as well, but the speed of execution can still be a problem, not to mention the difficulty in debugging large numbers of configs.  Some tech teams have tried to resolve this by going out of their way to create a huge number of tiny stacks - each with their own state file - and then tying these all together with even more automation and configuration glue.  If this works for you then that’s great but I personally find this approach rather inelegant - it feels as if the tool is no longer really working for you and instead you’re just “putting up with it” or even fighting it.

Instead of going down this route, you’ll likely want to leverage terraform or other IaC tools only to create your most static infrastructure, such as the initial accounts, IAM policies, and maybe k8s clusters with their corresponding VPCs and security definitions, and then allow almost everything else to be dynamically provisioned with more customized software.

For this problem, you’ll likely find even more tools promising the ability to manage your data services with “control planes”, which is indeed what we’re talking about building here as well. And kubernetes itself is of course comprised of a control plane and a data plane too, but simply having a control plane or using one doesn’t mean your provisioning needs will be solved automatically.  This would be akin to thinking that simply selecting a webapp framework means your application will basically be done! The truth is that these control plane frameworks are exceptionally complicated pieces of technology as well, sometimes even making sprawling terraform setups look tame by comparison.  They can still be the right choice, but you’ll want to prepare for a long learning curve and plenty of iterative experimentation and testing before settling on one that will satisfy your requirements for the long run.

<h2>Software Deployment</h2>
All of this just to get your servers / k8s cluster - and there’s still so much left to do!

Interestingly enough, I’ve found a lot of companies are using helm or something very much like it at this step of the provisioning process.  It makes sense; if you’re using kubernetes, helm is a popular package manager which lets you define the relationship between your various kubernetes application deployments, utilizing the concept of helm charts. However, please note that deployment is just one of the steps in the whole SaaS provisioning as discussed earlier and there is a lot more complexity than just deploying the software to k8s.

These charts define docker images and their associated configs with templating capabilities to resolve the values for all the knobs and switches we mentioned earlier - maybe you’re provisioning the service onto machines with faster local NVMe disks, so your provisioner tweaked the parameters of this particular chart instantiation to set SSD_OPTIMIZATIONS to TRUE.  If you don’t want to use helm here, or you’re not using kubernetes at all, you’ll still likely want to make sure you have a mechanism for defining the dependencies of your primary application and the management of their life cycles. 

What kind of faults do you need to be on the lookout for?  There are too many to exhaustively list here but I’ll try to touch on a few of the most important ones.

- If using k8s, simulate both a failure to make a new k8s cluster and failures to make underlying k8s resources like node pools, as well as the cloud resources underpinning them, like:
 - security groups
 - IAM roles
 - Instances
 - Disks (if applicable)
 - Load balancers
- Try to simulate getting only some of the resources you’ll need to provision new clusters, like getting two out of three of your new instances but the third fails because it’s trying to come up in a certain availability zone and that zone no longer has capacity for that instance type.
- Simulate all kinds of configuration mistakes, and ensure that you don’t ‘soft fail’ – i.e. getting a cluster to show up as healthy in the console but in actuality it has a critical misconfiguration that will make it broken or suboptimal for the real customer
-Simulate getting mis-matched versions between dependent services
-Simulate very slow cluster and instance creations
-Check to see what happens if a dependent docker image isn’t available anymore - make sure the appropriate alarming notifies you of the problem

<h2>Wrap-Up</h2>

At the end of the day, the process of deploying your software is going to be similar to the process of ensuring all the dependent infrastructure is in place first; there needs to be control-loop management to take the software step-by-step from your bare machine image or k8s nodes to the entirety of your software stack.  A solid understanding of k8s can help with this immensely, since it has support for operators and custom resource definitions which are an example of an implementation of this, but it’s certainly not necessary to go down this route.

