import { Injectable } from "@angular/core";
import { Firestore } from "@angular/fire/firestore";
import { getAuth } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

@Injectable({
    providedIn: 'root'
})

export class UserService{

    constructor(private fb:Firestore){
    }

    async set_user(data: any){
        await setDoc(doc(this.fb, "users", data.uid), data);
    }

    async get_logged_user(): Promise<any>{
        return await this.get_user_by_id(getAuth().currentUser?.uid)
    }

    async get_user_by_id(uid: any): Promise<any>{
        return (await getDoc(doc(this.fb, "users", uid))).data();
    }

}