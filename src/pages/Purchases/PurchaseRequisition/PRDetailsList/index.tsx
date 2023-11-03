import { FaTrash } from "react-icons/fa";
import { Button } from "../../../../components/Button";
import { ElementToBuy } from "../../../../context/ElementContext";
import "./PRDetailsList.css";

interface DetailsListProps {
  elementos: ElementToBuy[];
  setElementos: (item: ElementToBuy[]) => void;
}

export const PRDetailsList = ({
  elementos,
  setElementos,
}: DetailsListProps) => {
  const eliminator = (id: string, i: number) => {
    setElementos(elementos.filter((item) => item.elementName !== id));
    elementos.splice(i, 1);
  };

  return (
    <div className="wrapper-dt">
      <div className="data-show">
        {elementos &&
          elementos.map((item, index) => (
            <div key={index} className="data-row">
              <div className="detail-wrapper-dt">
                <div className="individual-detail element-dt">
                  <div className="show">{item.elementName}</div>
                </div>
                <div className="individual-detail type-dt">
                  <div className="show">{item.elementType}</div>
                </div>
                <div className="individual-detail qty-dt">
                  <div className="show">{item.quantity}</div>
                </div>
                <div className="individual-detail unit-dt">
                  <div className="show">{item.unit}</div>
                </div>
              </div>
              <div className="botonera-dt">
                <Button
                  variant="yes"
                  type="button"
                  onClick={() => eliminator(item.elementName, index)}
                >
                  Eliminar
                </Button>
              </div>
              <div className="detail-action">
                <div
                  className="detail-btn"
                  onClick={() => eliminator(item.elementName, index)}
                >
                  <FaTrash />
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};
