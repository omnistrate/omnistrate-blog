---
title: >-
  Reimagining SaaSBuilder: A More Intuitive, Efficient and Streamlined
  Experience
tags: 'open-source, saasbuilder'
date: '2025-02-19 18:48:08'
author:
  name: Nihal Mohammed
  email: nihalm@omnistrate.com
  picture: ''
excerpt: >-
  Introduction SaaSBuilder provides a ready-to-use interface for our customers
  to quickly launch their SaaS offerings on Omnistrate Platform.
slug: reimagining-saasbuilder-a-more-intuitive-efficient-and-streamlined-experience
readTime: 6
coverImage: >-
  /images/posts/reimagining-saasbuilder-a-more-intuitive-efficient-and-streamlined-experience-1.png
---


### Introduction

SaaSBuilder provides a ready-to-use interface for our customers to quickly launch their SaaS offerings on Omnistrate Platform. Designed to provide the optimal resource deployment process, it allows end customers to manage resource deployments, subscriptions and access controls with minimal setup. As an open-source platform, SaaSBuilder also offers extensive customization options, enabling businesses to tailor the user experience to their specific needs.

While SaaSBuilder has made launching and managing the SaaS offer easier, we recognized the areas where usability could be further enhanced. We focused on refining navigation, optimizing workflows, and improving the instance management. Our challenge was how to transform a complex, hierarchical navigation system into an intuitive, user-friendly experience without compromising functionality?

This blog details our journey of reimagining SaaSBuilder's interface, focusing on how we enhanced the user experience.

Before:
![Before][1]

After:
![After][2]


### Understanding the Initial Design

The original version of SaaSBuilder was designed to accommodate a structured, hierarchical model for managing the deployment instances:

1. **Service:** The top-level offering (e.g., Supabase DB, PostgreSQL, Falkor DB)
2. **Subscription Plan:** Available tiers within each service (e.g., Free Tier, Pro Tier, Enterprise Tier)
3. **Subscription:** Individual or shared subscriptions with different access levels Users can have multiple subscriptions to the same plan, including their own and shared/invited subscriptions (with Editor or Reader permissions)
4. **Resource/Deployments:** Specific Resource for deployment (Postgres, Proxy)

![Hierarchal View][3]

While the hierarchical structure provided clarity, it also introduced challenges as the platform scaled.

**Navigation Complexity**

Users had to navigate through multiple pages just to perform common tasks. For example, if deployment instances needed to be created across services, the entire navigation had to be repeated from top to bottom in the navigation hierarchy.

Some of the pages were to be accessed using the sidebar, others using the navbar and some using the user profile menu.

![Old Navigation Flow][4]

**Limited Visibility**

There was no single dashboard offering a detailed view of deployment instances across different subscriptions or services. This made it particularly challenging for teams managing multiple projects or environments.

**Time-Intensive Operations**

Actions such as checking instance statuses across different services or comparing resources across services required multiple clicks and page loads, impacting productivity.


### The New and Improved SaaSBuilder

We approached the redesign with a focus on simplification without sacrificing functionality. The result is a more intuitive, efficient and powerful interface.

**Streamlined Deployment Instance Management**

The deployment instance creation and management have been drastically improved. What previously required navigating through three different pages has been condensed into a single, seamless workflow. Users can now create instances with a single click, reducing friction and improving efficiency!

![The New and Improved Instance Form][5]

Additionally, we introduced advanced filtering capabilities that allow users to sort and find instances based on multiple criteria including service type, subscription status, creation date etc. These improvements extend to audit logs and notifications where users can filter based on the Service and Date-Time.

**Unified Navigation Experience**

We've completely restructured our navigation for clarity and consistency. Instead of scattering key actions across multiple menus, we have consolidated navigation elements into a side bar based navigation system. This provides a single, consistent point of access for all platform features.

The lower sidebar now houses quick access to plan details, documentation, pricing, and support information for each service and subscription plan. Users can effortlessly switch between different services and plans without losing context or navigating through multiple pages.

**Enhanced User Interface**

We refined our UI for a modern, sleek and user-friendly experience. Action buttons now display helpful tooltips explaining why certain actions might be disabled. For instance, when hovering over a disabled "Modify" button on a stopped instance, users receive clear feedback explaining that only running instances can be stopped.

![Improved User Feedback][6]


### Technical Implementation: A Deep Dive

We made significant architectural improvements in SaaSBuilder, focusing on performance optimization, API efficiency, modernized UI frameworks, and enhanced customization. These changes not only enhance the user experience but also provide a more robust foundation for future development.

**Performance Optimization Through Modern Architecture**

