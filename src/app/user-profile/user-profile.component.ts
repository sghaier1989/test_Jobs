import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  decodetoken =null;
  isAdmin = false;
  constructor(private auth: AuthService) { }

  ngOnInit() {
    if(this.auth.userIsLoggedIn())
    {
      const jbbtoken = JSON.parse(localStorage.getItem('jbb-data'));
      this.decodetoken = this.auth.decodeToken(jbbtoken.token);
      console.log(this.decodetoken);
      if(this.decodetoken && this.decodetoken.role === 'admin')
      {
        this.isAdmin = true;
      }
    }
  }

}
