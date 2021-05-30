import {get} from 'config';

export class SecInfoProvider {
    static getToken() : String{
        let token: String = get("token");
        return token;
    }
}



