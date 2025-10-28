import { CategoryWithoutServices, CookieConsent } from "@/types/cookieConsent";
import { createContext, ReactNode, useContext, useEffect, useState } from "react";

import { cookieConsentInitialObject, handleConsentChanges } from "@/lib/cookieConsentManager";
import CookieConsentModal from "@/components/CookieConsentModal";

type CookieConsentContextType = {
  consentState: CookieConsent;
  updateConsent: (updatedCategories: CategoryWithoutServices[]) => void;
  isConsentModalOpen: boolean;
  setIsConsentModalOpen: (isOpen: boolean) => void;
  openCookieConsentModal: () => void;
};

// Default value for context
const defaultContextValue: CookieConsentContextType = {
  consentState: cookieConsentInitialObject as CookieConsent,
  updateConsent: () => {},
  isConsentModalOpen: false,
  setIsConsentModalOpen: () => {},
  openCookieConsentModal: () => {}
};

export const CookieConsentContext = createContext<CookieConsentContextType>(defaultContextValue);

type CookieConsentProviderProps = {
  children: ReactNode;
};
export default function CookieConsentProvider({ children }: CookieConsentProviderProps) {
  const [consentState, setConsentState] = useState(cookieConsentInitialObject as CookieConsent);
  const [isConsentModalOpen, setIsConsentModalOpen] = useState(false);

  const [isInitialLoad, setIsIntialLoad] = useState(true);

  const openCookieConsentModal = () => setIsConsentModalOpen(true);

  // Runs only on the client after the first render
  useEffect(() => {
    const storedConsent = localStorage.getItem("cookieConsent");
    const parsedConsent = storedConsent ? JSON.parse(storedConsent) : null;
    if (parsedConsent) {
      // if there is consent in local storage set it to state
      handleConsentChanges(parsedConsent.categories);
      setConsentState(parsedConsent);
    } else {
      //otherwise set the initial object to consent in local storage
      localStorage.setItem("cookieConsent", JSON.stringify(cookieConsentInitialObject));
    }
    if (!parsedConsent?.consentGiven) setIsConsentModalOpen(true);
  }, []);

  useEffect(() => {
    // handle changes in consent state
    if (isInitialLoad) {
      setIsIntialLoad(false);
    } else {
      localStorage.setItem("cookieConsent", JSON.stringify(consentState));
      handleConsentChanges(consentState.categories);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [consentState]);

  const updateConsent = (updatedCategories: CategoryWithoutServices[]) => {
    const newCategories = consentState.categories.map((cat) => {
      const updatedCategory = updatedCategories.find((uc) => uc.category === cat.category);
      return updatedCategory ? { ...cat, enabled: updatedCategory.enabled } : cat;
    });
    setConsentState({ ...consentState, categories: newCategories, consentGiven: true });
  };

  return (
    <CookieConsentContext.Provider
      value={{
        consentState,
        updateConsent,
        isConsentModalOpen,
        setIsConsentModalOpen,
        openCookieConsentModal
      }}
    >
      {children}
      <CookieConsentModal />
    </CookieConsentContext.Provider>
  );
}

export const useCookieConsentContext = () => useContext(CookieConsentContext);
