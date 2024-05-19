import React, { FC } from 'react';

import useUserStore from "../src/Store";
import UserInterface from "../src/UserInterface";

interface Props {
    user: UserInterface;
}

const DeleteUserButton: FC<Props> = ({ user }) => {
    const { deleteUser } = useUserStore();
    return (
        <div className="opacity-0
                        group-hover:opacity-90
                        bg-black
                        bg-opacity-80
                        absolute
                        rounded
                        inset-0
                        flex
                        justify-center
                        items-center
                        text-white
                        transition-opacity
                        duration-500">
            <a className="pp-demo-DeleteUserButton hover:cursor-pointer rounded p-1 m-1 border-2 border-white" onClick={ () => deleteUser(user.id) }>
                Delete user
            </a>
        </div>
    );
};

export default DeleteUserButton;