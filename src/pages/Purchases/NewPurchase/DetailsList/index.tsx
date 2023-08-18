import { FaTrash } from "react-icons/fa";
import { Button } from "../../../../components/Button";
import {
  PurchaseDetail,
  elementData,
} from "../../../../context/PurchaseContext";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../../context/UserContext";
import "./DetailsList.css";

interface DetailsListProps {
  show: number;
  elementos: elementData[];
  apagar: (id: number) => void;
  guardar: () => void;
}

export const DetailsList = ({
  show,
  elementos,
  apagar,
  guardar,
}: DetailsListProps) => {
  const navigate = useNavigate();
  const { company } = useAuth();

  return (
    <>
      <div className={show !== 1 ? "invisible" : "elements_head"}>
        <div className="elemento">Elemento</div>
        <div className="cantidad">Quantidade</div>
        <div className="unidad">Unidade</div>
        <div className="delete-item"></div>
      </div>
      <div className={show !== 1 ? "invisible" : "elements_body"}>
        {elementos &&
          elementos.map((item, index) => (
            <div key={index} className="element_row">
              <div className="elemento">{item.element}</div>
              <div className="cantidad">{item.quantity}</div>
              <div className="unidad">{item.unit}</div>
              <div
                role="button"
                className="delete-item"
                onClick={() => apagar(index)}
              >
                <FaTrash />
              </div>
            </div>
          ))}
      </div>
      <div className={show !== 1 ? "invisible" : "element_action"}>
        <Button type="button" onClick={() => navigate(`/${company}/purchases`)}>
          Cancelar
        </Button>
        <Button type="button" onClick={() => guardar()}>
          Guardar
        </Button>
      </div>
    </>
  );
};
