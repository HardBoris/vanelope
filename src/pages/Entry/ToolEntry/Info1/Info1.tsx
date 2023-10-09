import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Formulario } from "../../../../components/Form";
import { Modificado } from "../../../../components/Modificado";
import { Button } from "../../../../components/Button";
import { ToolEntry, ToolEntryInfo } from "..";
import "./style.css";

const toolEntrySchema = yup.object().shape({
  entryDate: yup.string().required(),
  invoice: yup.string().required(),
  seller: yup.string().required(),
});

interface InfoToolEntry1Props {
  setToolEntry: (data: ToolEntryInfo) => void;
  setShow: (arg: number) => void;
}

export const InfoToolEntry1 = ({
  setToolEntry,
  setShow,
}: InfoToolEntry1Props) => {
  const ahora = Date.now();

  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm<ToolEntryInfo>({ resolver: yupResolver(toolEntrySchema) });

  const sender = (data: ToolEntryInfo) => {
    setToolEntry(data);
    setShow(1);
  };

  return (
    <div className="form-wrapper">
      <Formulario clase="" onSubmit={handleSubmit(sender)}>
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
              name="purchase"
              error={errors.purchase?.message}
              label="Documento"
              placeholder="Número do Documento"
            />
          </div>
        </div>
        <div className="input-individual">
          <Modificado
            register={register}
            name="responsivel"
            error={errors.responsivel?.message}
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
