import { API_DOCS_URL, DEV_DOCS_URL, SITE_URL, YOUTUBE_CHANNEL_URL } from "@/constants/site";
import QuickstartIcon from "@/icons/QuickstartIcon";
import TutorialIcon from "@/icons/TutorialIcon";
import BlogIcon from "@/icons/BlogIcon";
import ControlPlaneIcon from "@/icons/ControlPlaneIcon";
import EventsIcon from "@/icons/EventsIcon";
import PartnerIcon from "@/icons/PartnerIcon";
import CommunityIcon from "@/icons/CommunityIcon";
import AWSSaaSOfferIcon from "@/icons/AWSSaaSOfferIcon";
import CareerIcon from "@/icons/CareerIcon";
import TechSupportIcon from "@/icons/TechSupportIcon";
import APIStatusIcon from "@/icons/APIStatusIcon";
import APIRefIcon from "@/icons/APIRefIcon";

const RESOURCE_MENU = [
  {
    title: "Resources",
    subMenu: [
      {
        title: "Quick Start",
        text: "Your quick guide to start building with Omnistrate",
        icon: QuickstartIcon,
        path: DEV_DOCS_URL,
        target: "_blank"
      },
      {
        title: "Tutorials",
        text: "Detailed video tutorials for key Omnistrate features",
        icon: TutorialIcon,
        path: YOUTUBE_CHANNEL_URL,
        target: "_blank"
      },
      {
        title: "Engineering Blog",
        text: "Latest news and insights from the engineering team",
        icon: BlogIcon,
        path: SITE_URL,
        target: "_blank"
      },
      {
        title: "Omnistrate, Demystified",
        text: "Learn what goes into building a modern control plane",
        icon: ControlPlaneIcon,
        path: "/control-plane-demystified"
      }
    ]
  },
  {
    title: "Ecosystem",
    subMenu: [
      {
        title: "Events",
        text: "Join Omnistrate events, webinars, and meetups to learn and connect",
        path: "/events",
        icon: EventsIcon
      },
      {
        title: "Partners",
        text: "Partner with Omnistrate to co-create SaaS solutions and innovate together",
        icon: PartnerIcon,
        path: "/partners"
      },
      {
        title: "Community",
        text: "Connect, share, and learn with the Omnistrate community",
        icon: CommunityIcon,
        path: "https://cloudnative-u5h1399.slack.com/join/shared_invite/zt-1qf3cgi37-lCV1vKJlrBioqGuVjKBtyw#/shared-invite/email",
        target: "_blank"
      },
      {
        title: "AWS SaaS Offer",
        text: "Special offers for Omnistrate users on AWS Marketplace",
        icon: AWSSaaSOfferIcon,
        path: "/aws-saas-offer"
      }
    ]
  },
  {
    title: "Quick Links",
    subMenu: [
      {
        title: "Careers",
        text: "Explore exciting career opportunities at Omnistrate",
        icon: CareerIcon,
        path: `/careers`
      },
      {
        title: "Support",
        text: "Reach out for any help you need with Omnistrate",
        icon: TechSupportIcon,
        path: `/support`
      },
      {
        title: "API Status",
        text: "Real-time updates on Omnistrate",
        icon: APIStatusIcon,
        path: `https://status.omnistrate.cloud`
      },
      {
        title: "API Reference",
        text: "Access Omnistrate API specification",
        icon: APIRefIcon,
        path: API_DOCS_URL,
        target: "_blank"
      }
    ]
  }
];

export default RESOURCE_MENU;
