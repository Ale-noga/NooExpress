import { Injectable } from '@angular/core';
import { Firestore, setDoc } from '@angular/fire/firestore';
import { doc} from 'firebase/firestore';

import { Budget } from './budget.model';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {

    constructor(private fb:Firestore){

    }

    async post(guid:string, budget: Budget){
        await setDoc(doc(this.fb, "budgets", guid), budget);
    }
}