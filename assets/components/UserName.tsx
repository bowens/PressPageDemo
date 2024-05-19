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
            <a href={ user.html_url } title={ "View " + user.login + ' on GitHub' } target="_blank" className="underline text-blue-700">
                { user.login }
            </a>
        </div>
    );
};

export default UserName;