import {useState} from 'react';

const useInputState = () => {
    
    const [value, setValue] = useState({
            username: "",
            password: ""
    })

    const handleChange = (e) => {
        setValue({
            ...value,
            [e.target.name]: e.target.value
        })
    }
    const reset = () => {
        setValue({
            username: "",
            password: ""
        });
    }
    return [value, handleChange, reset]
}
export default useInputState;
