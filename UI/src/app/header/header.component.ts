import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'angular-web-storage';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit {

  constructor(private authService: AuthService,
    private router: Router,
    public localStorage: LocalStorageService
  ) { }

  ngOnInit(): void {
  }

  logout() {
    this.authService.logout().subscribe(
      res => {
      },
      err => { },
      () => {
        this.localStorage.remove('Obj');
        this.router.navigate(['./login']);
      }
    );
  }

}
