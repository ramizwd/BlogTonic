import { useState } from 'react';

export const useForm = (initialValues, onSubmit) => {
  const [values, setValues] = useState(initialValues);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    onSubmit(values);
  };

  const reset = () => {
    setValues(initialValues);
  };

  return { values, handleChange, handleSubmit, reset };
};
