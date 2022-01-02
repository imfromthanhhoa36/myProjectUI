import { PagedResultDto } from './../../shared/paged-listing-component-base';
import {ProductDto, GetProductPagingRequest, ProductServiceProxy } from './../../shared/service-proxies/service-proxies';
import { Router } from '@angular/router';
import { Component, OnInit, Injector } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Product } from '@shared/service-proxies/service-proxies';
import { PagedListingComponentBase } from '@shared/paged-listing-component-base';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
})
export class ProductsComponent extends PagedListingComponentBase<ProductDto> {
  totalRecords: number;
  keyword: string = '';
  products: Product[] = [];
  productForm: FormGroup;
  selectedProducts: Product[];
  constructor(private injector: Injector, private router: Router, private _productService: ProductServiceProxy) {
    super(injector)
  }

  createProduct() {
    this.router.navigate(["/app/products/createProduct"])
  }

  editProduct(id: number){
    this.router.navigate([`/app/products/updateProduct/${id}`])
  }

  refresh() {
    this.keyword = '';
    this.getDataPage(1);
  }

  protected list(request: GetProductPagingRequest, pageNumber: number, finishedCallback: Function): void {
    request.keyword = this.keyword
    this._productService
      .getAllProductPaging(request)
      .pipe(
        finalize(() => {
          finishedCallback();
        })
      )
      .subscribe({next: (result: PagedResultDto) => {
        this.products = result.items;
        this.showPaging(result, pageNumber);
      }, error: err => console.log(err)});
  }

  protected delete(product: ProductDto): void {
    abp.message.confirm(
      this.l('ProductDeleteWarningMessage', product.name),
      undefined,
      (result: boolean) => {
        if (result) {
          this._productService.delete(product.id).subscribe(() => {
            abp.notify.success(this.l('SuccessfullyDeleted'));
            this.refresh();
          });
        }
      }
    );
  }
}
