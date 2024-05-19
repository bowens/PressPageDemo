import React, { FC } from 'react';

import UserInterface from "../src/UserInterface";
import UserAvatar from "./UserAvatar";
import DeleteUserButton from "./DeleteUserButton";
import UserName from "./UserName";

interface Props {
    user: UserInterface;
}

const UserCard: FC<Props> = ({ user }) => {
    return (
        <div className="pp-demo-UserCard bg-white rounded shadow-lg p-2 border m-2 group relative">
            <div className="group relative">
                <UserAvatar user={ user } />
                <DeleteUserButton user={ user } />
            </div>
            <UserName user={ user }/>
        </div>
    );
};

export default UserCard;