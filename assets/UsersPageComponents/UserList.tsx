import React, { useEffect } from 'react';
import useUserStore from './Store';

const UserList: React.FC = () => {
    const { users, fetchUsers, deleteUser } = useUserStore();

    useEffect(() => {
            if (0 === users.length) {
                fetchUsers();
            }
        },
        [ fetchUsers, users.length ]
    );

    return (
        <div>
            <div>
                { users.map((user) => (
                    <div key={ user.id } className="max-w-sm rounded overflow-hidden shadow-lg">
                        <img className="w-1/2" src={ user.avatar_url } alt={ user.login } width={ 50 }/>
                            <div className="px-6 py-4">
                                <div className="text-base">{ user.login }</div>
                            </div>
                        <button className="bg-red-400 hover:bg-red-800 text-white font-bold py-2 px-4 rounded-full"
                                onClick={ () => deleteUser(user.id) }>
                            Delete
                        </button>
                    </div>
                ))}
            </div>
            <br/>
            <hr/>
            <br/>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                    onClick={ fetchUsers }>
                Load More
            </button>
        </div>
    );
};

export default UserList;