To eliminate redundant API calls and improve page load times, we adopted App Router alongside a Global Data Provider that efficiently caches and shares the data across all pages for **Service Offerings**, **Subscriptions** and **Subscription Requests**.

    export const GlobalDataContext = createContext<Context | undefined>(undefined);
    
    const GlobalDataProvider = ({ children }: { children: React.ReactNode }) => {
      const {
        data: subscriptions = [],
        isLoading: isLoadingSubscriptions,
        isFetching: isFetchingSubscriptions,
        refetch: refetchSubscriptions,
      } = useSubscriptions();
    
      const {
        data: subscriptionRequests = [],
        isLoading: isLoadingSubscriptionRequests,
        isFetching: isFetchingSubscriptionRequests,
        refetch: refetchSubscriptionRequests,
      } = useSubscriptionRequests();

      const {
        data: serviceOfferings = [],
        isLoading: isLoadingServiceOfferings,
        isFetching: isFetchingServiceOfferings,
        refetch: refetchServiceOfferings,
      } = useOrgServiceOfferings();
    
      if (!isFetchingServiceOfferings && serviceOfferings.length === 0) {
        return (
          <div className="flex flex-col" style={{ minHeight: "100vh" }}>
            <Navbar />
            <NoServiceFoundUI text="No Service Offerings Found" />
          </div>
        );
      }
    
      return (
        <GlobalDataContext.Provider
          value={{
            subscriptions,
            isLoadingSubscriptions,
            isFetchingSubscriptions,
            refetchSubscriptions,
    
            subscriptionRequests,
            isLoadingSubscriptionRequests,
            isFetchingSubscriptionRequests,
            refetchSubscriptionRequests,

            serviceOfferings,
            isLoadingServiceOfferings,
            isFetchingServiceOfferings,
            refetchServiceOfferings,
          }}
        >
          {children}
        </GlobalDataContext.Provider>
      );
    };
    
    export default GlobalDataProvider;

This centralized state management strategy minimizes network overhead, ensuring faster page transitions and consistent UI updates without unnecessary re-fetching.

![Folder Structure of the Application][7]

**Modernized Styling Framework: TailwindCSS + More**

In our commitment to delivering a polished and maintainable user interface, we've started our transition to TailwindCSS. This strategic move sets the foundation for our upcoming integration with ShadCN and potential accelerated development using AI. As we gradually move away from Material-UI, this new styling approach allows better flexibility and improved performance while maintaining a consistent design across the platform.

**Enhanced Type Safety and API Integration**

There has also been a significant improvement in the use of Typescript by integrating OpenAPI schema from Omnistrate's API documentation. This enhancement provides robust type safety and autocompletion, while significantly reducing potential runtime errors. The tight integration between our frontend type system and backend API documentation makes sure that the codebase remains maintainable and reliable as it scales with new features.

**Improved Customization Capabilities**

Understanding the importance of brand consistency for service providers, we've introduced a more flexible theming system. Through the providerConfig file, service providers can now easily customize SaaSBuilder's appearance to match their brand identity.

This includes modifications to color schemes, button styles, input fields and border radiuses. This level of customization ensures that service providers can maintain their unique brand identity while using SaaSBuilder.


### Conclusion

Revamping SaaSBuilder's UI was more than just a visual refresh – it was a fundamental rethinking of how users interact with it. By focusing on user needs, we've created a more efficient, intuitive, and powerful platform.

This release is our commitment to continuous improvement. As we continue to iterate based on the user feedback, we look forward to enhancing SaaSBuilder to meet the evolving needs of our customers. 

If you are using the new SaaSBuilder, we would love to hear your thoughts. Your insights help us shape the future of the platform.

Stay tuned for more updates, and happy building!

  [1]: /images/posts/reimagining-saasbuilder-a-more-intuitive-efficient-and-streamlined-experience-1.png
  [2]: /images/posts/reimagining-saasbuilder-a-more-intuitive-efficient-and-streamlined-experience-2.png
  [3]: /images/posts/reimagining-saasbuilder-a-more-intuitive-efficient-and-streamlined-experience-3.png
  [4]: /images/posts/reimagining-saasbuilder-a-more-intuitive-efficient-and-streamlined-experience-4.png
  [5]: /images/posts/reimagining-saasbuilder-a-more-intuitive-efficient-and-streamlined-experience-5.png
  [6]: /images/posts/reimagining-saasbuilder-a-more-intuitive-efficient-and-streamlined-experience-6.png
  [7]: /images/posts/reimagining-saasbuilder-a-more-intuitive-efficient-and-streamlined-experience-7.png
