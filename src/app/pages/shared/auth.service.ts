import { Injectable } from "@angular/core";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

@Injectable({
    providedIn: 'root',
})

export class AuthService {
    constructor(){

    }

    async GoogleAuth() {
        let result = await this.authLogin(new GoogleAuthProvider());
        return result
    }

    async authLogin(provider: any){
        let data: any;
        await signInWithPopup(getAuth(), provider)
        .then((result) => {
            data = result
        }).catch((error) => {
            data = error
            console.log(error)
        })
        return data
    }

}