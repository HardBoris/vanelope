import { useRequisition } from "../../../context/RequisitionContext";
import { Button } from "../../../components/Button";
import { Formulario } from "../../../components/Form";
import { Requisicion } from "../../../context/RequisitionContext";

interface ReqDelModalProps {
  handleDeletor: () => void;
  requisicion: Requisicion;
}

export const ReqDelModal = ({
  handleDeletor,
  requisicion,
}: ReqDelModalProps) => {
  const { requestEliminator } = useRequisition();
  const eliminator = (id: any) => {
    requestEliminator(id);
    handleDeletor();
  };
  return (
    <Formulario clase="">
      <div className="modal-txt">
        <h4 className="cuidado">Cuidado!</h4>
        <p>Esta ação não pode ser desfeita!</p>
        <p>Deseja eliminar a requisição {requisicion.requestId}?</p>
      </div>
      <div className="modal-btn">
        <div className="individual-btn">
          <Button
            variant="yes"
            type="button"
            onClick={() => eliminator(requisicion.requestId)}
          >
            Sim
          </Button>
        </div>
        <div className="individual-btn">
          <Button variant="not" type="button" onClick={() => handleDeletor()}>
            Não
          </Button>
        </div>
      </div>
    </Formulario>
  );
};
