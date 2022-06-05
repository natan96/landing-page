import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { AuthService } from "../services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(private router: Router, private _auth: AuthService) {}

  canActivate(route: ActivatedRouteSnapshot): Promise<boolean | UrlTree> | boolean {
    return this.guard(route);
  }

  canActivateChild(route: ActivatedRouteSnapshot): Promise<boolean | UrlTree> | boolean {
    return this.guard(route);
  }

  guard(_: ActivatedRouteSnapshot): Promise<boolean | UrlTree> | boolean {
    const loggedUser = this._auth.getLoggedUser();
    if (!loggedUser) {
      return this.router.navigate(['/auth/login']);
    }
    return true;
  }
}
