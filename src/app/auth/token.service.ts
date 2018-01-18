import {Injectable} from '@angular/core'

@Injectable()
export class TokenService {

    private tokenKey:string = 'app_token';

    public store(content:Object) {
        localStorage.setItem(this.tokenKey, JSON.stringify(content));
    }

    public retrieve() {
        let storedToken:string = localStorage.getItem(this.tokenKey);
        if(!storedToken) return 'no token found';
        return storedToken;
    }

    public delete(){
      localStorage.removeItem(this.tokenKey);
    }


}
