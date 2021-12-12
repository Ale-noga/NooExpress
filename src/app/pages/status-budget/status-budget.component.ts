import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Budget } from '../budgetpage/budget.model';
import { BudgetService } from '../budgetpage/budget.service';
import { SelectItem } from '../shared/selectItem.model';
import { StatesService } from '../shared/states';

@Component({
  selector: 'app-status-budget',
  templateUrl: './status-budget.component.html',
  styleUrls: ['./status-budget.component.scss']
})
export class StatusBudgetComponent implements OnInit {

  cubageTax: number = 0
  deadlineTax: number = 0
  distancePrice: number = 0
  finalPrice: number = 0
  budget?: Budget;
  dialogMessage?: string;
  dialogTitle?: string;
  budgetLocate?: boolean = false;

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
  form2!: FormGroup;
  regiao?: number;
  optionsStates?: SelectItem[];
  dialogDeleteMessage?: string;

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
      ]),
      statusBudget: new FormControl("")
    })

    this.form2 = this.fb.group({
      emailSearch: new FormControl("",[
        Validators.required,
      ]),
    })

    this.refresh();
    this.getStates();

  }

  refresh(){
    this.form2.reset();
    this.form.reset();
  }

  locateBudget(){
    this.budgetService.getBudget(this.form2.get("emailSearch")?.value).then(
      (resp: Budget) => {
        this.budget = resp
        this.form.reset();
        if(this.budget != null){
          this.form.patchValue({name: this.budget.name})
          this.form.patchValue({cubage: this.budget.cubage})
          this.form.patchValue({deadline: this.budget.deadline})
          this.form.patchValue({depth: this.budget.depth})
          this.form.patchValue({destiny: this.budget.destiny})
          this.form.patchValue({email: this.budget.email})
          this.form.patchValue({height: this.budget.height})
          this.form.patchValue({origin: this.budget.origin})
          this.form.patchValue({phoneNumber: this.budget.phoneNumber})
          this.form.patchValue({statusBudget: this.budget.statusBudget})
          this.form.patchValue({width: this.budget.width})
        }else{
          alert('Cotação não encontrada!');
          this.refresh();
        }
      }
    );
    
  }

  sendBudget(){
    this.form.get("statusBudget")?.setValue("EM ANDAMENTO")
    this.budgetService.post(this.form.get("email")?.value, this.form.getRawValue());
    this.dialogMessage = "Não se preocupe, sua cotação sera atualizada ;)"
    this.dialogTitle = "Cotação Alterada"    
  }

  deleteDialog(){
    this.dialogDeleteMessage = "Tem certeza que deseja exluir a cotação, " + this.budget?.name + "?";
  }

  delete(){
    this.budgetService.delete(this.form.get("email")?.value);
    this.dialogMessage = "Uma pena, mas estamos sempre dispostos a lhe atender! ;)";
    this.dialogTitle = "Até a próxima!";
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
