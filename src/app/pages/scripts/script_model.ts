import {User} from '../../models/user.model';
export interface Script {
    _id: string;
    name:string;
    script: string;
    _creator: string;
    username: string;
    public: boolean;
    __v;
}
