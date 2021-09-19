import { HttpClient } from '@angular/common/http';
import { elementEventFullName } from '@angular/compiler/src/view_compiler/view_compiler';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { EntityModel } from '../models/entity-model.model';
import { Users } from '../models/users.model';
import { EntityService } from '../shared/entity.service';
import { UserAuthenticationService } from '../shared/user-authentication.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  formModel = {
    UserName:'',
    Entity: ''
  }
  user:Users = new Users();
  public entities?: EntityModel[];
  public baseUrl='http://localhost:20409/api';
  constructor(private router: Router, 
    private service: EntityService,
    private http: HttpClient,
    private userservice:UserAuthenticationService) { }
  ngOnInit(): void {
    if (localStorage.getItem('token') != null){
      if(localStorage.getItem('userRole') != 'admin'){
        this.router.navigateByUrl('/home');
      }
      this.refreshList();
    }
  }
  refreshList() {
    this.http.get('http://localhost:20409/api/Entities')
      .toPromise()
      .then(res => this.entities = res as EntityModel[]);
  }
  onSubmit(form: NgForm) {
    form.value.UserName=localStorage.getItem('username');
    this.service.postEntity(form.value).subscribe(
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
      this.service.deleteEntity(id)
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
    localStorage.removeItem('userRole');
    this.router.navigate(['/user/login']);
  }
}
