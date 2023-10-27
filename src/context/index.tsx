import { ReactNode } from "react";
import { UserProvider } from "./UserContext";
import { CompanyProvider } from "./CompanyContext";
import { PurchaseProvider } from "./PurchaseContext";
import { RequisitionProvider } from "./RequisitionContext";
import { EntryProvider } from "./EntryContext";
import { MoveProvider } from "./MoveContext";
import { PartnerProvider } from "./PartnerContext";
import { DetailProvider } from "./DetailContext";
import { ElementProvider } from "./ElementContext";
import { PRProvider } from "./PurchaseRequisitionContext";

interface AppProviderProps {
  children: ReactNode;
}

export const AppProvider = ({ children }: AppProviderProps) => (
  <CompanyProvider>
    <UserProvider>
      <PartnerProvider>
        <PRProvider>
          <PurchaseProvider>
            <ElementProvider>
              <RequisitionProvider>
                <EntryProvider>
                  <MoveProvider>{children}</MoveProvider>
                </EntryProvider>
              </RequisitionProvider>
            </ElementProvider>
          </PurchaseProvider>
        </PRProvider>
      </PartnerProvider>
    </UserProvider>
  </CompanyProvider>
);
