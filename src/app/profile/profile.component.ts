import { Component, OnInit } from '@angular/core';
import { API } from 'aws-amplify';
import { Observable, from } from 'rxjs';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  apiEndPoint = 'userAdminAPI';
  constructor() {
    console.log("ProfileComponent::Constructor");
   }

  ngOnInit(): void {
    console.log("ProfileComponent::ngOnInit");
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
}
