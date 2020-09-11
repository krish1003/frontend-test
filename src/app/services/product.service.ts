import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { Product } from '../model/product';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productSubject: BehaviorSubject<Product>;
  public product: Product[];

  constructor(private http: HttpClient) {}
  getAllProducts() {
    return this.http.get<Product[]>(`${environment.apiUrl}/products`);
  }

  addProducts(product) {
    return this.http.post<Product>(`${environment.apiUrl}/products/add`, product)
      .pipe(map(product => {
        //generate random id for a product
        product.id = Math.floor(Math.random() * 900) + 100;
        return product;
      }));
  }

  deleteProducts(product) {
    return this.http.post<Product>(`${environment.apiUrl}/products/delete`, product)
      .pipe(map(product => {
        return product;
      }));
  }
}
