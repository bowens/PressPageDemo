import React, { FC } from 'react';

import UserInterface from "./UserInterface";

interface Props {
    user: UserInterface;
}

const UserAvatar: FC<Props> = ({ user }) => {
    return (
        <img className="h-40 w-auto object-cover"
             src={ user.avatar_url }
             alt={ user.login }
             title={ user.login } />
    );
};

export default UserAvatar;