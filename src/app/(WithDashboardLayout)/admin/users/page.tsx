import ManageUsers from '@/components/modules/admin/users';
import { getAllUsers } from '@/services/AdminService';

const AllUsers = async() => {

    const {data} = await getAllUsers();

    return (
        <div>
            <ManageUsers users={data} />
            {/* <ManageUsers /> */}
        </div>
    );
};

export default AllUsers;