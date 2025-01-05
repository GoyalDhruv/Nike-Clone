import { Field, Input, Label, Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react';
import React from 'react';
import PropTypes from 'prop-types';
import { FaChevronDown } from "react-icons/fa";
import { FaCheck } from "react-icons/fa6";

function InputBox({
    type,
    value,
    onChange,
    placeholder = '',
    label = '',
    autofocus = false,
    disabled = false,
    name = '',
    id = '',
    maxLength = undefined,
    minLength = undefined,
    required = false,
    readOnly = false,
    onBlur = undefined,
    error = '',
    helperText = '',
    options = [],
}) {

    const handleCheckboxChange = (optionValue) => {
        const newValue = value.includes(optionValue)
            ? value.filter(val => val !== optionValue)
            : [...value, optionValue];
        onChange({ target: { name, value: newValue } });
    };

    const handleRadioChange = (optionValue) => {
        onChange({ target: { name, value: optionValue } });
    };

    return (
        <>
            {type === 'select' ? (
                <Field className="w-100 mt-3">
                    <Listbox value={value} onChange={onChange}>
                        <ListboxButton className={`relative w-full border text-md font-semibold rounded-lg px-2 py-3 text-left focus:outline-none ${error ? 'border-red-500' : 'border-gray-300'}`}>
                            {value ?
                                options.find(option => option.value === value)?.label ||
                                <span className="text-textPrimary font-normal">Select....</span>
                                : <span className="text-textPrimary font-normal">Select...</span>
                            }
                            <FaChevronDown className="group pointer-events-none absolute top-4 text-textPrimary right-3 size-4" />
                        </ListboxButton>
                        <ListboxOptions
                            anchor="bottom"
                            transition
                            className='bg-white z-10 mt-2 w-[var(--button-width)] rounded-xl border p-1 focus:outline-none transition duration-150 ease-in data-[leave]:data-[closed]:opacity-0'
                        >
                            {options.map(({ label, value: optionValue }) => (
                                <ListboxOption
                                    key={optionValue}
                                    value={optionValue}
                                    className="group flex items-center gap-2 rounded-lg py-2 px-3 cursor-pointer hover:bg-bgPrimary"
                                >
                                    <FaCheck className="invisible size-3 group-data-[selected]:visible" />
                                    <span className="text-sm">{label}</span>
                                </ListboxOption>
                            ))}
                        </ListboxOptions>
                    </Listbox>
                </Field>
            ) : type === 'checkbox' ? (
                <div className='grid sm:grid-cols-4 grid-cols-2 gap-2'>
                    {options.map((option, index) => (
                        <Field key={option.value} className="flex gap-2 items-center">
                            <Input
                                type="checkbox"
                                checked={value.includes(option.value)}
                                onChange={() => handleCheckboxChange(option.value)}
                                className="w-5 h-5 rounded border-gray-300 checked:accent-black cursor-pointer"
                            />
                            <Label htmlFor={`filter-${index}`} className="text-md font-medium">
                                {option.label}
                            </Label>
                        </Field>
                    ))}
                </div>
            ) : type === 'radio' ? (
                <div className='grid sm:grid-cols-3 grid-cols-2 gap-2'>
                    {options.map((option, index) => (
                        <Field key={option.value} className="flex gap-2 items-center">
                            <Input
                                type="radio"
                                checked={value === option.value}
                                onChange={() => handleRadioChange(option.value)}
                                name={name}
                                id={`radio-${index}`}
                                className="w-5 h-5 rounded border-gray-300 checked:accent-black cursor-pointer"
                            />
                            <Label htmlFor={`radio-${index}`} className="text-md font-medium">
                                {option.label}
                            </Label>
                        </Field>
                    ))}
                </div>
            ) : (
                <Field className="relative mt-3">
                    <Input
                        type={type}
                        name={name}
                        id={id}
                        className={`block px-3 py-3 border w-full text-md tracking-tight font-semibold rounded-lg border-1 focus:outline-none focus:ring-0 peer ${error ? 'border-red-500' : 'border-gray-300'}`}
                        placeholder={placeholder}
                        value={value}
                        onChange={onChange}
                        autoFocus={autofocus}
                        disabled={disabled}
                        maxLength={maxLength}
                        minLength={minLength}
                        required={required}
                        readOnly={readOnly}
                        onBlur={onBlur}
                    />
                    {label && (
                        <Label
                            htmlFor={id}
                            id={`${id}-label`}
                            className="absolute text-sm text-textPrimary duration-300 transform -translate-y-4 scale-75 top-1.5 z-10 origin-[0] bg-white px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-1.5 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1 cursor-auto"
                        >
                            {label}
                        </Label>
                    )}
                </Field>
            )}
            {error && <div className="text-red-500 text-xs mt-1">{error}</div>}
            {!error && helperText && <div className="text-gray-500 text-xs mt-1">{helperText}</div>}
        </>
    );
}

InputBox.propTypes = {
    type: PropTypes.oneOf(['text', 'number', 'email', 'password', 'select', 'checkbox', 'radio', 'date']).isRequired,
    value: PropTypes.any.isRequired,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    label: PropTypes.string,
    autofocus: PropTypes.bool,
    disabled: PropTypes.bool,
    name: PropTypes.string,
    id: PropTypes.string,
    maxLength: PropTypes.number,
    minLength: PropTypes.number,
    required: PropTypes.bool,
    readOnly: PropTypes.bool,
    onBlur: PropTypes.func,
    error: PropTypes.string,
    helperText: PropTypes.string,
    options: PropTypes.array
};

export default InputBox;
