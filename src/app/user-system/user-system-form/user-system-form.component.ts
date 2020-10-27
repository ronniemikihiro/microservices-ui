import { Observable } from 'rxjs';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RequiredFieldError } from '../../error/required-field-error';
import { UserSystemService } from './../../service/user-system.service';
import { ToastrService } from 'ngx-toastr';
import { RoleService } from './../../service/role.service';
import { Component, OnInit } from '@angular/core';
import { Role } from '../role';
import { UserSystem } from '../user-system';
import { Util } from 'src/app/util/util';

@Component({
  selector: 'app-user-system-form',
  templateUrl: './user-system-form.component.html',
  styleUrls: ['./user-system-form.component.css']
})
export class UserSystemFormComponent implements OnInit {

  modeEdit : boolean = false;
  userSystem = new UserSystem();
  idRoleSelected: number;
  listRoles: Role[] = [];

  constructor(private userSystemService: UserSystemService,
              private roleService: RoleService, 
              private toastr: ToastrService,
              private router: Router,
              private activatedRoute : ActivatedRoute) { }

  ngOnInit(): void {
    this.consultListRoles();
    this.loadUserSystem();
  }

  consultListRoles() {
    this.roleService.list().subscribe(response => {
      this.listRoles = response;
    }, errorResponse => {
      console.log(errorResponse);
    })
  }

  validateRequiredFields(): void {
    if(Util.isEmpty(this.userSystem.name)) {
      throw new RequiredFieldError('Name');
    } else if(Util.isEmpty(this.userSystem.email)) {
      throw new RequiredFieldError('Email');
    } else if(Util.isEmpty(this.userSystem.password)) {
      throw new RequiredFieldError('Password');
    } else if(Util.isEmpty(this.idRoleSelected)) {
      throw new RequiredFieldError('Role');
    }
  }

  saveUserSystem() {
    try {
      this.validateRequiredFields();
      this.userSystem.roles = [this.listRoles.find(r => r.id === this.idRoleSelected)];

      const isCreate : boolean = Util.isEmpty(this.userSystem.id);

      this.userSystemService.save(this.userSystem).subscribe(response => {
        this.userSystem = new UserSystem();
        this.toastr.success(isCreate ? 'User System successfully registered!' : 'User System edited successfully!');
        this.router.navigate(['/user-systems/list']);
      }, errorResponse => {
        this.toastr.error(errorResponse.error.message);
      })
    } catch (e) {
      if(e instanceof RequiredFieldError) {
        this.toastr.warning(e.message);
      }
    }
  }

  loadUserSystem() {
    let params : Observable<Params> = this.activatedRoute.params
    params.subscribe( urlParams => {
        const id = urlParams['id'];
        if(id) {
          this.modeEdit = true;
          this.userSystemService.findById(id)
          .subscribe(response => {
            this.userSystem = response;
            this.idRoleSelected = this.userSystem.roles[0].id;
          }, errorResponse => {
            this.toastr.error(errorResponse.error.message);
          })
        } else {
          this.modeEdit = false;
        }
    })
  }

}
