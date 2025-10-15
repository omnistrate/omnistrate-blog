---
title: Need for SaaS abstractions
date: '2024-01-30 22:36:10'
author:
  name: Kamal Gupta
  email: kamal@omnistrate.com
  picture: ''
excerpt: Developing software as a service (SaaS) in today's cloud environment can be compared to creating an application for an operating system (OS).
slug: need-for-saas-abstractions
---

Developing software as a service (SaaS) in today's cloud environment can be compared to creating an application for an operating system (OS). Just as developers don't concern themselves with the intricacies of CPU scheduling or memory management when writing applications for Windows or Linux, similar abstractions are needed in the cloud.

Let's delve into why this is the case. When writing application on top of an OS, developers enjoy several abstractions:

 - CPU scheduling: The OS takes charge of creating, scheduling, and
   terminating processes. This facilitates multitasking, enabling
   concurrent execution of multiple processes.
   
 - Reliability and Security: Enforced by the OS, this involves access controls, user
   authentication, and permission systems to shield data and resources
   from unauthorized access and malicious intent.
   
 - Resource Management: The OS oversees the allocation of vital computer
   resources like the CPU, memory, storage, and peripherals, ensuring
   they are distributed efficiently and fairly among various processes
   and applications.
   
 - Memory Management: This is all about the allocation and freeing up of
   memory spaces for processes, including managing virtual memory, which
   lets processes utilize more memory than is physically present.
   
 - Device Drivers: The OS contains protocols for communicating with
   hardware devices such as printers and network cards. These device
   drivers ease the interaction between hardware and software.
   
 - Portability: The OS ensures that software applications can run on a
   myriad of hardware configurations, fostering software adaptability.
   
 - User Interface: Be it GUI or command line, the OS provides interfaces
   that enable users to interact with computer systems, manage files,
   and execute applications. And the list goes on.

Unfortunately, analogous abstractions in the cloud are largely missing or too rudimentary. As a result, building and maintaining services on cloud platforms often requires significant engineering effort. Here are some pressing challenges:

 - Fully Automated Deployments: Deploying infrastructure is a pain. We
   have come a long way over the years, but all the tools so far take a
   tool-assisted approach and require you to write your IaC using these
   tools. That might be okay for simple, one-time deployment
   applications, but if you have to do repeated deployments or manage
   custom deployments per customer, it can be very challenging to build
   and maintain. We need a fully automated solution that can abstract
   all this complexity by simply taking a specification and seamlessly
   work across clouds.
   
 - Reliability and Security: Essential security controls like authentication, Role-Based
   Access Control (RBAC), auditing, encryption, and network segmentation
   are paramount to fend off unauthorized access and potential threats. The cloud environment is not immune to 
   failures. Robust mechanisms to rebound from diverse infrastructure mishaps to application layer are
   crucial.

 - Serverless Abstraction: Echoing the OS's automatic resource
   management, the SaaS should offer services that expand or shrink on
   demand. 
   
 - SaaS Integrations: Analogous to device drivers, integration with
   logging, metrics, alerting tools, and more is essential. An automated
   integration layer would be highly beneficial.
   
 - Portability: Transitioning between different cloud regions requires
   setting up, testing, and maintaining the entire tech stack. Shifting
   between cloud providers demands even more effort, often involving an
   entire rebuild.
   
 - User Interface: A coherent and intuitive interface is needed to
   operate on top of cloud platforms and engage with them.

In many ways, what's needed is akin to an operating system tailored for the cloud. Such a system would provide the needed abstractions, mimicking the behavior of a single node. This would allow developers to smoothly shift their technology from desktop environments to the cloud as SaaS and start monetizing it, preserving a familiar interface while maximizing the scalability benefits the cloud offers.
