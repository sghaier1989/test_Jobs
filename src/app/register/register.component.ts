import { Component, OnInit } from '@angular/core';
import {AuthService} from '../services/auth.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  error = '';
  constructor(private auth: AuthService, private route: Router) { }

  ngOnInit() {
  }

  register(formData)
  {
    this.auth.register(formData).subscribe(
      data => {
          this.handleServerResponse(data);
      },
      error => {
          this.handleError(error);
      }
    );
  }

  handleServerResponse(data){
    console.log("data = ",data);
    localStorage.setItem('key',JSON.stringify(data));
    
    this.route.navigate(['/'])
  }

  handleError(error){
    console.log("error");
  }

}
