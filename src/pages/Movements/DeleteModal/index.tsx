import { Button } from "../../../components/Button";
import { Formulario } from "../../../components/Form";
import { Movement, useMove } from "../../../context/MoveContext";

interface MovDelModalProps {
  handleDeletor: () => void;
  move: Movement;
}

export const MovDelModal = ({ handleDeletor, move }: MovDelModalProps) => {
  const { moveDeletor } = useMove();
  const eliminator = (id: any) => {
    moveDeletor(id);
    handleDeletor();
  };
  return (
    <Formulario clase="">
      <div className="modal-txt">
        <h4 className="cuidado">Cuidado!</h4>
        <p>Esta ação não pode ser desfeita!</p>
        <p>Deseja eliminar o movimento {move.moveId}?</p>
      </div>
      <div className="modal-btn">
        <div className="individual-btn">
          <Button
            variant="yes"
            type="button"
            onClick={() => eliminator(move.moveId)}
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
