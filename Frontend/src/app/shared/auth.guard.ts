import {inject} from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  CanActivateFn, ActivatedRoute, mapToCanActivate
} from '@angular/router';
import {catchError, of} from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../landing-page/services/auth.service';

export const AuthGuard: CanActivateFn = (route: ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.isLoggedIn().pipe(
  map(loggedIn => loggedIn ? true : router.createUrlTree(['/denied'])),
    catchError((err) => {
      router.navigate(['/lacentral/login'], {
        queryParams: { loggedOut: true, origUrl: state.url }
      });
      return of(false);
    })
  )
}