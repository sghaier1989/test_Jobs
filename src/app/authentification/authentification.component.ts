import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-authentification',
  templateUrl: './authentification.component.html',
  styleUrls: ['./authentification.component.css']
})
export class AuthentificationComponent implements OnInit {
  error = null;
  errorMessage = '';
  jbbData= '';
  isAuthenticated = false;
  welcomeMessage = '';
  constructor(private auth: AuthService, private route: Router) { }

  ngOnInit() {
    if(this.auth.userIsLoggedIn()){
        this.refreshFlags();
    }

  }

  login(formData)
  {
    this.auth.login(formData).subscribe(
        data => {
            this.handleServerResponse(data);
        },
        error => {
            this.handleError(error);
        }
    );
  }

  handleServerResponse(data)
  {
    console.log("login sucess",data);
    this.jbbData = data;
    localStorage.setItem('jbb-data', JSON.stringify(data));
    this.route.navigate(['/']);

  }
  handleError(error){
    console.log("login rejected");
  }

  refreshFlags() {
    if (localStorage.getItem('jbb-data')) {
        this.isAuthenticated = true;
        this.welcomeMessage = 'Bienvenue , auth ok';
        this.jbbData = JSON.parse(localStorage.getItem('jbb-data'));
    }
}

}
