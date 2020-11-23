import { useState } from 'react';

const useInputValue = (initialValue) => {
  const [value, setValue] = useState(initialValue);
  const onChange = (e) => setValue(e.target.value);
  return { value, onChange, reset: () => setValue('') };
};

export default useInputValue;