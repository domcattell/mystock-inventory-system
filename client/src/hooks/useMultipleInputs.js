import {useState} from 'react';

const useInputState = () => {
    
    const [value, setValue] = useState({
            sku: "",
            name: "",
            qty: "",
            category: ""
    })

    const handleChange = (e) => {
        setValue({
            ...value,
            [e.target.name]: e.target.value
        })
    }

    const reset = () => {
        setValue({
            sku: "",
            name: "",
            qty: "",
            category: ""
        });
    }

    return [value, handleChange, reset]
}
export default useInputState;
