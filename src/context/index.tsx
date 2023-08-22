import { ReactNode } from "react";
import { UserProvider } from "./UserContext";
import { CompanyProvider } from "./CompanyContext";
import { PurchaseProvider } from "./PurchaseContext";
import { RequisitionProvider } from "./RequisitionContext";
import { EntryProvider } from "./EntryContext";
import { MoveProvider } from "./MoveContext";
import { PartnerProvider } from "./PartnerContext";
import { DetailProvider } from "./DetailContext";

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider = ({ children }: AppProviderProps) => (
  <CompanyProvider>
    <UserProvider>
      <PartnerProvider>
        <PurchaseProvider>
          <DetailProvider>
            <RequisitionProvider>
              <EntryProvider>
                <MoveProvider>{children}</MoveProvider>
              </EntryProvider>
            </RequisitionProvider>
          </DetailProvider>
        </PurchaseProvider>
      </PartnerProvider>
    </UserProvider>
  </CompanyProvider>
);
