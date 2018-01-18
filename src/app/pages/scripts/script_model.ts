import {User} from '../../shared/user.model';
export interface Script {
    _id: string;
    name:string;
    script: string;
    _creator: string;
    __v;
}
