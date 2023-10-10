import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-default-layout',
  templateUrl: './default-layout.component.html',
  styleUrls: ['./default-layout.component.scss']
})
export class DefaultLayoutComponent implements OnInit {

  constructor(
    private readonly router: Router,
    private readonly cookieService: CookieService
  ) { }

  ngOnInit(): void {
  }

  logOut() {
    localStorage.clear()
    this.cookieService.deleteAll()
    this.router.navigateByUrl('/login')
  }
}
