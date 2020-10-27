import { ConfirmDialogModel, ConfirmDialogComponent } from './../../confirm-dialog/confirm-dialog.component';
import { PageEvent } from '@angular/material/paginator';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from './../../service/product.service';
import { Product } from './../product';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  formSearch: FormGroup;
  
  listProducts: Product[] = [];
  colunas = ['id', 'name', 'actions']
  totalElements = 0;

  constructor(private formBuilder: FormBuilder,
              private productService: ProductService,
              private toastr: ToastrService,
              public dialog: MatDialog) { }

  ngOnInit(): void {
    this.createFormSearch();
    this.consultListProducts(0, 5);
  }

  createFormSearch() {
    this.formSearch = this.formBuilder.group({
      name: ['', Validators.required ]
    })
  }

  consultListProducts(page, size) {
    this.productService.list(page, size).subscribe(response => {
      this.listProducts = response.content;
      this.totalElements = response.totalElements;
    }, errorResponse => {
      console.log(errorResponse);
    })
  }

  paginator(event: PageEvent) {
    this.consultListProducts(event.pageIndex, event.pageSize)
  }

  confirmDialogDelete(product : Product): void {
    const dialogData = new ConfirmDialogModel("Confirm", 'Delete this item?');

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      maxWidth: "400px",
      data: dialogData
    });

    dialogRef.afterClosed().subscribe(dialogConfirm => {
      if(dialogConfirm) {
        this.productService.delete(product.id).subscribe(response => {
          this.toastr.success('Register deleted successfully!');
          this.consultListProducts(0, 5);
        }, errorResponse => {
          this.toastr.error(errorResponse.error.message);
        });
      }
    });
  }

}
