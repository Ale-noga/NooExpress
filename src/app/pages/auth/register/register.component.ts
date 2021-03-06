import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';
import Swal from 'sweetalert2';
import { UserService } from './user.service';
import { firebase_auth_errors } from 'src/environments/firebase.autherrors';
import { AuthService } from '../../shared/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  passwordTextHelp = " "
  disabledBtn: any = false;
  form: FormGroup;

  constructor(private userService: UserService, 
    private router: Router, private fb: FormBuilder, private authService: AuthService) {
    (window as any).scrollTo(0, 0)
    const rgxEmail: any = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    this.form = this.fb.group({
      uid: [''],
      name: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern(rgxEmail)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      /* passwordConfirm: ['', [Validators.required, Validators.minLength(6)]], */
      register_at: [`${(new Date())?.toISOString()}`],
    })
  }

  ngOnInit(): void {
  }

  async register(data: any){
    let register: any;
    try {
      register = await createUserWithEmailAndPassword(getAuth(), data?.email, data?.password)
      console.log(register)
    } catch (error: any) {
      Swal.fire({
        text: `${firebase_auth_errors[error?.code]}`,
        icon: 'error',
        toast: true,
        position: 'top-end',
        timer: 7000,
        timerProgressBar: true,
      })
    } finally {
      if (register?.user?.uid){
        delete data?.password;
        delete data?.passwordConfirm;
        data.uid = register?.user?.uid;
        this.userService.set_user(data)
        this.router.navigate(['/profile/person'])
    }
    }
  }

}
