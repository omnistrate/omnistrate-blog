import { PRODUCT_URL } from "@/constants/site";
import OmnistratePlatformIcon from "@/icons/OmnistratePlatformIcon";

const PRODUCT_MENU = [
  {
    title: "",
    subItems: [
      {
        title: "Omnistrate Platform",
        text: "Build, Access and Operate your SaaS",
        icon: OmnistratePlatformIcon,
        mobileIconColor: "#0E9384",
        link: `${PRODUCT_URL}/signin`,
        bullets: [
          "Tenant Management",
          "Self-serve App deployments",
          "Infra management",
          "Monetization",
          "Automate backend operations",
          "Enterprise-grade"
        ]
      }
    ]
  }
];

export default PRODUCT_MENU;
