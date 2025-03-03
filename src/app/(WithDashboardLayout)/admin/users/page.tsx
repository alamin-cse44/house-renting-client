import ManageUsers from '@/components/modules/admin/users';
import { getAllUsers } from '@/services/AdminService';

const AllUsers = async() => {

    const {data} = await getAllUsers();

    return (
        <div>
            <ManageUsers users={data} />
        </div>
    );
};

export default AllUsers;