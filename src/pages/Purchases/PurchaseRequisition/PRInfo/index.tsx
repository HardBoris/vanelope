import { Button } from "../../../../components/Button";
import { PRDetails } from "../PRDetails";
import { useState } from "react";
import { ElementToBuy } from "../../../../context/ElementContext";
import { Container } from "../../../../components/Container";
import { usePR } from "../../../../context/PurchaseRequisitionContext";
import { PRDetailsList } from "../PRDetailsList";
import { useAuth } from "../../../../context/UserContext";
import "./PRInfo.css";

export const PRInfo = () => {
  const { user, company } = useAuth();
  const { prequestCreator } = usePR();
  const ahora = Date.now();
  const [elementos, setElementos] = useState<ElementToBuy[]>([]);

  const sender = () => {
    const data = {
      requestor: user.userId,
      company: company.code,
      listDate: new Date(ahora).toLocaleDateString("pt"),
      details: elementos,
    };
    console.log(data);
    prequestCreator(data);
  };

  return (
    <div className="form-wrapper-purchase">
      <Container>
        <div className="shoppinglist-wrapper">
          <div className="input-purchase date">
            {new Date(ahora).toLocaleDateString("pt")}
          </div>
          <PRDetails elementos={elementos} setElementos={setElementos} />
          <PRDetailsList elementos={elementos} setElementos={setElementos} />
        </div>
        <div className="input-purchase">
          <Button type="button" variant="yes" onClick={() => sender()}>
            Avançar
          </Button>
        </div>
      </Container>
    </div>
  );
};
