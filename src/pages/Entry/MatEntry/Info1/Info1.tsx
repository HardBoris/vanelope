import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { Formulario } from "../../../../components/Form";
import { Modificado } from "../../../../components/Modificado";
import { Button } from "../../../../components/Button";
import "./style.css";
import { Entry, EntryInfo } from "../../../../context/EntryContext";
import { BGInput } from "../../../../components/BG Input";

const materialEntrySchema = yup.object().shape({
  entryDate: yup.string().required(),
  purchase: yup.string().required(),
  responsivel: yup.string().required(),
});

interface InfoEntry1Props {
  setMaterialEntry: (data: EntryInfo) => void;
  setShow: (arg: number) => void;
}

export const InfoEntry1 = ({ setMaterialEntry, setShow }: InfoEntry1Props) => {
  const ahora = Date.now();

  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<EntryInfo>({
    resolver: yupResolver(materialEntrySchema),
  });

  const sender = (data: EntryInfo) => {
    setMaterialEntry(data);
    setShow(1);
  };

  return (
    <div className="form-wrapper-mr1">
      <Formulario clase="" onSubmit={handleSubmit(sender)}>
        <div className="input-wrapper-mr1">
          <div className="input-individual-mr1">
            <BGInput
              register={register}
              name="entryDate"
              error={errors.entryDate?.message}
              label="Data"
              // type="datetime-local"
              defaultValue={new Date(ahora).toLocaleDateString()}
            />
          </div>
          <div className="input-individual-mr1">
            <BGInput
              register={register}
              name="purchase"
              error={errors.purchase?.message}
              label="Documento"
              placeholder="Número do documento"
            />
          </div>
        </div>
        <div className="input-mr1">
          <BGInput
            register={register}
            name="responsivel"
            error={errors.responsivel?.message}
            label="Responsável"
            placeholder="Nome do responsável"
          />
        </div>
        <div className="input-mr1">
          <Button type="submit" variant="yes">
            Avançar
          </Button>
        </div>
      </Formulario>
    </div>
  );
};
