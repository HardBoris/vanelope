import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { Formulario } from "../../../../components/Form";
import { Modificado } from "../../../../components/Modificado";
import { Button } from "../../../../components/Button";
// import { Requisicion } from "../../../../context/RequisitionContext";
import "./style.css";
import { Entry } from "../../../../context/EntryContext";

const materialEntrySchema = yup.object().shape({
  entryDate: yup.string().required(),
  invoice: yup.string().required(),
  seller: yup.string().required(),
});

interface InfoEntry1Props {
  setMaterialEntry: (data: Entry) => void;
  setShow: (arg: number) => void;
}

export const InfoEntry1 = ({ setMaterialEntry, setShow }: InfoEntry1Props) => {
  const ahora = Date.now();

  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<Entry>({
    resolver: yupResolver(materialEntrySchema),
  });

  const sender = (data: Entry) => {
    setMaterialEntry(data);
    setShow(1);
  };

  return (
    <div className="form-wrapper">
      <Formulario onSubmit={handleSubmit(sender)}>
        <div className="input-horizontal-wrapper">
          <div className="input-individual">
            <Modificado
              register={register}
              name="entryDate"
              error={errors.entryDate?.message}
              label="Data"
              defaultValue={new Date(ahora).toLocaleDateString()}
            />
          </div>
          <div className="input-individual">
            <Modificado
              register={register}
              name="invoice"
              error={errors.invoice?.message}
              label="Documento"
              placeholder="Número do documento"
            />
          </div>
        </div>
        <div className="input-individual">
          <Modificado
            register={register}
            name="seller"
            error={errors.seller?.message}
            label="Responsável"
            placeholder="Nome do responsável"
          />
        </div>
        <Button type="submit" variant="yes">
          Avançar
        </Button>
      </Formulario>
    </div>
  );
};
