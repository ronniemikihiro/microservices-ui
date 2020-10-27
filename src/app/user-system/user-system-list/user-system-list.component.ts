import { ToastrService } from 'ngx-toastr';
import { ConfirmDialogModel, ConfirmDialogComponent } from './../../confirm-dialog/confirm-dialog.component';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PageEvent } from '@angular/material/paginator';
import { UserSystem } from '../user-system';
import { UserSystemService } from './../../service/user-system.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-user-system-list',
  templateUrl: './user-system-list.component.html',
  styleUrls: ['./user-system-list.component.css']
})
export class UserSystemListComponent implements OnInit {

  formSearch: FormGroup;
  
  listUsers: UserSystem[] = [];
  colunas = ['id', 'name', 'email', 'actions']
  totalElements = 0;

  constructor(private formBuilder: FormBuilder, 
              private userSystemService: UserSystemService,
              private toastr: ToastrService,
              public dialog: MatDialog) { }

  ngOnInit(): void {
    this.createFormSearch();
    this.consultListUsers(0, 5);
  }

  createFormSearch() {
    this.formSearch = this.formBuilder.group({
      nome: ['', Validators.required ],
      email: ['', [Validators.required, Validators.email] ]
    })
  }

  consultListUsers(page, size) {
    this.userSystemService.list(page, size).subscribe(response => {
      this.listUsers = response.content;
      this.totalElements = response.totalElements;
    }, errorResponse => {
      console.log(errorResponse);
    })
  }

  paginator(event: PageEvent) {
    this.consultListUsers(event.pageIndex, event.pageSize)
  }

  confirmDialogDelete(userSystem : UserSystem): void {
    const dialogData = new ConfirmDialogModel("Confirm", 'Delete this item?');

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "400px",
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogConfirm => {
      if(dialogConfirm) {
        this.userSystemService.delete(userSystem.id).subscribe(response => {
          this.toastr.success('Register deleted successfully!');
          this.consultListUsers(0, 5);
        }, errorResponse => {
          this.toastr.error(errorResponse.error.message);
        });
      }
    });
  }

}
