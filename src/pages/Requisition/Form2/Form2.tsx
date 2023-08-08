import "./Form2.style.css";
import { Formulario } from "../../../components/Form";
import { Input } from "../../../components/Input";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button } from "../../../components/Button";
import { useNavigate } from "react-router-dom";
import { useRequisition } from "../../../context/RequisitionContext";
import { useState } from "react";
import { FaTrash } from "react-icons/fa";
import Modal from "../../../components/Modal";
import { ReqPrinter } from "../Print/Printer";
import { Movement } from "../../../context/MoveContext";

const movementSchema = yup.object().shape({
  moveElement: yup.string().required(),
  elementType: yup.string().required(),
  moveQuantity: yup.number().required(),
  moveUnit: yup.string().required(),
});

export const Form2 = () => {
  const navigate = useNavigate();
  const { solicitud, Peticion } = useRequisition();
  const [move, setMove] = useState(solicitud);
  const [movimientos, setMovimientos] = useState<Movement[]>([]);
  const [isPrint, setIsPrint] = useState(false);

  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<Movement>({ resolver: yupResolver(movementSchema) });

  const sender = (info: Movement) => {
    setMovimientos([...movimientos, { ...info, moveType: "saída" }]);
    setMove({
      ...move,
      movements: [...movimientos, { ...info, moveType: "saída" }],
    });
  };

  const apagar = (index: number) => {
    const eliminado = movimientos.splice(index, 1);
    setMovimientos(movimientos.filter((item) => item !== eliminado[0]));
  };

  const volver = () => {
    navigate(-1);
  };

  const guardar = () => {
    Peticion(move);
    setIsPrint(true);
  };

  const handlePrint = () => {
    setIsPrint(!isPrint);
    navigate("/requisitions");
  };

  return (
    <>
      <div className="wrapper">
        <Formulario onSubmit={handleSubmit(sender)}>
          <div className="input-horizontal-wrapper">
            <div className="input-individual">
              <Input
                register={register}
                name="moveElement"
                error={errors.moveElement?.message}
                label="Elemento"
                placeholder="Descrição do elemento"
                isPassword={false}
              />
            </div>
            <div className="input-individual">
              <Input
                register={register}
                name="elementType"
                error={errors.elementType?.message}
                label="Tipo de elemento"
                placeholder="Mídia, material, ferramenta"
                isPassword={false}
              />
            </div>
            <div className="input-individual">
              <Input
                register={register}
                name="moveQuantity"
                error={errors.moveQuantity?.message}
                label="Quantidade"
                placeholder="Quantidade"
                isPassword={false}
              />
            </div>
            <div className="input-individual">
              <Input
                register={register}
                name="moveUnit"
                error={errors.moveUnit?.message}
                label="Unidade"
                placeholder="Unidade de medida"
                isPassword={false}
              />
            </div>
          </div>
          <div className="botonera">
            <Button type="button" onClick={() => volver()}>
              Voltar
            </Button>
            <Button variant="yes" type="submit">
              Incluir
            </Button>
          </div>
          {movimientos &&
            movimientos.map((item, index) => (
              <div className="move_row" key={index}>
                <div className="elemento">{item.moveElement}</div>
                <div className="cantidad">{item.moveQuantity}</div>
                <div className="unidad">{item.moveUnit}</div>
                <div
                  role="button"
                  className="delete-item"
                  onClick={() => apagar(index)}
                >
                  <FaTrash />
                </div>
              </div>
            ))}
          {movimientos.length !== 0 && (
            <div className="botonera">
              <Button type="button" onClick={() => navigate("/requisitions")}>
                Cancelar
              </Button>
              <Button type="button" onClick={() => guardar()}>
                Guardar
              </Button>
            </div>
          )}
        </Formulario>
      </div>
      <Modal isOpen={isPrint} setIsOpen={handlePrint}>
        <ReqPrinter
          requested={solicitud}
          movements={movimientos}
          handlePrint={handlePrint}
          isPrintable={true}
        />
      </Modal>
    </>
  );
};
