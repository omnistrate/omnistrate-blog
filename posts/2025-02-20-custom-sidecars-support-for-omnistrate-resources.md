---
title: Custom Sidecars support for Omnistrate resources
tags: "cloud, k8s, OTEL, sidecars"
date: '2025-02-20 21:46:09'
author:
  name: Tomislav Simeunovic
  email: tomislavs@omnistrate.com
  picture: ''
excerpt: 'We’re excited to announce support for custom sidecars, enabling greater flexibility and extensibility in your deployments.'
slug: custom-sidecars-support-for-omnistrate-resources
---

We’re excited to announce support for custom sidecars, enabling greater flexibility and extensibility in your deployments. Whether you need to enhance observability, security, or networking within your application, sidecars provide a powerful way to extend functionality without modifying your main application code.


### What’s the Difference? Sidecar vs. New Resource

- **New Resource** → Runs as a separate pod, independent from your other resources.  
- **Sidecar** → Runs within the same pod as the resource its configured for, sharing networking, storage, environment variables, etc.  

Sidecars are ideal for lightweight, tightly coupled components that need to run alongside your existing resources.  


### Use Cases for Custom Sidecars  


1️⃣ **Custom OpenTelemetry (OTel)** – Forward logs/metrics using tools like Fluentd or Prometheus Agent.  
2️⃣ **Service Mesh Proxy** – Manage networking, security, and observability (e.g., Envoy in Istio).  
3️⃣ **Authentication & Security** – Inject tokens, secrets, or manage encryption (e.g., Vault Agent).  
4️⃣ **Configuration Management** – Sync config updates without restarting the main service container.  
5️⃣ **Caching & Data Enrichment** – Fetch and store frequently used data (e.g., Redis sidecar).  


### How to Enable a Custom Sidecar

Adding a sidecar is simple. Just define the configuration, including image, resource limits, security settings, and commands.  

**Example Input to Enable a Sidecar:** 

    x-omnistrate-capabilities:
        sidecars:
            otel:
                imageNameWithTag: "otel/opentelemetry-collector-contrib:0.116.1"
                command:
                    - "/otelcol-contrib"
                    - "--config"
                    - "/mnt/otel-config.yaml"
                resourceLimits:
                    cpu: "250m"
                    memory: "256Mi"
                securityContext:
                    runAsUser: 10001
                    runAsGroup: 0
                    runAsNonRoot: true


✅ **Support for Multiple Sidecars**: You can attach many sidecars per resource, allowing for flexible and modular architecture.  


### Why This Matters

With custom sidecar support, you can now:  
✔ Extend functionality without modifying your core app.  
✔ Improve security & observability with built-in monitoring, logging, and authentication.  
✔ Seamlessly integrate with existing service meshes and caching layers.  
✔ Reduce operational complexity by keeping components bundled together in a single pod.  

This feature unlocks a new level of flexibility for managing cloud-native applications. Try it out today and let us know what custom sidecars you’re building! 
