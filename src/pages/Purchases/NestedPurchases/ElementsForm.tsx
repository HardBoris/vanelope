import React from "react";
import { FormProvider } from "react-hook-form";
import useElementsForm from "./useElementsForm";
import ElementsFormField from "./ElementsFormField/ElementsFormField";
// import styles from "./FriendsForm.module.scss";

const ElementForm = () => {
  const { handleSubmit, methods } = useElementsForm();

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit} /* className={styles.form} */>
        <ElementsFormField />
        <button type="submit">Submit</button>
      </form>
    </FormProvider>
  );
};

export default ElementForm;
