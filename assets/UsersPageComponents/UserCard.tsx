import React, { FC } from 'react';

import UserInterface from "./UserInterface";
import UserAvatar from "./UserAvatar";
import DeleteUserButton from "./DeleteUserButton";

interface Props {
    user: UserInterface;
}

const UserCard: FC<Props> = ({ user }) => {
    return (
        <div className="bg-white rounded shadow-lg p-2 border m-2 group relative">
            <div className="group relative">
                <UserAvatar user={ user } />
                <DeleteUserButton user={ user } />
            </div>
            <div className="text-center text-base">{ user.login }</div>
        </div>
    );
};

export default UserCard;