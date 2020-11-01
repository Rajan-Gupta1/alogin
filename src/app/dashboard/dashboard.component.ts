import { Component, OnInit } from '@angular/core';
import { Auth, API } from 'aws-amplify';
import { Router } from '@angular/router';
import { CognitoUser } from 'amazon-cognito-identity-js'
import { AmplifySignOut } from '@aws-amplify/ui-angular';
import { Observable, from } from 'rxjs';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  apiEndPoint = 'userAdminAPI';
  constructor(private router: Router) { 
    console.log("DashboardComponent::Constructor");
  }

  profile() {
    this.router.navigate(['/profile']);
  }

  
  ngOnInit(): void {
    console.log("DashboardComponent::ngOnInit");
    this.readUserList().subscribe(data => {
      console.log(data);
    });
  }

  readUserList(): Observable<any[]> {
    const queryParam = {
      headers: {
      },
      queryStringParameters: {
      }
    };
    return from(API.get(this.apiEndPoint, "/getUserList", queryParam));
  }

  signout() {
    Auth.signOut();
  }
}
