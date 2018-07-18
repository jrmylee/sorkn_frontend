import {Injectable} from '@angular/core'

@Injectable()
export class TokenService {

    private tokenKey:string = 'app_token';

    public store(content:string) {
        localStorage.setItem(this.tokenKey, content);
    }

    public retrieve() {
        let storedToken:string = localStorage.getItem(this.tokenKey);
        if(!storedToken) return 'no token found';
        return JSON.stringify(storedToken);
    }

    public delete(){
      localStorage.removeItem(this.tokenKey);
    }


}
