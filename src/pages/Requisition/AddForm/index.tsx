import { Resolver, useForm } from "react-hook-form";
import { Requisicion } from "../../../context/RequisitionContext";
import { Formulario } from "../../../components/Form";
import { Modificado } from "../../../components/Modificado";
import { Button } from "../../../components/Button";
import { Movement, useMove } from "../../../context/MoveContext";
// import { useState } from "react";
import "./Add.style.css";

const resolver: Resolver<Movement> = async (values) => {
  return {
    values: values.requisition ? values : {},
    errors: {},
  };
};

interface MoveAddFormProps {
  handleAdd: () => void;
  requested: Requisicion;
  //   move: Movement;
}

export const AddForm = ({ handleAdd, requested }: MoveAddFormProps) => {
  //   const { RequestEditor, Fechador } = useRequisition();
  const { NewMovement } = useMove();

  //   const [movimientos, setMovimientos] = useState<Movement[]>([]);

  const { register, handleSubmit } = useForm<Movement>({ resolver });

  const editado = (data: Movement) => {
    // const { requisitionId } = data;
    // const objeto = { ...data, requisitionId: Number(requisitionId) };
    NewMovement(data);
    handleAdd();
  };

  //   const fecha = Fechador(requisicion.requestDate);

  return (
    <Formulario clase="" onSubmit={handleSubmit(editado)}>
      <div className="modal-add-horizontal">
        <div className="modal-add-fields">
          <div className="add-element">
            <Modificado
              name="moveElement"
              register={register}
              placeholder="Descrição do Elemento"
            />
          </div>
          <div className="add-element-type">
            <Modificado
              name="elementType"
              register={register}
              placeholder="Midia, Material"
            />
          </div>
        </div>
        <div className="modal-add-fields">
          <div className="add-field">
            <Modificado
              name="moveQuantity"
              register={register}
              placeholder="Quantidade"
            />
          </div>
          <div className="add-field">
            <Modificado
              name="moveUnit"
              register={register}
              placeholder="Unidade"
            />
          </div>
          <div className="add-field">
            <Modificado
              name="requisitionId"
              value={requested.requestId}
              register={register}
            />
          </div>
          <div className="add-field">
            <Modificado name="moveType" value="saída" register={register} />
          </div>
        </div>
      </div>
      <div className="modal-add-btn">
        <div className="individual-btn">
          <Button type="button" variant="not" onClick={() => handleAdd()}>
            Cancelar
          </Button>
        </div>
        <div className="individual-btn">
          <Button type="submit" variant="yes">
            Adicionar
          </Button>
        </div>
      </div>
    </Formulario>
  );
};
