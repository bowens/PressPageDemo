import React, { useEffect } from 'react';

import useUserStore from '../src/Store';
import UserCard from "./UserCard";

const UserList: React.FC = () => {
    const { users } = useUserStore();

    return (
        <div className="flex flex-wrap justify-center">
            { users.map((user) => (
                <UserCard key={ user.id } user={ user }/>
            ))}
        </div>
    );
};

export default UserList;