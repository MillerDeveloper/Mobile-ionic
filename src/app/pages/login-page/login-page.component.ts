import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { CookieService } from 'ngx-cookie-service';
import { Subscription } from 'rxjs';
import { IUser } from 'src/app/shared/interfaces/user.interface';
import { ErrorHandlerService } from 'src/app/shared/services/global-services/toast-service/toast.service';
import { LoginService } from 'src/app/shared/services/login-service/login.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit, OnDestroy {

  constructor(
    private readonly loginService: LoginService,
    private readonly errorHandlerService: ErrorHandlerService,
    private readonly cookieService: CookieService,
    private readonly toastController: ToastController,
    private readonly router: Router
  ) { }

  loginFormGroup: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required]),
    idDB: new FormControl(null, [Validators.required, Validators.minLength(6)])
  })

  subscription: Subscription = new Subscription()

  ngOnInit(): void {
  }

  login(): void {
    this.loginFormGroup.disable()
    this.toastController.create({
      message: this.loginFormGroup.value.email,
      duration: 2500
    })
    this.subscription.add(this.loginService.login(this.loginFormGroup.value).subscribe(
      (result: {token: string, idDB: string, user: IUser}) => {
        this.cookieService.set('token', result.token)
        localStorage.setItem('token', result.token)
        localStorage.setItem('userInfo', JSON.stringify(result.user))
        this.router.navigateByUrl('/leads').then(() => {
          location.reload()
        })
      },
      (error) => {
        this.errorHandlerService.catchError(error)
        this.loginFormGroup.enable()
      },
      () => this.loginFormGroup.enable()
    ))
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
}
