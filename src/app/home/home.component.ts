import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { EntityModel } from '../models/entity-model.model';
import { Users } from '../models/users.model';
import { EntityService } from '../shared/entity.service';
import { UserAuthenticationService } from '../shared/user-authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  readonly baseUrl='http://localhost:20409/api'
  public entities?: EntityModel[];
  public user: Users = new Users();
  formModel = {
    UserName:'',
    Entity: ''
  }
  constructor(private router: Router, 
    public userService:UserAuthenticationService,
    private entityService: EntityService,
    private http: HttpClient) { }
      
  ngOnInit(): void {
    this.http.get(this.baseUrl+'/Users/'+localStorage.getItem('username'))
      .toPromise()
      .then(res =>this.user = res as Users);
    this.refreshList();
  }
  refreshList() {
    this.http.get(this.baseUrl+'/Entities/'+localStorage.getItem('username'))
      .toPromise()
      .then(res => this.entities = res as EntityModel[]);
  }
  onDashboard(){
    if(this.user?.userRole=='admin'){
      localStorage.setItem('userRole',this.user.userRole);
      this.router.navigateByUrl('/dashboard');
    }
  }
  onSubmit(form: NgForm) {
    form.value.UserName=localStorage.getItem('username');
    this.entityService.postEntity(form.value).subscribe(
      (res: any) => {
        this.refreshList();
      },
      err => {
        console.log(err);
      }
    );
  }
  onDelete(id: number) {
    if (confirm('Are you sure to delete this record?')) {
      this.entityService.deleteEntity(id)
        .subscribe(
          res => {
            this.refreshList();
          },
          err => { console.log(err) }
        )
    }
  }
  onLogout() {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('userRole')
    this.router.navigate(['/user/login']);
  }
}
