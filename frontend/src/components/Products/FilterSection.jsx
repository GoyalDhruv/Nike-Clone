import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import { FaAngleDown, FaAngleUp } from 'react-icons/fa';

const filters = [
    {
        id: 'color',
        name: 'Color',
        options: [
            { value: 'white', label: 'White', checked: false },
            { value: 'beige', label: 'Beige', checked: false },
            { value: 'blue', label: 'Blue', checked: true },
            { value: 'brown', label: 'Brown', checked: false },
            { value: 'green', label: 'Green', checked: false },
            { value: 'purple', label: 'Purple', checked: false },
        ],
    },
    {
        id: 'gender',
        name: 'Gender',
        options: [
            { value: 'men', label: 'Men', checked: false },
            { value: 'women', label: 'Women', checked: false },
            { value: 'unisex', label: 'Unisex', checked: false },
        ],
    },
    {
        id: 'size',
        name: 'Size',
        options: [
            { value: '2l', label: '2L', checked: false },
            { value: '6l', label: '6L', checked: false },
            { value: '12l', label: '12L', checked: false },
            { value: '18l', label: '18L', checked: false },
            { value: '20l', label: '20L', checked: false },
            { value: '40l', label: '40L', checked: true },
        ],
    },
    {
        id: 'sports',
        name: 'Sports',
        options: [
            { value: 'football', label: 'Football', checked: false },
            { value: 'basketball', label: 'Basketball', checked: false },
            { value: 'running', label: 'Running', checked: false },
            { value: 'tennis', label: 'Tennis', checked: false },
            { value: 'dance', label: 'Dance', checked: false },
            { value: 'lifestyle', label: 'Lifestyle', checked: true },
        ],
    },
];

function FilterSection() {
    return (
        <>
            {filters.map((filter) => (
                <Disclosure key={filter.id} as="div" className="border-t border-gray-200 py-3">
                    <h3 className="-my-3 flow-root">
                        <DisclosureButton className="group flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                            <span className="text-black font-semibold text-lg tracking-tight">{filter.name}</span>
                            <span className="flex items-center">
                                <FaAngleDown aria-hidden="true" className="w-5 h-5 group-data-[open]:hidden text-black" />
                                <FaAngleUp aria-hidden="true" className="w-5 h-5 text-black group-[&:not([data-open])]:hidden" />
                            </span>
                        </DisclosureButton>
                    </h3>
                    <DisclosurePanel className="py-3">
                        <div className="grid grid-cols-2 gap-2">
                            {filter.options.map((option, optionIdx) => (
                                <div key={option.value} className="flex gap-4 items-center">
                                    <div className="group grid grid-cols-1">
                                        <input
                                            defaultValue={option.value}
                                            defaultChecked={option.checked}
                                            id={`filter-${filter.id}-${optionIdx}`}
                                            name={`${filter.id}[]`}
                                            type="checkbox"
                                            className="col-start-1 row-start-1 appearance-none rounded border border-gray-300 bg-white checked:border-black checked:bg-black indeterminate:border-black indeterminate:bg-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black disabled:border-gray-300 disabled:bg-gray-100 disabled:checked:bg-gray-100 forced-colors:appearance-auto w-6 h-6"
                                        />
                                        <svg
                                            fill="none"
                                            viewBox="0 0 16 16"
                                            className="pointer-events-none col-start-1 row-start-1 w-5 h-5 self-center justify-self-center stroke-white group-has-[:disabled]:stroke-gray-950/25"
                                        >
                                            <path
                                                d="M3 8L6 11L11 3.5"
                                                strokeWidth={2}
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                className="opacity-0 group-has-[:checked]:opacity-100"
                                            />
                                            <path
                                                d="M3 7H11"
                                                strokeWidth={2}
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                className="opacity-0 group-has-[:indeterminate]:opacity-100"
                                            />
                                        </svg>
                                    </div>
                                    <label htmlFor={`filter-${filter.id}-${optionIdx}`} className="text-md font-medium hover:text-textPrimary">
                                        {option.label}
                                    </label>
                                </div>
                            ))}
                        </div>
                    </DisclosurePanel>
                </Disclosure>
            ))}
        </>
    );
}

export default FilterSection;
