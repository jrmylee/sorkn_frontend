import {Injectable} from '@angular/core'

@Injectable()
export class TokenService {

    private tokenKey:string = 'app_token';

    public store(content:Object) {
        console.log(content);
        localStorage.setItem(this.tokenKey, "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YjQzZjE5NTg3MDExMTBjYjE0MjQ1NmQiLCJhY2Nlc3MiOiJhdXRoIiwiaWF0IjoxNTMxMjA3MTc0fQ.GyvA0wGPVDDZ8sP884-T7li9iaUOToVv5-Me-uIQQ2E");
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
