import { Field, Input, Label, Listbox, ListboxButton, ListboxOption, ListboxOptions } from '@headlessui/react';
import React from 'react';
import PropTypes from 'prop-types';
import { FaChevronDown } from "react-icons/fa";
import { FaCheck } from "react-icons/fa6";

function InputBox({
    type,
    value,
    handleChange,
    placeholder = '',
    label = '',
    autofocus = false,
    disabled = false,
    name = '',
    id = '',
    maxLength = undefined,
    minLength = undefined,
    pattern = '',
    required = false,
    readOnly = false,
    onBlur = undefined,
    error = '',
    helperText = '',
    options = [],
}) {
    const isSelect = type === 'select';

    const inputClass = `px-2 py-3 text-md text-black tracking-tight font-semibold rounded-lg border focus-visible:outline-none peer ${error ? 'border-red-500' : 'border-gray-300'}`;
    const buttonClass = `relative w-full border text-md font-semibold rounded-lg px-2 py-3 text-left focus:outline-none ${error ? 'border-red-500' : 'border-gray-300'}`;

    return (
        <>
            {isSelect ? (
                <div className="w-[211px] pt-2">
                    <Listbox value={value} onChange={handleChange}>
                        <ListboxButton className={buttonClass}>
                            {options.find(item => item.value === value)?.label || <span className="text-gray-400">Select...</span>}
                            <FaChevronDown
                                className="group pointer-events-none absolute top-4 text-textPrimary right-3 size-4"
                            />
                        </ListboxButton>
                        <ListboxOptions
                            anchor="bottom"
                            transition
                            className={
                                'bg-white mt-2 w-[var(--button-width)] rounded-xl border p-1 focus:outline-none transition duration-150 ease-in data-[leave]:data-[closed]:opacity-0'
                            }
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
                </div>
            ) : (
                <Field className="relative">
                    <Input
                        type={type}
                        name={name}
                        id={id}
                        className={inputClass}
                        placeholder={placeholder}
                        value={value}
                        onChange={handleChange}
                        autoFocus={autofocus}
                        disabled={disabled}
                        maxLength={maxLength}
                        minLength={minLength}
                        pattern={pattern}
                        required={required}
                        readOnly={readOnly}
                        onBlur={onBlur}
                    />
                    {label && (
                        <Label
                            htmlFor={id}
                            id={`${id}-label`}
                            className="absolute text-sm text-textPrimary duration-300 transform origin-[0] bg-white px-2 peer-focus:px-2 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-[47%] peer-focus:top-[6px] peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
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
    type: PropTypes.oneOf(['text', 'number', 'email', 'password', 'select']).isRequired,
    value: PropTypes.any.isRequired, // Can vary based on `type`
    handleChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    label: PropTypes.string,
    autofocus: PropTypes.bool,
    disabled: PropTypes.bool,
    name: PropTypes.string,
    id: PropTypes.string,
    maxLength: PropTypes.number,
    minLength: PropTypes.number,
    pattern: PropTypes.string,
    required: PropTypes.bool,
    readOnly: PropTypes.bool,
    onBlur: PropTypes.func,
    error: PropTypes.string,
    helperText: PropTypes.string,
    options: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string.isRequired,
            value: PropTypes.any.isRequired,
        })
    ),
};

export default InputBox;
