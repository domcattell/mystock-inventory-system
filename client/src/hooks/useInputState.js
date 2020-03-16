import {useState} from 'react';

const useInputState = (init) => {
    const [newValue, setValue] = useState(init);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setValue(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const currentFormData = (init) => {
        setValue(init);
    };

    const reset = () => {
        setValue(init);
    };
    
    return [newValue, handleChange, reset, currentFormData,];
}

export default useInputState;
