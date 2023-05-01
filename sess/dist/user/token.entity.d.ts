import { BaseEntity } from "typeorm";
import { User } from "./user.entity";
export declare class Token extends BaseEntity {
    listId: string;
    resetTokenId: string;
    accessTokenId: string;
    owner: User;
}
