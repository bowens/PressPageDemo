import React, { useEffect } from 'react';
import useUserStore from './Store';
import DeleteUserButton from "./DeleteUserButton";
import UserAvatar from "./UserAvatar";
import UserCard from "./UserCard";

const UserList: React.FC = () => {
    const { users, fetchUsers, deleteUser } = useUserStore();

    useEffect(() => {
            if (0 === users.length) {
                fetchUsers();
            }
        },
        [ fetchUsers, users.length ]
    );

    return (
        <div className="flex flex-wrap justify-center">
            { users.map((user) => (
                <UserCard key={ user.id } user={ user }/>
            ))}
        </div>
    );
};

export default UserList;