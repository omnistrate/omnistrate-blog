export const cookieConsentInitialObject = {
  consentGiven: false,
  categories: [
    {
      category: "necessary",
      services: [
        {
          type: "auth",
          name: "token",
          cookies: ["token"]
        },
        {
          type: "OAuth_providers",
          name: "OAuth"
        }
      ],
      hide: false,
      editable: false,
      enabled: true
    },
    {
      category: "analytics",
      services: [
        {
          type: "script",
          // Script now always loaded via GoogleAnalyticsConsent component (in _app.jsx & app/layout.tsx); we only toggle consent.
          name: "googletagmanager",
          "consent-category": "analytics",
          gtag: "G-V37M9E3PK3",
          cookies: ["_ga", "_ga_*", "_gid"],
          handleEnable: "grantAnalyticsConsent",
          handleDisable: "revokeAnalyticsConsent"
        }
      ],
      hide: false,
      editable: true,
      enabled: false
    }
    // {
    //   category: 'others',
    //   hide: true,
    //   editable: true,
    //   enabled: false,
    // },
  ]
};

const handlerMap = {
  grantAnalyticsConsent,
  revokeAnalyticsConsent,
  removeGoogleAnalyticsScriptsAndCookies: revokeAnalyticsConsent,
  addGoogleAnalytics: grantAnalyticsConsent
};

function grantAnalyticsConsent() {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("consent", "update", {
    analytics_storage: "granted"
  });
  window.gtag("config", this.gtag);
}

// Utility to remove cookies (kept above revokeAnalyticsConsent to satisfy lint rule)
const removeCookies = (cookieNames) => {
  cookieNames.forEach((name) => {
    const allCookies = document.cookie.split("; "); // Get all cookies as an array of "key=value" strings

    const domains = [
      location.hostname,
      `.${location.hostname.split(".").slice(-2).join(".")}`,
      ".omnistrate.com",
      ".omnistrate.cloud"
    ]; // Current and parent domain

    const paths = ["/"]; // Default path

    if (name.includes("*")) {
      // Handle wildcard pattern
      const regex = new RegExp(`^${name.replace("*", ".*")}`);
      allCookies.forEach((cookie) => {
        const cookieName = cookie.split("=")[0];
        if (regex.test(cookieName)) {
          // Attempt deletion for all domain-path combinations
          domains.forEach((domain) => {
            paths.forEach((path) => {
              document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=${path}; domain=${domain}`;
            });
          });
        }
      });
    } else {
      // Exact match removal
      domains.forEach((domain) => {
        paths.forEach((path) => {
          document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=${path}; domain=${domain}`;
        });
      });
    }
  });
};

function revokeAnalyticsConsent() {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("consent", "update", {
    analytics_storage: "denied"
  });
  // Remove any existing GA cookies that may have been set earlier.
  if (this.cookies?.length) removeCookies(this.cookies);
}

export const handleConsentChanges = (categories) => {
  categories.forEach((cat) => {
    cat.services?.forEach((srv) => {
      if (srv.type === "script") {
        if (cat.enabled) {
          // Grant consent for analytics
          if (srv.handleEnable) handlerMap[srv.handleEnable]?.call(srv);
        } else {
          // Revoke consent and clear cookies if category disabled
          if (srv.handleDisable) handlerMap[srv.handleDisable]?.call(srv);
        }
      }
    });
  });
};
