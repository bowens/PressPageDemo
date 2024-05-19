import { FC } from 'react';

import useUserStore from "../src/Store";

const LoadMoreUsers: FC = () => {
    const { fetchUsers } = useUserStore();
    return (
        <div className="flex flex-col items-center">
            <button className="mt-10 mb-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                    onClick={ fetchUsers }>
                Load More
            </button>
        </div>
    );
};

export default LoadMoreUsers;