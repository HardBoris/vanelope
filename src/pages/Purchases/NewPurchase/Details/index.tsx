import { useForm } from "react-hook-form";
import { BGInput } from "../../../../components/BG Input";
import { Button } from "../../../../components/Button";
import { Formulario } from "../../../../components/Form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { PurchaseDetail } from "../../../../context/PurchaseContext";

const DetailInfoSchema = yup.object().shape({
  element: yup.string().required(),
  quantity: yup.string().required(),
  unit: yup.string().required(),
  cost: yup.string().required(),
  elementType: yup.string().required(),
});

export const Details = () => {
  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<PurchaseDetail>({
    resolver: yupResolver(DetailInfoSchema),
  });

  const sender = () => {
    console.log();
  };

  return (
    <>
      <div className="wrapper-mr2">
        <Formulario onSubmit={handleSubmit(sender)}>
          <div className="input-wrapper-mr2">
            <div className="input-individual-mr2">
              <BGInput
                register={register}
                name="element"
                error={errors.element?.message}
                label="Elemento"
                placeholder="Descrição do elemento"
              />
            </div>
            <div className="input-individual-mr2">
              <BGInput
                register={register}
                name="elementType"
                error={errors.elementType?.message}
                label="Tipo de elemento"
                placeholder="Ferramenta, acessório"
              />
            </div>
            <div className="input-individual-mr2">
              <BGInput
                register={register}
                name="quantity"
                error={errors.quantity?.message}
                label="Quantidade"
                placeholder="moveQuantity"
              />
            </div>
            <div className="input-individual-mr2">
              <BGInput
                register={register}
                name="unit"
                error={errors.unit?.message}
                label="Unidade"
                placeholder="moveUnit"
              />
            </div>
            <div className="input-individual-mr2">
              <BGInput
                register={register}
                name="price"
                error={errors.price?.message}
                label="Unidade"
                placeholder="moveUnit"
              />
            </div>
          </div>
          <div className="botonera-mr2">
            <Button type="button" /* onClick={() => volver()} */>Voltar</Button>
            <Button variant="yes" type="submit">
              Incluir
            </Button>
          </div>
        </Formulario>
      </div>
    </>
  );
};
