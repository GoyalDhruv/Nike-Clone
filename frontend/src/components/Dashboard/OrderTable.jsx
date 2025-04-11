import { Table, TableBody, TableCell, TableHeader, TableHeaderCell, TableRow } from "../UI/Table/Table";
import PropTypes from 'prop-types';
import { getDate, getTimeInIST } from "../../utils/utils";
import React, { useState } from "react";

function OrderTable({ orders }) {
    const [expandedOrderId, setExpandedOrderId] = useState(null);

    const toggleExpanded = (id) => {
        setExpandedOrderId(prev => (prev === id ? null : id));
    };

    return (
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white mt-5">
            <div className="xl:max-w-full lg:max-w-[1200px] sm:max-w-[760px] md:max-w-[650px] overflow-x-auto">
                <Table className="table-auto">
                    <TableHeader className="border-b border-gray-100">
                        <TableRow>
                            <TableHeaderCell className="lg:ps-5 text-start">Payment Id</TableHeaderCell>
                            <TableHeaderCell className="text-start">Order Id</TableHeaderCell>
                            <TableHeaderCell className="text-start">Contact Details</TableHeaderCell>
                            <TableHeaderCell className="text-start">Order Amount</TableHeaderCell>
                            <TableHeaderCell className="text-start">Ordered At</TableHeaderCell>
                            <TableHeaderCell className="lg:pe-5">View Items</TableHeaderCell>
                        </TableRow>
                    </TableHeader>

                    <TableBody className="divide-y divide-gray-100">
                        {orders?.map((order) => {
                            const isExpanded = expandedOrderId === order?._id;
                            return (
                                <React.Fragment key={order?._id}>
                                    <TableRow>
                                        <TableCell className="lg:ps-5">{order?.paymentId}</TableCell>
                                        <TableCell>{order?.orderId}</TableCell>
                                        <TableCell>{order?.user?.email}</TableCell>
                                        <TableCell>₹ {order?.totalAmount}</TableCell>
                                        <TableCell>{getDate(order?.createdAt)} {getTimeInIST(order?.createdAt)}</TableCell>
                                        <TableCell className="lg:pe-5 text-end">
                                            <button className="white-btn py-2" onClick={() => toggleExpanded(order?._id)}>
                                                {isExpanded ? "Hide Items" : "View Items"}
                                            </button>
                                        </TableCell>
                                    </TableRow>

                                    {isExpanded && (
                                        <TableRow>
                                            <TableCell colSpan={6}>
                                                <div className="flex gap-2">
                                                    {order?.products?.length > 0 ? (
                                                        order.products.map((product, index) => (
                                                            <div key={index} className="flex gap-2 justify-center items-center p-2">
                                                                <img src={product.image} alt="product" className="lg:w-48 w-24 h-24 lg:h-48" />
                                                                <div>
                                                                    <p className="font-bold tracking-tighter">{product.title}</p>
                                                                    <p className="font-semibold tracking-tighter">₹ {product.discountedPrice}</p>
                                                                </div>
                                                            </div>
                                                        ))
                                                    ) : (
                                                        <p>No products found for this order.</p>
                                                    )}
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </React.Fragment>
                            );
                        })}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}

OrderTable.propTypes = {
    orders: PropTypes.array
}

export default OrderTable;