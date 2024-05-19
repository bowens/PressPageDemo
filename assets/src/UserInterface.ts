/**
 * The User type itself, as defined by GitHub's API
 */
interface User {
    login: string;
    id: number;
    avatar_url: string;
    html_url: string;
}

export default User;