---
title: 'Integrating Serverless Framework with Omnistrate: A Developer''s Journey'
tags: 'Omnistrate, SaaS, serverless, terraform'
date: '2025-05-08 00:34:02'
author:
  name: Nolan McCafferty
  email: nolanm@omnistrate.com
  picture: ''
excerpt: >-
  Over the past few weeks, I've been leading an initiative to integrate the
  Serverless Framework with our Omnistrate platform.
slug: integrating-serverless-framework-with-omnistrate-a-developer-s-journey
readTime: 3
coverImage: ''
---

Over the past few weeks, I've been leading an initiative to integrate the [Serverless Framework](https://www.serverless.com/) with our Omnistrate platform. Today, I'm excited to share the technical details of this integration and how it can help developers maintain their serverless applications while gaining enterprise SaaS capabilities.

<h3>The Problem</h3>

In talks with current and prospective customers, we noticed that many organizations are building applications with serverless architectures using the Serverless Framework. These organizations enjoy the simplicity and flexibility of Serverless, but also want a capable Control Plane to manage their software across tenants, clouds, pricing tiers, and more.

The Serverless Framework allows users to define their AWS serverless applications using declarative YAML definitions:

<pre>
service: users
functions: # Your "Functions"
  usersCreate:
    events: # The "Events" that trigger this function
      - httpApi: 'POST /users/create'
  usersDelete:
    events:
      - httpApi: 'DELETE /users/delete'
resources: # The "Resources" your "Functions" use. Raw AWS CloudFormation goes in here.
</pre>

These definitions are then automatically translated into CloudFormation templates and deployed, updated, or destroyed using their CLI:

<pre>
serverless deploy --config my_serverless_application.yaml
</pre>

However, as an organization scales and starts to onboard more customers, this manual process of deployment and management using CLI commands can become impractical – enter Omnistrate.

<h3>The Solution</h3>

I've created a comprehensive example of how to run Serverless Framework applications on Omnistrate in our community GitHub organization: [https://github.com/omnistrate-community/serverless-framework][1]

The repository contains two Omnistrate services that can serve as standalone examples, or be orchestrated together to show a comprehensive end-to-end flow.

<b>Service 1: Serverless Framework Job</b>

The first service leverages Omnistrate's Job controller framework to manage the resources created by the Serverless Framework itself. First, we build a container image that packages the Serverless Framework CLI with a custom deployer script. The Kubernetes Job will run this image with the input parameters that we specify:

- AWS credentials for the Serverless Framework CLI to assume
- Serverless Framework access key
- Action we want the CLI to take (deploy/remove)

The `omnistrate-ctl build-from-repo` command will package this image and upload it to GitHub Container Registry as part of the service build process:

<pre>
omctl build-from-repo -f spec-serverless-job.yaml --service-name 'Serverless Deployer'
</pre>

<b>Service 2: Terraform Service</b>

The second service provides an example of how to build out your SaaS offering with additional cloud resources on top of your Serverless Framework deployment. In this example, we've created a Terraform definition that includes an RDS instance, DB Subnet Groups, IAM Policies, and SSM parameters. We've also included a Terraform output for the serverless application endpoint created in Service 1. See our documentation for the full view of Terraform integration with Omnistrate.
This service can be built using the following command:

<pre>
omctl build -f spec-terraform.yaml --name 'Serverless Terraform' --release-as-preferred --spec-type ServicePlanSpec
</pre>

<b>End-to-End: Service Orchestration</b>

Once both services have been created, we can chain them together using Omnistrate's service orchestration mechanism. The `/orchestration` directory of the repository contains these definitions. To create an instance end-to-end, fill in the template variables in `orchestration/create.yaml` and then run:

<pre>
omnistrate-ctl services-orchestration create --dsl-file orchestration/create.yaml
</pre>

<h3>What's Next?</h3>
If you're using Serverless Framework and want to extend it with enterprise SaaS capabilities, I'd love to hear your feedback. Try out the examples in our GitHub repository, and feel free to open issues or contribute to the project.


  [1]: https://github.com/omnistrate-community/serverless-framework
