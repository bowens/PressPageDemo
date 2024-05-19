import { create } from 'zustand';

import UserInterface from "./UserInterface";

/**
 * The application status
 */
interface UserState {
    users: UserInterface[];
    deletedUsers: UserInterface[];
    fetchUsersURL: () => string;
    fetchUsers: () => Promise<Response>;
    deleteUser: (userID: number) => void;
    usersToDisplayCount: number;
}

// Item keys for localStorage addresses
const usersLocalStorageKey = 'pp-co-demo-users';
const deletedUsersLocalStorageKey = 'pp-co-demo-deleted-users';
const APIEndpointURLKey = 'pp-co-demo-api-endpoint';

const useUserStore = create<UserState>()((set, get) => ({
    // Returns users from localStorage if they exist
    users: JSON.parse(localStorage.getItem(usersLocalStorageKey) || '[]'),

    // Returns deleted users from localStorage if they exist
    deletedUsers: JSON.parse(localStorage.getItem(deletedUsersLocalStorageKey) || '[]' ),

    // Returns the initial or subsequent API endpoint URL based on application status
    fetchUsersURL: () => {
        return localStorage.getItem(APIEndpointURLKey) || 'https://api.github.com/users';
    },

    // Fetches users, both for the initial batch and when paginating. Once ran it will update localStorage's
    // next-users-API-URL setting.
    fetchUsers: async () => {
        const { users, fetchUsersURL, usersToDisplayCount } = get();

        // Not all users are displayed immediately. In case some users lack the display_in_pp_demo attribute we are
        // going to simply grant that attribute and return an empty Promise. First ensure the array is not empty...
        if (users.length > 0) {
            let startIndex = users.findIndex((obj) => !('display_in_pp_demo' in obj));
            // Don't continue unless there's items to process.
            if (-1 !== startIndex) {
                for (let i = startIndex; i < startIndex + usersToDisplayCount && i < users.length; i++) {
                    users[i]["display_in_pp_demo"] = true;
                }

                set((state) => {
                    localStorage.setItem(usersLocalStorageKey, JSON.stringify(users));
                    return {
                        users: users
                    };
                });

                return new Response;
            }
        }

        // There are no users already loaded for us to mark visible so let's continue with the XHR fetch:
        const response = await fetch(fetchUsersURL());
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data: UserInterface[] = await response.json();

        // GitHub's API handles pagination through an HTTP response header pointing to the next 'page'
        // by means of adding ?since=(last-user-id-of-the-last-request)
        const linkHeader = response.headers.get('Link');
        let nextUrl = null;
        if (linkHeader) {
            const links = linkHeader.split(',').reduce((acc, link) => {
                const [url, rel] = link.split(';').map(s => s.trim());
                if (rel === 'rel="next"') {
                    acc.next = url.slice(1, -1); // Remove surrounding angle brackets
                }
                return acc;
            }, {} as { next?: string });

            nextUrl = links.next || null;
        }

        set((state) => {
            let updatedUsers = [...state.users, ...data];

            let startIndex = updatedUsers.findIndex((obj) => !('display_in_pp_demo' in obj));
            for (let i = startIndex; i < startIndex + usersToDisplayCount && i < updatedUsers.length; i++) {
                updatedUsers[i]["display_in_pp_demo"] = true;
            }

            localStorage.setItem(usersLocalStorageKey, JSON.stringify(updatedUsers));
            localStorage.setItem(APIEndpointURLKey, nextUrl);
            return {
                users: updatedUsers
            };
        });

        return response;
    },

    // Remove a user from the active users list and moves them to a deleted users list for a future undo feature
    deleteUser: (userID: number) => {
        set((state) => {
            const userToDelete = state.users.find(user => user.id === userID);
            if (!userToDelete) {
                return state;
            }

            const updatedUsers = state.users.filter(user => user.id !== userID);
            const updatedDeletedUsers = [...state.deletedUsers, userToDelete];

            localStorage.setItem(usersLocalStorageKey, JSON.stringify(updatedUsers));
            localStorage.setItem(deletedUsersLocalStorageKey, JSON.stringify(updatedDeletedUsers));

            return {
                users: updatedUsers,
                deletedUsers: updatedDeletedUsers
            };
        });
    },

    usersToDisplayCount: 10
}));


export default useUserStore;