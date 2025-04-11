import { Table, TableBody, TableCell, TableHeader, TableHeaderCell, TableRow } from "../UI/Table/Table";
import PropTypes from 'prop-types';
import { getDate } from "../../utils/utils";

function UserTable({ users }) {

    return (
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white mt-5">
            <div className="max-w-full overflow-x-auto">
                <Table className='table-auto'>
                    <TableHeader className="border-b border-gray-100">
                        <TableRow>
                            <TableHeaderCell className="lg:ps-5 text-start">Name</TableHeaderCell>
                            <TableHeaderCell className=" text-start">Email</TableHeaderCell>
                            <TableHeaderCell className="text-start">DOB</TableHeaderCell>
                            <TableHeaderCell className="text-end lg:pe-5">
                                Registered At
                            </TableHeaderCell>
                        </TableRow>
                    </TableHeader>

                    <TableBody className="divide-y divide-gray-100">
                        {users?.map((user) => (
                            <TableRow key={user?._id}>
                                <TableCell className="lg:ps-5 tracking-tight captitalize">
                                    {user?.firstName} {user?.lastName}
                                </TableCell>
                                <TableCell>{user?.email}</TableCell>
                                <TableCell>{getDate(user?.dateOfBirth)}</TableCell>
                                <TableCell className="lg:pe-5 text-end">{getDate(user?.createdAt)}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}

UserTable.propTypes = {
    users: PropTypes.array
}

export default UserTable;