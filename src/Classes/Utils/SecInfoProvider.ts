import {get} from 'config';

export class SecInfoProvider {

    static getToken() : string {
        let token: string = get("token");
        return token;
    }

    static getAdminId() : string {
        let adminId: string = get("adminId");
        return adminId;
    }
}



