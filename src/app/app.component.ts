import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  subscription: Subscription = new Subscription()

  constructor(
    private readonly cookieService: CookieService,
    private readonly router: Router
  ) { }

  ngOnInit() {
    const token: string = this.cookieService.get('token') || localStorage.getItem('token') || ''

    if (token) {
      if (location.pathname !== '/login') {
        this.router.navigateByUrl(location.pathname)
      }
    } else {
      this.router.navigateByUrl('/login')
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe()
  }
}
