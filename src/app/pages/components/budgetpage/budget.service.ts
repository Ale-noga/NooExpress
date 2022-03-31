import { Injectable } from '@angular/core';
import { get } from '@angular/fire/database';
import { Firestore, setDoc } from '@angular/fire/firestore';
import { collection, deleteDoc, deleteField, doc, getDoc, query, updateDoc, where} from 'firebase/firestore';
import { list } from 'firebase/storage';

import { Budget } from './budget.model';

@Injectable({
  providedIn: 'root'
})
export class BudgetService {

  budget!: Budget

    constructor(private fb:Firestore){
    }

    async post(guid:string, budget: Budget){
        await setDoc(doc(this.fb, "budgets", guid), budget);
    }

    async getBudget(email: string){
      const query = doc(this.fb, "budgets", email);
      const budget = await getDoc(query);
      return budget.data() as Budget;
    }

    async delete(email: string){
      await deleteDoc(doc(this.fb, "budgets", email));
    }
      
}