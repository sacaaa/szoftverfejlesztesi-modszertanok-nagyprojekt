import { BaseEntity } from "./BaseEntity";

export interface User extends BaseEntity {
    /**
     * The unique identifier of the user.
     */
    id: string | null;

    /**
     * The username of the user.
     */
    username: string | null;

    /**
     * The password of the user.
     */
    password: string | null;

    /**
     * The email of the user.
     */
    email: string | null;

    /**
     * The email verification status of the user.
     */
    emailVerified: boolean | null;

    /**
     * The role of the user.
     */
    role : string | null;

    /**
     * The last login date of the user.
     */
    lastLoggedIn: Date | null;
}