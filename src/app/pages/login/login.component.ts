import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  constructor(private router: Router) { }
  loginObj: any = {
    Username: '',
    Password: ''
  }


  onLogin() {
    if (this.loginObj.Username == "admin" && this.loginObj.Password == "admin") {
      this.router.navigateByUrl('dashboard');
    } else {
      alert("Wrong Creds");
    }
  }
}
