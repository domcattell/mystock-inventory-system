import {useState} from 'react';

const useToggleState = (init) => {
    const [state, setState] = useState(init)
    const toggle = () => {
        setState(!state);
    }
    return [state, toggle];
}

export default useToggleState;
