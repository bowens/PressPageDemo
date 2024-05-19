import React, { FC } from 'react';

import UserInterface from "../src/UserInterface";

interface Props {
    user: UserInterface;
}

const UserName: FC<Props> = ({ user }) => {
    return (
        <div className="pp-demo-UserName
                        text-base
                        mt-2
                        ml-2
                        mr-2
                        break-all
                        h-full
                        w-full
                        flex
                        items-center
                        justify-center">
            { user.login }
        </div>
    );
};

export default UserName;