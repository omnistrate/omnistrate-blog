---
title: Building Private Service On The Cloud
tags: "cloud, privacy, SaaS, security"
date: '2024-12-20 22:28:56'
author:
  name: Yuhui Yuan
  email: yuhui@omnistrate.com
  picture: ''
excerpt: 'Building private services on the cloud enables businesses to leverage the benefits of cloud technology, such as flexibility and scalability, while maintaining strict control over their data.'
slug: building-private-service-on-the-cloud
---

Building private services on the cloud enables businesses to leverage the benefits of cloud technology, such as flexibility and scalability, while maintaining strict control over their data. This is particularly important for organizations handling sensitive information, as a private cloud environment enhances security and ensures compliance with specific regulatory requirements.

###Challenges About Building Private Service On Cloud ?

However, setting up a private cloud service comes with challenges. Ensuring robust data security is a key concern, necessitating strong measures like firewalls and encryption, along with adherence to various regulations. Integrating these services with existing IT infrastructure can be complex, often requiring significant adjustments and rigorous testing to ensure seamless functionality.

Managing a private cloud environment also demands specialized expertise. Unlike public clouds, where services are managed by the provider, private clouds require your team to handle deployment, maintenance, and scaling, adding to operational demands. Additionally, scalability can be challenging in a private setup where resources are limited, requiring accurate demand forecasting to avoid performance bottlenecks. Reliability is essential too, demanding solid disaster recovery and backup plans to minimize downtime and protect against data loss.

The Omnistrate platform can play a critical role in overcoming these challenges and speeding up the process of building a private service on the cloud. By providing tools and support for seamless integration and management, Omnistrate helps streamline deployment and scaling. It offers robust security frameworks and compliance features, reducing the complexity of adhering to regulations. 

###Example Of Private Postgres Service On The Cloud

In this blog, we will take a private PostgreSQL service built on Omnistrate with a private link as an example. 

To start, we developed a private PostgreSQL SaaS offering using several templates (for details, please see the next section). The templates allow our customers to customize their cloud service according to their customer needs.
Next, we are going to look into what it means from the customer experience point of view. Most of the experience will stay the same as a Public Postgres Service except for the private connectivity piece.

Initially, customers will authenticate through a user portal and initiate a deployment based on their requirements. Once deployed, they will be able to view the instance details.

![pic][1]

<br/>
In addition to above, customers can also access additional information about the PostgreSQL deployment in the Resource Instance Details tab. The SaaS offering template provides the capability to define essential information about the private PostgreSQL deployment that customers need to be aware of, and this information is displayed in the UI portal as shown below.

![pic][2]

<br/>
Next, for customers to connect their applications with the provisioned resources, they can go to the target connect account and create a VPC Endpoint (VPCE) using the VPCE service name obtained earlier. To find the  VPCE service name, see the connectivity tab:

![pic][3]

<br/>
For detailed instructions, refer to the AWS Documentation on [Connecting to an Endpoint Service][4].

![pic][5]

<br/>
After completing these steps, customers will be able to connect to the private PostgreSQL instance from within the target account VPC. Below is an example of how to establish a connection from an EC2 client.
![pic][6]

<br/>
**Note**: In the example above, the provisioned VPCE service connectivity is restricted to the target connect account through customization of the deployment templates. In this instance, the restriction is applied at the account level. However, Omnistrate offers extended customization options for more granular control. We will explore these underlying details in the next section.

###How to Build The Private Service with Omnistrate

Here is an Example [Repository][7] on GitHub

In the example above, we leverage three deployment types: Terraform, Helm, and Kustomize. Let's examine each part in detail:

- Terraform: It deploys the Network Load Balancer (NLB), configures security groups, and establishes the VPCE service with permission controls. For instance, you can extend VPCE service connectivity permission control by restricting access to specific IAM users instead of the entire account.
Source [Terraform templates][8]

- Helm: Utilizes the Bitnami Helm package to deploy PostgreSQL into Kubernetes.
- Kustomize: Uses the TargetGroupBinding Custom Resource Definition (CRD) to bind the PostgreSQL service with the VPCE service created above.
Source [Kustomize templates][9]

The final Omnistrate service plan specification can be found [here][10].

After preparing the deployment artifacts, you can build your private service plan using the specification file on Omnistrate. This will make your private service offering ready for use. You can try the example above on Omnistrate, and if you have any questions, feel free to contact support@omnistrate.com.

  [1]: https://drive.google.com/thumbnail?id=1nyvj4hFEhO4ZclEgdjz--AoqYJZGrGM2&sz=w720
  [2]: https://drive.google.com/thumbnail?id=15HDDkgmNCYG_tJSWvpo7IQVv_IEj8hsw&sz=w720
  [3]: https://drive.google.com/thumbnail?id=1Dr5-rvG61yNuSY9mIw5cIpBnH1CxCdTh&sz=w720
  [4]: https://docs.aws.amazon.com/vpc/latest/privatelink/create-endpoint-service.html#connect-to-endpoint-service.
  [5]: https://drive.google.com/thumbnail?id=1TmpEtoQp1skukyG6JWYuRF2D-puR07bU&sz=w720
  [6]: https://drive.google.com/thumbnail?id=18P_jxs9GDAyWAQIkQqeFr4bMXXEykGG_&sz=w720
  [7]: https://github.com/omnistrate-community/private-link-example
  [8]: https://github.com/omnistrate-community/private-link-example/blob/main/terraform/main.tf
  [9]: https://github.com/omnistrate-community/private-link-example/blob/main/kustomize/targetGroupBinding.yaml
  [10]: https://github.com/omnistrate-community/private-link-example/blob/main/privatePostgresql.yaml
