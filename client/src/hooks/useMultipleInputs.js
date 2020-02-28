import {useState} from 'react';

const useInputState = (p) => {

    const [value, setValue] = useState({
            sku: "",
            name: "",
            qty: "",
            price: "",
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
            price: "",
            category: ""
        });
    }

    const edit = () => {
        setValue({
            sku: p.SKU,
            name: p.product_name,
            qty: p.qty,
            price: p.price,
            category: p.category
        });
    }

    return [value, handleChange, reset, edit]
}
export default useInputState;
