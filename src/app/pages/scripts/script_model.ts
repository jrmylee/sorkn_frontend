import {User} from '../../models/user.model';
export interface Script {
    _id: string;
    name:string;
    script: string;
    _creator: string;
    username: string;
    privacy: boolean;
    __v;
}
