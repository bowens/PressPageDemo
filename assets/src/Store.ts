import { create } from 'zustand';

import UserInterface from "./UserInterface";

/**
 * The application status
 */
interface UserState {
    users: UserInterface[];
    deletedUsers: UserInterface[];
    fetchUsersURL: () => string;
    fetchUsers: () => Promise<Response>
    deleteUser: (userID: number) => void;
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
        const { fetchUsersURL } = get();

        const response = await fetch(fetchUsersURL());
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data: UserInterface[] = await response.json();

        const linkHeader = response.headers.get('Link');
        let nextUrl = null;

        // GitHub's API handles pagination through an HTTP response header pointing to the next 'page'
        // by means of adding ?since=(last-user-id-of-the-last-request)
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
            const updatedUsers = [...state.users, ...data];
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
    }
}));


export default useUserStore;