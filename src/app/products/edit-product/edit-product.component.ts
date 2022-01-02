import { PagedListingComponentBase } from '@shared/paged-listing-component-base';
import { AppComponentBase } from '@shared/app-component-base';
import { Component, OnInit, Injector } from '@angular/core';
import { FormBuilder, FormControl, FormControlDirective, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product, ProductServiceProxy } from '@shared/service-proxies/service-proxies';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
})
export class EditProductComponent extends AppComponentBase implements OnInit {
  editProductForm: FormGroup;
  product: Product;
  constructor(private injector: Injector,private fb: FormBuilder, private _productService: ProductServiceProxy, private route: ActivatedRoute, private router: Router) {
    super(injector)
  }

  ngOnInit(): void {
    this.createFormEditProduct()
    this.bindValueToInput()
  }

  createFormEditProduct() {
    this.editProductForm = this.fb.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      description: '',
      quantity: ['', Validators.required],
      imagePath: '',
    })
  }

  bindValueToInput() {
    let id = this.route.snapshot.params["id"];
    this._productService.getById(id).subscribe({next: (data) => {
      this.editProductForm.controls["name"].setValue(data.name);
      this.editProductForm.controls["price"].setValue(data.price);
      this.editProductForm.controls["description"].setValue(data.description);
      this.editProductForm.controls["quantity"].setValue(data.quantity);
      this.editProductForm.controls["imagePath"].setValue(data.imagePath);
    }})
  }

  submit() {
    let id = this.route.snapshot.params["id"];
    this._productService.update(id, this.editProductForm.value).subscribe({next: data => {
      abp.notify.success(this.l('SuccessfullyUpdated'));
      this.router.navigate(["/app/products"]).then(() => window.location.reload());
    }})
  }
}
