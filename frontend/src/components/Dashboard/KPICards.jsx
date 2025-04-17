import React from 'react'
import PropTypes from 'prop-types';
import Badge from '../../components/UI/Badge/Badge'
import { CgArrowBottomRight, CgArrowTopRight } from "react-icons/cg";
import { CurrencyRupeeIcon, UserGroupIcon } from '@heroicons/react/24/outline';
import { MdOutlineCategory } from "react-icons/md";

function KPICards({ data }) {

    const types = [
        { key: 'users', type: "Users", label: 'Total Customers', Icon: UserGroupIcon },
        { key: 'orders', type: "Orders", label: 'Total Orders', Icon: MdOutlineCategory },
        { key: 'revenue', type: "Revenue", label: 'Total Revenue', Icon: CurrencyRupeeIcon }
    ];

    return (
        <>
            {types.map(({ key, type, label, Icon }) => (
                <div key={key} className="rounded-2xl border p-5 md:p-6 flex items-center justify-between">
                    <div>
                        <span className="text-lg tracking-tight font-semibold">
                            {label}
                        </span>
                        <div className='flex gap-3 items-center mt-2'>
                            <h4 className="text-4xl font-bold tracking-tighter">
                                {data[`total${type}`]}
                            </h4>
                            <Badge color={data[`${key}Growth`] > 0 ? "success" : "error"}>
                                {data[`${key}Growth`] > 0 ? (
                                    <CgArrowTopRight />
                                ) : (
                                    <CgArrowBottomRight />
                                )}
                                {data[`${key}Growth`]} %
                            </Badge>
                        </div>
                    </div>
                    <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-full">
                        <Icon className="text-gray-800 size-6" />
                    </div>
                </div>
            ))}
        </>
    )
}

KPICards.propTypes = {
    data: PropTypes.object
}

export default KPICards