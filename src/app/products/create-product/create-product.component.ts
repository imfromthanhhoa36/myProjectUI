import { CreateProductDto, Product } from './../../../shared/service-proxies/service-proxies';
import { ProductServiceProxy } from '@shared/service-proxies/service-proxies';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
})
export class CreateProductComponent implements OnInit {
  createProductForm: FormGroup;
  product: Product;
  // selectedFile: File = null;
  createProductDto: CreateProductDto;
  constructor(private _productService: ProductServiceProxy, private fb: FormBuilder, private router: Router) { }

  ngOnInit(): void {
    this.formCreate()
  }

  formCreate() {
    this.createProductForm = this.fb.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      description: '',
      quantity: ['', Validators.required],
      image: ['', Validators.required],
    })
  }

  // onImageSelect(event) {
  //   this.selectedFile = event.target.files[0];
  // }

  // mapProperty() {
  //   this.createProductDto = this.createProductForm.value;
  // }

  save() {
    this._productService.create(this.createProductForm.value).subscribe({next: res => {
      this.router.navigate(["/app/products"]).then(() => {window.location.reload()})
    }, error: err => console.log(err)})
  }

}
