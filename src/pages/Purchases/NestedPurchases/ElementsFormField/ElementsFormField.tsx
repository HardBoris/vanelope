import { BGInput } from "../../../../components/BG Input";
import useElementsFormField from "./useElementsFormField";

const ElementsFormField = () => {
  const { fields, register, addNewElement, removeElement } =
    useElementsFormField();

  return (
    <div>
      <div>
        <div className="input-purchase date">
          <BGInput register={register} name={`listDate`} label="Data" />
        </div>
        <button type="button" onClick={addNewElement}>
          + Adicionar Elemento
        </button>
      </div>
      {fields.map((field, index) => (
        <div key={field.id}>
          <button type="button" onClick={removeElement(index)}>
            -
          </button>
          <div className="input-purchase date">
            <BGInput
              register={register}
              name={`elementsList.${index}.element`}
              label="Elemento"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ElementsFormField;
