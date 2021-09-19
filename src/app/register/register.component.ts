import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserAuthenticationService } from '../shared/user-authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [
  ]
})
export class RegisterComponent implements OnInit {
  constructor(public service:UserAuthenticationService, private router:Router) { }
  ngOnInit(): void {
  }
  onSubmit() {
    this.service.register().subscribe(
      (res: any) => {
        if (res) {
          this.service.formModel.reset();
          alert('User Created!')
          this.router.navigateByUrl('/user/login');
        } else {
          
        }
      },
      err => {
        console.log(err);
      }
    );
  }

}
