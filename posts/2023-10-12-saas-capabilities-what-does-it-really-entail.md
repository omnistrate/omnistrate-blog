---
title: SaaS Capabilities - What Does it Really Entail?
tags: 'cloud, platform engineering, SaaS'
date: '2023-10-12 19:03:20'
author:
  name: Joshua Buss
  email: joshua@omnistrate.com
  picture: ''
excerpt: What does it really mean for software to be available as a service?
slug: saas-capabilities-what-does-it-really-entail
readTime: 7
coverImage: ''
category: Industry Insights
---

What does it really mean for software to be available as a service?  Sure, there are plenty of dry definitions out there, but I think a lot of us like to adhere to the ideology of “I know it when I see it” even if we wouldn’t readily admit it.
What I’d like to explore in this post is the makeup of what I personally would consider to be the table stakes features of a modern SaaS; and spend a bit of extra time going over the areas which you’re probably far more likely to gloss over.  If you think I’ve missed anything, be sure to leave your thoughts in the comments below!

<h2>Entity Management</h2>
First and foremost, SaaS systems are entity managers. They have to keep track of a great deal of records, from user constructs to all the bits and pieces that go into your service offerings.
This won’t be comprehensive by any means, but some examples of these include:

- Users and all their metadata
- Organizations
- Groups and policies
- Your customers’ application instances
- Those instances’ metadata (network, cloud, region, etc)
- Metrics and bills
- Product offerings
- Underlying infrastructure capabilities

Every SaaS company I’ve worked at has had either one or just a couple of singular metadata stores with a fairly large number of tables to store and track both these static and dynamic properties of the infrastructure, users, and products.  Selecting the best database in this regard is crucial to power every other part of the business.

<h2>Service Management</h2>
Along with managing all these entities, you need a control plane (or control planes) to actually manifest the services that your users are requesting.  Going into all of the details of what this entails will be the topic of a future post, but at a high level, the operations that you need to support here will generally look and feel a lot like the big cloud providers’ services.  You can browse and select from the available products, select a few qualities about the product, where you’d like to place the new service (and maybe how you’d access it), then start the provisioning process.

<h2>Authentication</h2>
Another area we touched on in service management but deserves a closer look is authentication and authorization (AuthN and AuthZ).  The simplest form of this is simply allowing customers to sign up in the first place to use the platform.  Thankfully you can integrate with many identity providers these days, including the nearly ubiquitous google account, but before you even do this you’ll want to consider how users are going to be modeled in the context of the rest of your entity management.

For instance, are users primarily defined by their email?  This is the most common method I’ve seen, but it’s not the only way to go about this. Github is a great example of a service where email addresses are just an additional property of the primary identity; the username.  There will be many decisions you make related to identity and authentication management which you can undo and change, but this is unlikely to be one, so consider it carefully before you build too much.

Your users will likely belong to companies or organizations, and as you expand your capabilities you’ll likely want to allow your users to carve out internal groups and departments which each have their own capabilities within your system.  All of these security related features become more and more important as you try to get the business of larger enterprises; they often require fine-grained access controls so only authorized administrators can make potentially disruptive changes to the service.

Finally, AuthN and AuthZ also need to be considered in the context of your own employees. There will be security professionals and SRE team leads who likely require more complete access to address platform-wide issues, but under normal operations the bulk of your developers should probably only have read-only access to production, if even that.  The relationship between the identity management you use for your end-users vs. your own employees needs to be chosen carefully - while it’s possible to power both with the same platform, doing so could leave you in a situation in which you’re locked out of administering your own platform if there is a problem!

<h2>Observability, Auditing and Integrations</h2>

Speaking of reporting, the best SaaS products give you deep and immediate feedback about not just the usage of the product but all the operational metrics you could ever need as well, both directly in-product and via integrations which allow your customers to continue to use the tools they’re already familiar with.  A responsive observability subsystem goes a long way to give your product a professional feel, and robust audit logs give confidence to compliance and security teams that the usage of this product will stand the test of time.  Crucially, many of these qualities are what you’ll need for desirable compliance certifications such as SOC2 and PCI - and in my experience not having these can be a complete deal-breaker for larger enterprises.  These systems are difficult to build well, so you’ll want to take the time to approach their design deliberately.

Be sure to check out our previous posts on both [monitoring][1] and [billing][2] for a closer look at these key areas.

<h2>Enterprise capabilities</h2>
There are many SaaS capabilities that are expected these days. First, customers are looking for secure options to connect to their underlying data infrastructure. The basic auth mechanism along with TLS is a good starting point but not enough for enterprises  looking for multi-layer defense. At the minimum, they want IP whitelisting to limit the attack vector. Most enterprises will prefer something like private link or VPC peering and there are tradeoffs between each of those options.
In addition, several enterprises need encryption at transit and rest to make sure no one can look at their sensitive data, the use of more secure authentication mechanisms like OAuth, more stricter compliance requirements and so on.

<h2>APIs and IaC</h2>

Finally, it’s worth calling out the importance in the modern SaaS space of having fantastic public APIs for your product with comprehensive IaC support.  While you still need a great UI to show off your product for people coming to visit it for the first time - and especially for demos - a good chunk of your user base will likely only be interested in consuming your product via APIs and managing their usage of your systems with IaC tools like Terraform and Pulumi.  The critical sibling to these is of course the CLI, which you’ll also want to make available as soon as possible. These can’t be afterthoughts; take care to think about the relationship of your UI, API, CLI, and even IaC usage as you craft each service and feature.  Otherwise you can fall into the trap of giving an inconsistent and confusing product experience; one I’ve seen far too often as a user of many SaaS products over the years.
As a general rule of thumb, keep your API paths, CLI verbs, and IaC resources as consistent as possible, and try to leverage tools which help automate the construction of one or several of these facets while focusing on just one central place to define the core entities.

<h2>Summary</h2>
The reality is that the bar of basic SaaS service has gone up over the years. Back in the days, the expectations were just that you can do basic provisioning/scaling and management operations. Today, the expectation is that customers don't know anything about your software other than APIs that they can call and pay for what they use. In my experience, it takes a lot more engineering to achieve the latter vs the former and requires careful product design.
The pithy way to tl;dr all of these posts is to simply say that building a great SaaS product is exponentially more difficult than just building one with the bare minimum of functionality.  If you’re in the process of building your own SaaS (or just thinking about it) you’ll want to weigh your desire for comprehensiveness with the critical need for a rapid time to market.  Keep an eye out for more content from this space to learn even more!


  [1]: https://blog.omnistrate.com/posts/38
  [2]: https://blog.omnistrate.com/posts/44
