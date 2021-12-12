import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { SelectItem } from '../shared/selectItem.model';
import { StatesService } from '../shared/states';
import { Budget } from './budget.model';
import { BudgetService } from './budget.service';

@Component({
  selector: 'app-budgetpage',
  templateUrl: './budgetpage.component.html',
  styleUrls: ['./budgetpage.component.scss']
})
export class BudgetpageComponent implements OnInit {

  cubageTax: number = 0
  deadlineTax: number = 0
  distancePrice: number = 0
  finalPrice: number = 0
  budget?: Budget
  dialogMessage?: string;
  dialogTitle?: string;

  optionsOrigin?: SelectItem[]

  optionsDestiny?: SelectItem[]

  optionsDeadline: SelectItem[] = [
    {
        label: "12h",
        value: "12",
    },
    {
        label: "24h",
        value: "24",
    },
    {
        label: "48h",
        value: "48",
    },
    {
      label: "72h",
      value: "72",
  },
  ];

  form!: FormGroup;
  regiao?: number;
  optionsStates?: SelectItem[];

  constructor(private fb: FormBuilder, private statesService: StatesService,
    private budgetService: BudgetService) { }

  ngOnInit() {
    this.form = this.fb.group({
      id: new FormControl(""),
      name: new FormControl("",[
        Validators.required,
            ]),
      email: new FormControl("",[
        Validators.required,
      ]),
      phoneNumber: new FormControl("",[
        Validators.required,
      ]),
      origin: new FormControl("",[
        Validators.required,
        Validators.minLength(2)
            ]),
      destiny: new FormControl("",[
        Validators.required,
        Validators.minLength(2)
      ]),
      deadline: new FormControl("",[
        Validators.required,
      ]),
      height: new FormControl("",[
        Validators.required
      ]),
      width: new FormControl("",[
        Validators.required
      ]),
      depth: new FormControl("",[
        Validators.required,
      ]),
      cubage: new FormControl("",[
        Validators.required,
      ])
    })

    this.refresh();
    this.getStates();

  }

  refresh(){
    this.form.reset();
  }

  sendBudget(){
    this.budgetService.post(this.form.get("email")?.value, this.form.getRawValue());
    this.dialogMessage = "Sua cotação será respondida por e-mail em alguns minutos!"
    this.dialogTitle = "Cotação Encaminhada"    
  }

  getCubage(){
    let altura = this.form.get("height")?.value;
    let largura = this.form.get("width")?.value;
    let profundidade = this.form.get("depth")?.value;
    this.form.get("cubage")?.setValue(altura*largura*profundidade*300)
  }

  getDistancePrice(){
    let origem = this.form.get("origin")?.value;
    let destino = this.form.get("destiny")?.value;
    if (origem == destino){
      this.distancePrice = 2380
    }
    else if (origem != destino){
      this.distancePrice = 6987
    }
  }

  getCubageTax(){
    
    if (this.form.get("cubage")?.value < 100){
      this.cubageTax = 1
    }
    else if (this.form.get("cubage")?.value < 200){
      this.cubageTax = 26
    }else{
      this.cubageTax = 67
    }
  }

  getDeadlineTax(){
    
    if(this.form.get("deadline")?.value == 12){
      this.deadlineTax = 25
      if (this.form.get("cubage")?.value > 200)
      {this.deadlineTax = 58}
    }
    else if(this.form.get("deadline")?.value == 24){
      this.deadlineTax = 20
      if (this.form.get("cubage")?.value > 200)
      {this.deadlineTax = 35}
    }
    else if(this.form.get("deadline")?.value == 48){
      this.deadlineTax = 15
    }
    else if(this.form.get("deadline")?.value == 72){
      this.deadlineTax = 10
    }
  }

  getFinalPrice(){
    this.getDistancePrice();
    this.getCubageTax();
    this.getDeadlineTax();
    this.finalPrice = (this.distancePrice + 
      (this.distancePrice * (this.deadlineTax/100)) + 
    (this.distancePrice * (this.cubageTax/100)))
  }

  getStates(){
    this.optionsOrigin = this.statesService.getAllStates();
    this.optionsDestiny = this.statesService.getAllStates();
  }

}
