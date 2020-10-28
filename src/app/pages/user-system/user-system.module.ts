import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';

import { UserSystemRoutingModule } from './user-system-routing.module';
import { UserSystemFormComponent } from './user-system-form/user-system-form.component';
import { UserSystemListComponent } from './user-system-list/user-system-list.component';

@NgModule({
  declarations: [
    UserSystemListComponent,
    UserSystemFormComponent 
  ],
  imports: [
    CommonModule,
    UserSystemRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatFormFieldModule,
    MatCardModule,
    MatButtonModule,
    MatTooltipModule,
    MatGridListModule,
    MatInputModule,
    MatSelectModule,
    MatDialogModule
  ],
  exports: [
    UserSystemListComponent,
    UserSystemFormComponent
  ]
})
export class UserSystemModule { }
