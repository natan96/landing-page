import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/core/models/user';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {

  user: User | null = null;
  currentDate = new Date();

  constructor(private router: Router, private _auth: AuthService) { }

  ngOnInit(): void {
    this.user = this._auth.getLoggedUser();
  }

  logout() {
    this._auth.logout();
    this.router.navigate(['/auth/login']);
  }

}
