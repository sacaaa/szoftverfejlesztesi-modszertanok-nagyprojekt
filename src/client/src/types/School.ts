import { Address } from "./Address";
import { Student } from "./Student";
import { Teacher } from "./Teacher";
import { User } from "./User";

export interface School extends User {
    /**
     * The unique institution identifier of the school.
     */
    institutionId: string | null;

    /**
     * The name of the school
     */
    name: string | null;

    /**
     * The title of the school
     */
    title: string | null;

    /**
     * The description of the school
     */
    description: string | null;

    /**
     * The address of the school
     */
    address: Address | null;

    /**
     * The students of the school
     */
    students: Student[] | null;

    /**
     * The teachers of the school
     */
    teachers: Teacher[] | null;
}