import { FormData, FormErrors } from '../types';

const validateForm = (
  formData: FormData,
  requiredFields: string[],
  checks:string
): FormErrors => {
  const errors: FormErrors = {};
  for (const key in formData) {
    if (
      requiredFields.includes(key) &&
      !formData[key as keyof FormData].trim()
    ) {
      errors[key as keyof FormData] =
        `${key.charAt(0).toUpperCase() + key.slice(1)} is required`;
    }

    if(checks == 'all' ){
   
    if (key === "password" && formData[key].length < 7) {
      errors[key] = "Password must be at least 7 characters long";
    }
}
  }
  return errors;
};

export default validateForm;
