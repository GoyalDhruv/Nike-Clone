import React, { useState } from 'react'
import InputBox from '../../components/InputBox/InputBox';

const options = [
    { id: '1', label: 'Option 1', value: '1' },
    { id: '2', label: 'Option 2', value: '2' },
    { id: '3', label: 'Option 3', value: '3' },
];


function AddProduct() {
    const [value, setValue] = useState('');

    const [selectedValue, setSelectedValue] = useState('3');

    const handleSelectChange = (value) => {
        setSelectedValue(value);
    };

    const handleChange = (e) => {
        setValue(e.target.value);
    };
    return (
        <>

        </>
    )
}

export default AddProduct