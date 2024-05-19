import React, { FC } from 'react';

import UserInterface from "../src/UserInterface";

interface Props {
    user: UserInterface;
}

const UserName: FC<Props> = ({ user }) => {
    return (
        <div className="text-center text-base">{ user.login }</div>
    );
};

export default UserName;