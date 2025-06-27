import { ObjectId } from "mongodb";
import { Resume } from "./resume";

export interface User {
    _id?: ObjectId;
    email: string;
    name?: string;
    image?: string;
    tokens?: number;
    resume?: Resume;
    createdAt: Date;
}
