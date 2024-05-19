import { FC } from 'react';

import UserList from './UserList';
import LoadMoreUsers from "./LoadMoreUsers";

const Main: FC = () => {
    return (
        <div>
            <UserList/>
            <LoadMoreUsers/>
        </div>
    );
};

export default Main;