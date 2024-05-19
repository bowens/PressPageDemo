import { FC, useState } from 'react';

import useUserStore from "../src/Store";

const LoadMoreUsers: FC = () => {

    // Global state store
    const { fetchUsers } = useUserStore();

    // Internal state: change this buttons appearance and disable it while a network request is fetching
    const [loading, setLoading] = useState(false);

    const loadMore = () => {
        setLoading(true);
        fetchUsers()
            .then(() => { setLoading(false); })
    };

    const regularClassName = "pp-demo-LoadMoreUsers mt-10 mb-5 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full";
    const loadingClassName = "mt-10 mb-5 bg-gray-200 text-black font-bold py-2 px-4 rounded-full";

    return (
        <div className="flex flex-col items-center">
            <button className={loading ? loadingClassName : regularClassName }
                    onClick={ loadMore }
                    disabled={ loading }>
                { loading ? 'Loading...' : 'Load More' }
            </button>
        </div>
    );
};

export default LoadMoreUsers;