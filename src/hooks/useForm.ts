import React from 'react';
import { FormData, FormErrors } from '~/types';
import validateForm from '~/utils/validationUtils';

const useForm = (
  initialState: FormData,
  onSubmit: () => void,
  page:string
) => {
  const [formData, setFormData] = React.useState<FormData>(initialState);
  const [errors, setErrors] = React.useState<FormErrors>({});
  const [isFormValid, setIsFormValid] = React.useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const requiredFields = Object.entries(formData)
      .filter(([key, value]) => {
        return document.getElementById(key)?.hasAttribute("required");
      })
      .map(([key, _]) => key);

      
    const validationErrors = page == 'signuppage'?validateForm(formData, requiredFields,'all'):validateForm(formData, [],'nocheck');
    setErrors(validationErrors);
    setIsFormValid(Object.keys(validationErrors).length === 0);
    
    if (Object.keys(validationErrors).length === 0 || isFormValid) {
      onSubmit();
    }
 
  };

  return { formData, errors, isFormValid, handleChange, handleSubmit };
};

export default useForm;
