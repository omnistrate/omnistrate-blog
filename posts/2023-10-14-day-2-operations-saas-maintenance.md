---
title: Day 2 Operations - SaaS Maintenance
tags: 'cloud, platform engineering, SaaS'
date: '2023-10-14 22:16:04'
author:
  name: Joshua Buss
  email: joshua@omnistrate.com
  picture: ''
excerpt: >-
  In my previous posts, I have covered what it takes to build a SaaS Control
  Plane. In this post, we will cover some of the challenges in operating a SaaS
  service.
readTime: 9
coverImage: ''
category: Engineering & Tech
---

In my previous posts, I have covered what it takes to *build* a SaaS Control Plane: [[Capabilities]][1][[Billing]][2][[Provisioning]][3][[Scaling]][4][[High Availability]][5][[Monitoring]][6]. In this post, we will cover some of the challenges in *operating* a SaaS service.

I’ve likely performed thousands of operational tasks during my career, but one sticks out clearly for me over a decade after I performed it.  It was a major version upgrade of a decently-large Cassandra cluster while I was working at Signal, with between 8 and 64 nodes in each of 4 separate geographic regions in AWS - two in the US, one in Europe, and one in Japan.  I think in total the cluster had about 160 nodes.

The upgrade included a data format change, which meant each node had to go through a lengthy step-by-step process including a drain, clean shutdown, data migration, software upgrade, startup, re-sync, and finally after passing health checks I could do the next node that shared the same token space.  Nodes which didn’t share the same token space could in theory be upgraded at the same time, but we had to keep a specific percentage of nodes working in each region at the same time to maintain operational functionality.

I performed the majority of this work from my home which was an hour train ride from the office in downtown Chicago, but I started the upgrade while at work and continued working on it over the course of about 3 days.  There were a couple moments of brief panic when some monitoring picked up that there might be a huge latency issue with the new version, but thankfully that turned out to be unrelated.  I finished on a Saturday right around noon and honestly while it felt good to be done, it really just felt amazing that the project had gone so well.  The automation to pick the right nodes to operate on and take them through the upgrade process had worked beautifully, and the developer teams had done their part to ensure all clients worked with both the old and new versions equally well while we were performing the big migration.

I feel like this whole experience really just captured a very unique moment in history though - databases are much better these days about making sure upgrades don’t have such difficult backwards incompatible data migrations.  They also tend to be more forgiving when upgrading a whole cluster.  Furthermore, there are a plethora of platforms for running clusters of systems now and the tooling to handle such a distributed major upgrade is almost always provided with the service in the form of an operator or similar, if not in the code itself.

When you’re building a SaaS around distributed data systems though, everything I just discussed gets multiplied hundreds or even thousands of times over.  Instead of worrying around upgrading one big Cassandra cluster, the folks over at Datastax are likely constantly rolling hundreds of clusters simultaneously, with versions progressing like waves across the fleet of infrastructure.

We had a shaky start to this at Confluent as well, but by the time I left there was a well-oiled fleet management team, with several specialized services handling default versions, sensitive customer lists, in-progress upgrades, and more.

This post will explain why you’ll likely need such systems in your own SaaS as it scales beyond just a handful of clusters, and how they’re arguably the most difficult aspect of building a low-toil platform.

## What’s in an Upgrade, Anyway?

We’ve all been there.  You’re just trying to write some code, but your teammate installed a new dependency package over the weekend because she’s got that weekend warrior fire.  You try to install the same package yourself so you can compile the app, only to find out it depends on a newer version of another package unrelated to your project.

So you try to upgrade THAT package and you immediately become sad, because now you realize your coworker is on a completely different kernel version and has newer system libraries than you.  The whole morning is going to be lost to upgrading your OS or figuring out how to backport the new changes.

Docker has certainly helped us avoid some of these problems, but the underlying truth of our industry is that there will always be at least a little bit of this dependency hell because we’re all building on the tippy top of mountains with half a century of foundational code holding everything up from below.

Upgrading or patching a fleet of applications across the full span of your environments just means taking all of these gotchas and dealing with them over and over and over again.  If you don’t maintain consistency across your fleet, between the OS images, the base packages, and your software, then you tempt disaster as you find a new unique combination of these versions that maybe hasn’t been tested yet and maybe doesn’t even work.

## Fleet Management

