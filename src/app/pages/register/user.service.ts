import { Injectable } from "@angular/core";
import { Firestore } from "@angular/fire/firestore";
import { doc, setDoc } from "firebase/firestore";

@Injectable({
    providedIn: 'root'
})

export class UserService{

    constructor(private fb:Firestore){
    }

    async set_user(data: any){
        await setDoc(doc(this.fb, "users", data.uid), data);
    }

}