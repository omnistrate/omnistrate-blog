"use client";

import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import CookieConsentProvider from "./cookieConsentContext";

export const RootProviders = ({ children }: { children: React.ReactNode }) => {
  return (
    <AppRouterCacheProvider>
      <CookieConsentProvider>{children}</CookieConsentProvider>
    </AppRouterCacheProvider>
  );
};
