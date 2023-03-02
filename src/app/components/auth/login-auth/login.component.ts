import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthUser } from 'src/app/shared/models/userModel';
import { environment } from 'src/environments/environment';
import { AuthService } from './services/auth.service';
const urlBase = environment.URL_BASE;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  providers: [MessageService]
})
export class LoginComponent implements OnInit {
  myForm: any;
  params: any = AuthUser;

  constructor(private fb: FormBuilder,
    private router: Router,
    public authservice: AuthService,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.myForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      pass: ['', Validators.required]
    });
  }

  onSubmit(form: FormGroup) {
    if (form.valid) {
      this.params.email = form.value.email;
      this.params.pass = form.value.pass;
      this.reqAuth()
    }
  }

  reqAuth() {
    this.authservice.auth(`${urlBase}/auth/login`, { params: { email: this.params.email, pass: this.params.pass } }).subscribe(response => {
      if (response.status === 200) {
        this.router.navigate(['home']);
      } else {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: response.msg, life: 3000 });
      }
    }, fail => {
      const error: any = 'It is not possible to continue with the transaction at this time.';
    });
  }
}
