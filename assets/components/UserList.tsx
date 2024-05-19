import React from 'react';

import useUserStore from '../src/Store';
import UserCard from "./UserCard";

const UserList: React.FC = () => {
    const { users } = useUserStore();

    const usersToDisplay = users.filter((user) => { return user.display_in_pp_demo });

    return (
        <div className="flex flex-wrap justify-center">
            { usersToDisplay.map((user) => (
                <UserCard key={ user.id } user={ user }/>
            ))}
        </div>
    );
};

export default UserList;