import React, { FC } from 'react';

import UserInterface from "../src/UserInterface";

interface Props {
    user: UserInterface;
}

const UserName: FC<Props> = ({ user }) => {
    return (
        <div className="pp-demo-UserName text-center text-base">{ user.login }</div>
    );
};

export default UserName;