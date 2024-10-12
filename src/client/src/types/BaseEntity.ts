export interface BaseEntity {
    /**
     * The creation date of the entity.
     */
    createdAt: Date | null;

    /**
     * The last update date of the entity.
     */
    updatedAt: Date | null;
}