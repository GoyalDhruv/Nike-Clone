import { Table, TableBody, TableCell, TableHeader, TableHeaderCell, TableRow } from "../UI/Table/Table";
import PropTypes from 'prop-types';
import { useNavigate } from "react-router";

function ProductTable({ products }) {

    const navigate = useNavigate()

    const handleEditNavigation = (id) => {
        navigate(`/dashboard/products/edit/${id}`)
    }

    return (
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white mt-5">
            <div className="max-w-full overflow-x-auto">
                <Table className='table-auto'>
                    <TableHeader className="border-b border-gray-100">
                        <TableRow>
                            <TableHeaderCell className="lg:ps-5 text-start">Name</TableHeaderCell>
                            <TableHeaderCell className="text-start">Category</TableHeaderCell>
                            <TableHeaderCell className="text-start">Image</TableHeaderCell>
                            <TableHeaderCell className="text-start">Price</TableHeaderCell>
                            <TableHeaderCell className="lg:pe-5 text-end">Action</TableHeaderCell>
                        </TableRow>
                    </TableHeader>

                    <TableBody className="divide-y divide-gray-100">
                        {products.map((product) => (
                            <TableRow key={product._id}>
                                <TableCell className="lg:ps-5 tracking-tight">                             {product.title}
                                </TableCell>
                                <TableCell className="capitalize">{product.category}</TableCell>
                                <TableCell>
                                    <img src={product?.variants?.[0]?.coverImg} alt="product img"
                                        className="lg:w-16 w-12 h-12 lg:h-16 overflow-hidden rounded-lg" />
                                </TableCell>
                                <TableCell className="tracking-tight">₹ {product?.discountedPrice}</TableCell>
                                <TableCell className="lg:pe-5 text-end">
                                    <button className="white-btn py-2" onClick={() => handleEditNavigation(product?._id)}>Edit</button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}

ProductTable.propTypes = {
    products: PropTypes.array
}

export default ProductTable;
