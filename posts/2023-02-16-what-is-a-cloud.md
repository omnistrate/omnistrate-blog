---
title: What is a Cloud?
tags: 'aws, azure, cloud, cloud fundamentals, gcp'
date: '2023-02-16 00:12:53'
author:
  name: Team Omnistrate
  email: team@omnistrate.com
  picture: ''
excerpt: >-
  The term Cloud isn’t a physical entity but is meant to represent the
  infrastructure of the internet.
slug: what-is-a-cloud
readTime: 6
coverImage: /images/posts/what-is-a-cloud-1.jpg
category: Industry Insights
---

The term Cloud isn’t a physical entity but is meant to represent the infrastructure of the internet. It’s called Cloud to signify that the users of the Cloud don’t have to worry about the underlying complexities of the infrastructure but can use it as building blocks for their application. Behind the scenes, the cloud is a vast network of physical machines across the globe connected together and abstracted for its end users for dedicated tasks from running applications to storing data to managed applications.

The term Cloud computing refers to computing in the cloud environment. According to [Wikipedia][1], “Cloud computing is the on-demand availability of computer system resources, especially data storage (cloud storage) and computing power, without direct active management by the user.”

One way to understand Cloud is the rental car analogy. Behind the scenes rental car service manages a large fleet of cars, they have to buy and manage inventory, they have to track and maintain their fleet, have to do order management, and so on. From the consumer point of view, it’s a car as a service that they can use to get a car anytime for a certain duration without having to own the car and deal with the hassle of owning/maintaining the car themselves. Now, imagine that if you own an enterprise and need a lot of vehicles to run your business, you can either buy your own fleet and deal with all the above operations or directly rent the fleet from the rental service. With rental car service, you don’t have to manage the fleet, you just pay for what you use, you can dynamically change your request every other day depending on your need without any commitment, you don’t have to worry about any upfront cost to your business and so on.

In the same way, Cloud is a set of managed services and the true value of it to the users is in the complexity of managing the infrastructure at scale. Before the cloud, the enterprise had no choice but to spin the team to manage every piece of software from provisioning, managing, hosting, upgrading, scaling and that can be quite costly as that requires upfront capacity and engineering resources. With Cloud, enterprises can offload all that to the cloud providers like a car rental service, and instead primarily focus on their business logic. This new paradigm allows enterprises to be more agile and focus on their core differentiation. 

[AWS][2] (Amazon Web Services) is the pioneer of cloud computing and many others have followed them in offering similar services from [Microsoft Azure][3] to [GCP][4] (Google Cloud Platform). The full list of them can be found here: [https://www.gartner.com/reviews/market/public-cloud-iaas][5] 

### Cloud Hosting Strategies 

The Cloud can be characterized and consumed in different ways. In the case of rental car service analogy, the rental service could be offered by an external entity as a shared service to multiple enterprises or it could be just a division within the bigger enterprise offering rental car service to the rest of the divisions or organizations in the same enterprise. The former is referred to as a public cloud strategy while the latter as a private cloud strategy. The public cloud shares resources and offers services to the public over the Internet, a private cloud on the other hand isn’t shared and offers services over a private internal network typically hosted on-premises.

![Private vs Public Cloud][6]


In addition to private and public clouds, there are more complex ways where cloud is set up and deployed by enterprises namely hybrid cloud and multi-cloud. Hybrid cloud combines private and public cloud where an enterprise may use a private cloud for some of their sensitive services and use public cloud for relatively less sensitive services. Another use case is enterprises using public cloud to back up their private cloud or extend their private cloud to handle a sudden surge in demand for additional computing.


![Hybrid Cloud][7]


Finally, a multi-cloud combines multiple public clouds to avoid lock-ins, for a better Disaster Recovery story, compliance, get the best pricing across different services at the cost of managing their infrastructure across multiple providers. Having said that, there are several multi-cloud providers today that abstracts several cloud providers for enterprises underneath the scene like Aiven or Databricks, or Snowflake.


![Multicloud][8]

### Cloud Service Models

Going back to our analogy, rental car service can offer a basic service to get an individual car leaving it to end customers to manage the fleet and/or premium service to rent a fleet making it even easier to manage for the end customers. In the same way, Cloud services have different degrees of models from basic infrastructure including compute/storage/networking known as Iaas (Infrastructure as a service), to more advanced model to include software components including operating systems or database systems known as Paas (Platform as a service), to end-to-end model with fully hosted applications known as Saas (Software as a service). At each level, customers get more value from the underlying cloud offering usually at some premium ex - you can self host a MySQL database in [EC2][9] and use the cloud as Iaas or, you can use [RDS][10] (relational database service) from [AWS][11] to manage your databases as Paas. You get more value and allow you to focus on your core business but you have to typically spend extra dollars for that extra value. There are other reasons like vendor lock-in or feature gap why you mayn’t choose to buy the premium offering.  

![Different cloud models][12]

Here are some examples:

 - Iaas providers: [EC2][13], [S3][14], [GCE][15]
 - Paas providers: [RDS][16], [Heroku][17], [Google App Engine][18]
 - Saas providers: [Salesforce][19], [Slack][20], [Google Workspace][21]

Each one of them is even further divided in some cases to mean something more specific like DBaaS. DBaaS is a special class of Paas providers that build and maintain cloud database solutions for customers like MongoDB or CockroachDB.

We covered the basics here in this blog post. In the follow up post, we will dig deeper into some of these concepts. Leave your thoughts and suggestions below.

  [1]: https://en.wikipedia.org/wiki/Cloud_computing
  [2]: https://aws.amazon.com
  [3]: https://azure.microsoft.com/
  [4]: https://cloud.google.com/
  [5]: https://www.gartner.com/reviews/market/public-cloud-iaas
  [6]: /images/posts/what-is-a-cloud-1.jpg
  [7]: /images/posts/what-is-a-cloud-2.jpg
  [8]: /images/posts/what-is-a-cloud-3.jpg
  [9]: https://aws.amazon.com/ec2/
  [10]: https://aws.amazon.com/rds/
  [11]: https://aws.amazon.com
  [12]: /images/posts/what-is-a-cloud-4.jpg
  [13]: https://aws.amazon.com/ec2/
  [14]: https://aws.amazon.com/s3/
  [15]: https://cloud.google.com/compute
  [16]: https://aws.amazon.com/rds/
  [17]: https://www.heroku.com/
  [18]: https://cloud.google.com/appengine
  [19]: https://www.salesforce.com/
  [20]: https://slack.com/
  [21]: https://workspace.google.com/
