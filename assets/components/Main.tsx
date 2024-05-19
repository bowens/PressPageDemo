import {FC, useEffect, useState} from 'react';

import UserList from './UserList';
import LoadMoreUsers from "./LoadMoreUsers";
import useUserStore from "../src/Store";

const Main: FC = () => {

    // Use React hooks for this component's state: is it currently loading data, and did an error occur while loading?
    const [errorStatus, setErrorStatus] = useState(false);
    const [loadingStatus, setLoadingStatus] = useState(false);

    // Application-wide state comes from useUserStore()
    const { users, fetchUsers } = useUserStore();

    useEffect(() => {
        if (0 === users.length) {
            fetchUsers()
                .then(() => {
                    // Loading data succeeded, set loading = false so data can be displayed
                    setLoadingStatus(false);
                })
                .catch(error => {
                    console.log("An error occurred while loading data:", error);
                    // Loading has been attempted and failed; set loading = false & error-status = true
                    setLoadingStatus(false);
                    setErrorStatus(true);
                });
            } else {
                // We already have users, so don't display the initial loading text
                setLoadingStatus(false);
            }
        },
        [ fetchUsers, users.length ]
    );

    return (
        <div>
            { loadingStatus ? <p className="text-center">Users are loading...</p> : '' }
            { errorStatus ?
                <p className="text-center">An error has occurred while retrieving users from GitHub. Please try again later.</p>
                :
                <>
                    <UserList/>
                    <LoadMoreUsers/>
                </>
            }
        </div>
    );
};

export default Main;