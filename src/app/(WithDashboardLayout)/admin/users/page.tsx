import ManageUsers from '@/components/modules/admin/users';
import UsersTable from '@/components/modules/admin/users/UsersTable';
import { getAllUsers } from '@/services/AdminService';

const AllUsers = async() => {

    // const {data} = await getAllUsers();

    return (
        <div>
            {/* <ManageUsers users={data} /> */}
            <UsersTable />
        </div>
    );
};

export default AllUsers;