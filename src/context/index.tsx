import { ReactNode } from "react";
import { UserProvider } from "./UserContext";
import { CompanyProvider } from "./CompanyContext";
import { PurchaseProvider } from "./PurchaseContext";
import { RequisitionProvider } from "./RequisitionContext";
import { EntryProvider } from "./EntryContext";
import { MoveProvider } from "./MoveContext";

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider = ({ children }: AppProviderProps) => (
  <CompanyProvider>
    <UserProvider>
      <PurchaseProvider>
        <RequisitionProvider>
          <EntryProvider>
            <MoveProvider>{children}</MoveProvider>
          </EntryProvider>
        </RequisitionProvider>
      </PurchaseProvider>
    </UserProvider>
  </CompanyProvider>
);
