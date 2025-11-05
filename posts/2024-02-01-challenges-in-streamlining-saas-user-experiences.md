---
title: Challenges in streamlining SaaS User Experiences
tags: 'cloud, SaaS, saas management, UX'
date: '2024-02-01 21:09:56'
author:
  name: Kamal Gupta
  email: kamal@omnistrate.com
  picture: ''
excerpt: >-
  To interact with the SaaS service, we will need to build some sort of UX (API,
  GUI, CLI) interaction.
slug: challenges-in-streamlining-saas-user-experiences
readTime: 2
coverImage: ''
category: Engineering & Tech
---

To interact with the SaaS service, we will need to build some sort of UX (API, GUI, CLI) interaction. We will need UX for your core application and also for management operations like tenant onboarding, access control, account management, auditing, etc. For HubSpot, the core application is CRM, for MongoDB it's the database, for Zendesk it's customer service software.

These UX across core application and management operations may be blended together like HubSpot SaaS or may be disjointed like MongoDB SaaS, depending on the domain and product. In the latter case, even though you have a separate management portal from the application (MongoDB database) experience itself, they are still linked together. A SaaS user interacts with the management portal/API to provision (and other management operations) and uses the generated endpoint to interact with their database.

Now, you will likely have to evolve your experience quickly, version it to protect against bad rollouts, and keep different interface mechanisms (API, CLI, GUI) in sync with no additional overhead. Each one of them takes time and energy.

To learn more about all the core capabilities that we need to deliver a SaaS offering, see [here][1]

To learn more about how users can leverage a SaaS platform like Omnistrate to address many of these challenges, please see [here][2].


  [1]: https://blog.omnistrate.com/posts/52
  [2]: https://blog.omnistrate.com/posts/53
