/**
 * The User type itself, as defined by GitHub's API
 */
interface User {
    login: string;
    id: number;
    avatar_url: string;
    html_url: string;
    display_in_pp_demo?: boolean;
}

export default User;