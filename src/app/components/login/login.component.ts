import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Login, Register } from 'shared/interfaces';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  isLogin: boolean = true
  password_confirm: string = ""
  loading: boolean = false;


  dataLogin: Login = {
    nick: "",
    password: ""
  }

  dataRegister: Register = {
    name: "",
    last_name: "",
    nick: "",
    email: "",
    password: "",
    active: true
  }

  errors: any = {};
  errorsRegister: any = {};
  loginFail: boolean = false;
  registerFail: boolean = false;


  constructor(
    public authService: AuthService,
    public router: Router,
    public route: ActivatedRoute
  ) {

  }
  switchView() {
    if (this.isLogin) this.dataLogin = { nick: "", password: "" }
    else this.password_confirm = "", this.dataRegister = {
      name: "",
      last_name: "",
      nick: "",
      email: "",
      password: "",
      active: true
    }
    this.errorsRegister = {}
    this.errors = {}
    this.isLogin = !this.isLogin

  }

  registers() {
    this.errorsRegister = {}
    if (this.dataRegister.password == this.password_confirm && this.dataRegister.password != "" && this.password_confirm != "") {
      this.loading = true
      this.authService.register(this.dataRegister).subscribe(
        response => {
          this.loading = false
          this.registerFail = false
          this.isLogin = true
        },
        error => {
          this.loading = false
          if (error.status == 400) this.errorsRegister = error.error
          if (error.status == 401) this.errorsRegister = {}, this.registerFail = true
        })
    }

  }

  login() {
    this.errors = {}
    this.loading = true;
    this.authService.login(this.dataLogin).subscribe(
      response => {
        this.loading = false;
        this.loginFail = false
        localStorage.setItem("token_shop_app", response.accessToken)
        this.authService.isTokenValidForAdmin() ? this.router.navigate(['/panel/products'], { relativeTo: this.route }) : this.router.navigate(['/home'], { relativeTo: this.route });

      },
      error => {
        this.loading = false;
        if (error.status == 400) this.errors = error.error, this.loginFail = false
        if (error.status >= 401) this.errors = {}, this.loginFail = true
      })
  }

  ngOnInit(): void {

  }

  get passwordNotMatch() {
    return (this.dataRegister.password != "" && this.password_confirm != "") && this.dataRegister.password !== this.password_confirm
  }




}
