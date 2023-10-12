import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { catchError, map, switchMap, tap } from "rxjs/operators";
import { environment } from "src/environments/environment";
import * as AuthActions from './auth.actions';
import { AuthResponseData } from "../auth.service";
import { of } from "rxjs";
import { Router } from "@angular/router";
import { User } from "../user.model";

@Injectable()
export class AuthEffects {
    private urlBase = 'https://identitytoolkit.googleapis.com/v1/accounts:';
   
    authSignup = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.signupStart),
            switchMap((signupAction: { email: string, password: string }) => {
                return this.http
                    .post<AuthResponseData>(
                        this.urlBase + 'signUp?key=' + environment.firebaseAPIKey,
                        {
                            email: signupAction.email,
                            password: signupAction.password,
                            returnSecureToken: true,
                        }
                    ).pipe(
                        tap((resData) => {
                            // this.authService.setLogoutTimer(+resData.expiresIn * 1000);
                        }),
                        map((resData) => {
                            return handleAuth(resData);
                        }),
                        catchError((errorRes) => {
                            return handleError(errorRes);
                        })
                    )
            })
        )
    );

    authLogin = createEffect(() =>
        this.actions$.pipe(
            ofType(AuthActions.loginStart),
            switchMap((authData: { email: string, password: string }) => {
                return this.http
                    .post<AuthResponseData>(
                        this.urlBase + 'signInWithPassword?key=' +
                        environment.firebaseAPIKey,
                        {
                            email: authData.email,
                            password: authData.password,
                            returnSecureToken: true,
                        }
                    )
                    .pipe(
                        map((resData) => {
                            return handleAuth(resData);
                        }), catchError(errorRes => {
                            return handleError(errorRes);
                        })
                    );
            })
        )
    );

    authSuccess = createEffect(
        () =>
            this.actions$.pipe(
                ofType(AuthActions.authenticateSuccess),
                tap(() => {
                    this.router.navigate(['/'])
                })
            ), { dispatch: false }
    );

    constructor(
        private actions$: Actions,
        private http: HttpClient,
        private router: Router
    ) { }
}

const handleAuth = (resData) => {
    const expirationDate = new Date(
        new Date().getTime() + +resData.expiresIn * 1000
    );
    const user = new User(resData.email, resData.userId, resData.token, expirationDate);
    localStorage.setItem('userData', JSON.stringify(user));
    return AuthActions.authenticateSuccess({
        email: resData.email,
        userId: resData.localId,
        token: resData.idToken,
        expirationDate: expirationDate,
    });
};

const handleError = (errorRes) => {
    let errorMessage = 'An unknown error occurred!';
    if (!errorRes.error || !errorRes.error.error) {
        return of(
            AuthActions.authenticateFail({ error: errorMessage })
        );
    }
    switch (errorRes.error.error.message) {
        case 'EMAIL_EXISTS':
            errorMessage = 'This email exists already';
            break;
        case 'EMAIL_NOT_FOUND':
            errorMessage = 'This email does not exist.';
            break;
        case 'INVALID_PASSWORD':
            errorMessage = 'This password is not correct.';
            break;
    }
    return of(
        AuthActions.authenticateFail({ error: errorMessage })
    );
};

