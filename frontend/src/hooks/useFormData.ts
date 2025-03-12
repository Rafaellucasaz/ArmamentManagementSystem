import { useState } from 'react';

const useFormData = <T extends object>(initialData: T) => {
  const [formData, setFormData] = useState<T>(initialData);

  const handleFormData = (name: string, value: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    handleFormData(name, value);
  };

  const handleSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    handleFormData(name, value);
  };

  return {
    formData,
    setFormData,
    handleInput,
    handleSelect,
  };
};

export default useFormData;