Fleet Management refers to the automation of this rigor - you have to move beyond the kind of one-engineer-managing-an-upgrade style of work I did myself to that Cassandra cluster in 2013 to a software system designed to define and enforce rules such as “you can’t put 1.3 on clusters running host version 3.4 or lower because it won’t work”.  Only then can you start to confidently manage massively parallel upgrades with the kind of confidence your customers are paying you for.
There are quite a few qualities you’re going to want from your fleet management system.  In addition to defining and enforcing rules about what can run where, you’ll also want it to be able to:

 - Store the default version for new deployments.  You’ll only want to change this when you’re confident that version is really ready for prime-time.
 - Retrieve the current software version of all running applications - this is where fleet management meets observability!
 - Start, stop, pause, resume upgrades - both individual and parallel operations
 - Define upgrade ‘shapes’ - a linear upgrade wave just does one cluster, then the next, then the next.  Or maybe it just does 2 at a time, then another 2, then another 2.  But an S-curved upgrade wave starts with 1, then maybe waits a bit, then does another one and waits a little less, than does 2 at once, then does 3, then 5, then 8, then 5, then 3, then 2, then the last 1 with the really big important customer on it.  This is a battle-tested strategy balancing safety and speed.
 - Target specific clusters for either not being eligible for maintenance work or for being expedited for newer versions

## Following the Rules

Some of these might seem a bit like overkill, but we found ourselves needing exceptionally complicated capabilities from our fleet management system far more often than any of us expected at Confluent.

In one example, we needed to patch just a set of clusters which were exhibiting certain behaviors because of previously-configured settings on the underlying EBS volumes’.  Likewise, you also will want to be able to change configurations for just a subset of your clusters, perhaps based on the versions.

This kind of slicing-and-dicing of your infrastructure goes from being a rare event to becoming the everyday normal as your fleet approaches thousands and thousands of clusters; a phenomenon one of my favorite technologists has also observed and given an excellent talk on, in fact!

When you need to fine-tune the sets of deployments which you want to perform certain operations on, it’s critical to have all of your clusters and their properties in the kind of database or analytical store where you can query it quickly.  I led the development of devops tooling and ETL systems that let us do exactly this both at Signal and Confluent, and it’s a trend that’s gaining traction in the industry at large as well.  You can get started with something as simple as CloudQuery and using an existing postgres or bigquery database to hold these infrastructure details.

## Rollout Dragons

Even with everything else in place however, upgrades can just be dastardly difficult. You’ll want to go into every operation knowing that some sort of catastrophic failure is a possibility, and counter that with persistent upgrade and soak testing.   I strongly believe one of the main reasons Kafka is as popular as it is today is because of its insanely extensive testing; not only by Confluent and other purveyors of the service but also all the end-users who run it at scale in production, providing data back into the project about when and how it fails. In simpler terms, nothing will provide the sort of reliability you want for your operational tasks as extensive and comprehensive testing.  Try to make sure you test not only happy path upgrades but also disrupted upgrades, incorporating styles of fault injection from chaos testing suites and your own real-world observations.  Do all of this before you even consider this next version stable.

Then when you’re ready to promote your new software to a pre-production or staging environment, make sure you emulate the same conditions in which the production upgrade will occur.  For instance, don’t take staging from version 2.3.4 to 2.3.5 if production is still on 2.3.3 - otherwise the test of that upgrade process won’t be representative of the prod rollout.
At massive scales, it’s unlikely you’ll be able to emulate all combinations of variables that exist in production unless you’ve been effective at keeping the total number of these combinations to a minimum - a practice I highly recommend to everyone.  If you can’t afford the emulation of all these combinations before going into production, then strive to test the most critical and common, and shape your rollout curve to minimize impact and use the success of previous rollouts to inform whether the rest should be carried out or not.

## Wrap-Up

Patching and upgrades will basically always be at the top of the list of most challenging tasks any large-scale SaaS provider has to undertake.  With the considerations discussed here taken into account, hopefully you can still tackle even these difficult chores with aplomb.


  [1]: https://blog.omnistrate.com/posts/45
  [2]: https://blog.omnistrate.com/posts/44
  [3]: https://blog.omnistrate.com/posts/43
  [4]: https://blog.omnistrate.com/posts/40
  [5]: https://blog.omnistrate.com/posts/39
  [6]: https://blog.omnistrate.com/posts/38
