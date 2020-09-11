import { Component, OnInit, ChangeDetectorRef, NgZone, ViewChild, ElementRef } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { first } from 'rxjs/operators';
import { Product } from '../../model/product';
import * as _ from 'lodash';
import Swal from 'sweetalert2';
@Component({
  templateUrl: 'dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  @ViewChild('closeModal') closeModal: ElementRef;
  loading = false;
  products: Product[] = [];
  constructor(private productService: ProductService,
    private changeDetectorRef: ChangeDetectorRef,
    private ngZone: NgZone) { }

  ngOnInit(): void {
    this.productService.getAllProducts()
    this.productService.getAllProducts().pipe(first()).subscribe(products => {
      this.loading = false;
      this.products = products;
    });

  }

  deleteProductConfirmation(id) {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You want to delete this product!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.value) {
        this.deleteProduct(id);
        Swal.fire(
          'Deleted!',
          'Your product has been deleted.',
          'success'
        )
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled'
        )
      }
    })
  }

  deleteProduct(id) {
    let data = {
      id: id
    }

    this.productService.deleteProducts(data).subscribe((products: any) => {
      this.loading = false;
      this.get();
      var index = _.findIndex(this.products, {
        'id': products.id
      });
      if (index !== -1) {
        this.products.splice(index, 1);
        this.set();
        this.markDetectionChange();
      };
    });
  }


  addProductInArray(product: any) {
    Swal.fire('Product has been added successfully');
    this.get();
    console.log(this.products);
    if (this.products === null){
      this.products = [];
    }
    this.products.push(product);
    this.set();
    this._closeModal(this.closeModal);
    this.markDetectionChange();
  }
  private _closeModal(btn): void {
    btn.nativeElement.click();
  }
  private set() {
    localStorage.setItem('products', JSON.stringify(this.products));
  }

  private get() {
    this.products = JSON.parse(localStorage.getItem('products'));
  }

  private markDetectionChange() {
    this.ngZone.run(() =>
      this.changeDetectorRef.markForCheck()
    );
  }
}
