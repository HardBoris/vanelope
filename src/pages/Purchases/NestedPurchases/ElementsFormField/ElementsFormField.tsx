import { useState } from "react";
import { BGInput } from "../../../../components/BG Input";
import useElementsFormField from "./useElementsFormField";

const ElementsFormField = () => {
  const { fields, register, addNewElement, removeElement } =
    useElementsFormField();

  return (
    <div className="lista">
      <div className="listDate">
        <div className="input-purchase date">
          <BGInput register={register} name={`listDate`} label="Data" />
        </div>
      </div>
      <div className="campos">
        {fields.map((field, index) => (
          <div key={field.id} className="campos-row">
            <div className="campos-data">
              <div className="input-purchase date">
                <BGInput
                  register={register}
                  name={`elementsList.${index}.element`}
                  label="Elemento"
                />
              </div>
              <div className="input-purchase date">
                <BGInput
                  register={register}
                  name={`elementsList.${index}.elementType`}
                  label="Tipo de Elemento"
                />
              </div>
              <div className="input-purchase date">
                <BGInput
                  register={register}
                  name={`elementsList.${index}.quantity`}
                  label="Quantidade"
                />
              </div>
              <div className="input-purchase date">
                <BGInput
                  register={register}
                  name={`elementsList.${index}.defaultUnit`}
                  label="Unidade de Medida"
                />
              </div>
            </div>
            <div className="campos-action">
              <button type="button" onClick={removeElement(index)}>
                -
              </button>
            </div>
          </div>
        ))}
      </div>
      <div className="lista-action">
        <button type="button" onClick={addNewElement}>
          + Adicionar Elemento
        </button>
      </div>
    </div>
  );
};

export default ElementsFormField;
