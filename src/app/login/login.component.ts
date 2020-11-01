import { Component, OnInit, ChangeDetectorRef, NgZone, OnDestroy, ViewRef } from '@angular/core';
import { AuthState, CognitoUserInterface, onAuthUIStateChange } from '@aws-amplify/ui-components';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy{
  authState : AuthState;
  user: CognitoUserInterface | undefined;
  constructor(private ref: ChangeDetectorRef, 
              private router: Router,
              private ngZone: NgZone) {
    console.log("LoginComponent::Constructor");
  }
  loadInitialData() {
    console.log("LoginComponent::loadInitialiData");
    localStorage.setItem("AppData", "1234");
  }

  ngOnInit(): void {
    console.log("LoginComponent:ngOnInit");
    onAuthUIStateChange((authState, authData) => {
      console.log("LoginComponent::ngOnInit::onAuthUIStateChange Called"+authState);
      if (authState === AuthState.SignedIn) {
        console.log("LoginComponent::ngOnInit::onAuthUIStateChange::InsideIF::"+authState);
        this.loadInitialData();
        this.authState = authState;
        this.user = authData as CognitoUserInterface;
        this.ngZone.run(() => {
            this.router.navigate(['/profile']);
        });
        console.log("LoginComponent::ngOnInit::authState === AuthState.SignedIn::After Profile"+authState);
      }
      if (this.ref !== null && this.ref !== undefined &&
         !(this.ref as ViewRef).destroyed) {
        this.ref.detectChanges();
      }
      else {
        if (authState === AuthState.SignIn) {
          console.log(AuthState.SignIn);
          this.authState = authState;
          this.user = undefined;
          console.log("LoginComponent::ngOnInit::authState === AuthState.SignIn:"+authState);
          this.ngZone.run(() => {
            this.router.navigate(['/login']);
          });
          console.log("LoginComponent::ngOnInit::authState === AuthState.SignIn:AFTER"+authState);
        }
      }
    });
  }


  ngOnDestroy() {
    return onAuthUIStateChange;
  }

}
