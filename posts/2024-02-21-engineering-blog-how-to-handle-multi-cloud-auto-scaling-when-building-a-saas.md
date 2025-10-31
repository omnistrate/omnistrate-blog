---
title: 'Engineering Blog: How to handle multi-cloud auto-scaling when building a SaaS?'
tags: >-
  autoscaling, aws, engineering-blog, gcp, hpa, karpenter, Kubernetes, SaaS,
  startup, vpa
date: '2024-02-21 11:44:41'
author:
  name: Matteo Bianchi
  email: matteob@omnistrate.com
  picture: ''
excerpt: >-
  How Omnistrate can unburden you by managing a smart scaling system that works
  multi-cloud out of the box This is our first issue of a brand new Engineering
  series at Omnistrate.
slug: engineering-blog-how-to-handle-multi-cloud-auto-scaling-when-building-a-saas
readTime: 4
coverImage: >-
  /images/posts/engineering-blog-how-to-handle-multi-cloud-auto-scaling-when-building-a-saas-1.png
---

How Omnistrate can unburden you by managing a smart scaling system that works multi-cloud out of the box
This is our first issue of a brand new Engineering series at Omnistrate.

In this blog series we will dive into different challenges in your SaaS journey, how to overcome them and how we can help you achieve your goals.
You will recognize these by the engineering prefix in the title and a tag as well.

Let’s jump right into action!
When building a SaaS one of the first benefits we all think about is scalability, right?
Super, but that doesn’t come for free. 
It takes a lot of effort and it is a time consuming task for our engineers, on top of being pretty much undifferentiated and boring work.

With that in mind, at Omnistrate we do know that handling all the nuances of scaling is hard. We wrote about this in some of our previous blogs: [How to Achieve Autoscaling in Multi-Cloud Kubernetes Deployments][1]
and [Everything about Scaling][2], check them out!

Let’s take Kubernetes for a second and the different kinds of autoscaling possibilities it offers.
POD auto-scaling is the simplest and sometimes also the most effective way to operate scaling in your infrastructure through HPA or VPA. 

You can scale up or down the number of pods in a deployment or ReplicaSet, based on CPU and memory utilization through Horizontal Pod Autoscaling. 

On the other hand, Vertical Pod Autoscaling, helps you to scale the CPU and memory requests and limits of the pods based on usage, within a threshold.


Is that enough? What about configuring the number of nodes in a pool? - that’s when cluster autoscaling comes in handy to optimize the number of nodes in a pool based on the number of pending and scheduled pods.

Some projects like Karpenter can help achieving just-in-time node provisioning on both [AWS][3] and [Azure][4]

**Summarizing**: autoscaling in K8s helps keep the costs under control but requires understanding the workload, configuring the right mechanisms/tools to adapt to incoming traffic and efficiently scale up and down.

But at what cost? – there is a huge ongoing engineering cost to configure and operate it. 

Blog finished, yay!

Hah, you wish, right?

While the above mechanisms may work for simple stateless applications, for stateful applications there are several challenges with the above approach:

 - Scaling is more than just adding a pod in many cases, ex- will Kafka scale by simply adding more brokers? How will you move the partitions and coordinate everything seamlessly?
 - Can you always rely on CPU load to make the right scaling decision? - in some cases you’ll naturally need to scale based on custom metrics, coordinate the different resources to scale harmonically preventing failure
 - How will you prevent other operations in the cluster from interfering with the scaling operation?
 - How will you scale other pieces of the infrastructure than just compute?
 - How would scale down to zero when the systems or applications are not in use ? - say for dev/test workloads?

If you think that was all, think about multi-cloud for a second. Exactly right, now you have to handle and manage auto scaling across cloud providers, regions and availability zones.

At Omnistrate we manage your SaaS the multi-cloud way, and take it to the next level. Here’s how it works:

![image][5]

We manage scaling in a decoupled way which allows the system to adapt all of its components rather than just the Kubernetes cluster. We believe that scaling should be done at the level of the SaaS control plane comprehensively.

During our journey building the Omnistrate platform we tried to scale based on k8s but we encountered limits in terms of flexibility and scaling strategies. Instead, with a decoupled approach, architecture became highly customizable and much more adaptable to business requirements.

![image][6]

This is how Omnistrate handles all of that.
I mean, you can also specify these values in your compose spec, or when calling our shiny APIs.

Cool huh?
You can try it yourself and let us know what you think, sign up on [omnistrate.cloud][7]!

  [1]: https://blog.omnistrate.com/posts/21
  [2]: https://blog.omnistrate.com/posts/40
  [3]: https://karpenter.sh/
  [4]: https://github.com/Azure/karpenter 
  [5]: /images/posts/engineering-blog-how-to-handle-multi-cloud-auto-scaling-when-building-a-saas-1.png 
  [6]: /images/posts/engineering-blog-how-to-handle-multi-cloud-auto-scaling-when-building-a-saas-2.png
  [7]: https://omnistrate.cloud/signup

