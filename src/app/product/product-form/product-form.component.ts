import { RequiredFieldError } from './../../error/required-field-error';
import { Util } from './../../util/util';
import { Observable } from 'rxjs';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ProductService } from './../../service/product.service';
import { Product } from './../product';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  modeEdit : boolean = false;
  product = new Product();

  constructor(private productService: ProductService,
              private toastr: ToastrService,
              private router: Router,
              private activatedRoute : ActivatedRoute) { }

  ngOnInit(): void {
    this.loadProduct();
  }

  validateRequiredFields(): void {
    if(Util.isEmpty(this.product.name)) {
      throw new RequiredFieldError('Name');
    }
  }

  saveProduct() {
    try {
      this.validateRequiredFields();

      const isCreate : boolean = Util.isEmpty(this.product.id);

      this.productService.save(this.product).subscribe(response => {
        this.product = new Product();
        this.toastr.success(isCreate ? 'Product successfully registered!' : 'Product edited successfully!');
        this.router.navigate(['/products/list']);
      }, errorResponse => {
        this.toastr.error(errorResponse.error.message);
      })
    } catch (e) {
      if(e instanceof RequiredFieldError) {
        this.toastr.warning(e.message);
      }
    }
  }

  loadProduct() {
    let params : Observable<Params> = this.activatedRoute.params
    params.subscribe( urlParams => {
        const id = urlParams['id'];
        if(id) {
          this.modeEdit = true;
          this.productService.findById(id)
          .subscribe(response => {
            this.product = response;
          }, errorResponse => {
            this.toastr.error(errorResponse.error.message);
          })
        } else {
          this.modeEdit = false;
        }
    })
  }

}
