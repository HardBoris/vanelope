import { ReactNode } from "react";
import { UserProvider } from "./UserContext";
import { CompanyProvider } from "./CompanyContext";
import { PurchaseProvider } from "./PurchaseContext";

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider = ({ children }: AppProviderProps) => (
  <CompanyProvider>
    <UserProvider>
      <PurchaseProvider>{children}</PurchaseProvider>
    </UserProvider>
  </CompanyProvider>
);
