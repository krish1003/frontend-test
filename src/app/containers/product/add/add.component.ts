import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ProductService } from '../../../services/product.service';
import { first } from 'rxjs/operators';
import Swal from 'sweetalert2';
@Component({
  selector: 'add-product',
  templateUrl: './add.component.html'
})
export class AddProductComponent {
  addProductForm: FormGroup;
  @Input("control")
  @Output() productData = new EventEmitter<string>();
  control: any;
  isSubmitted = false;
  loading = false;
  error = '';
  constructor(private formBuilder: FormBuilder,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.addProductForm = this.formBuilder.group({
      name: ['', Validators.required],
      rate: ['', Validators.required],
      quantity: ['', Validators.required]
    });
  }

  get formControls() { return this.addProductForm.controls; }

  add() {
    this.isSubmitted = true;
    if (this.addProductForm.invalid) {
      return;
    }
    this.loading = true;
    //add product and send data to parent component
    this.productService.addProducts(this.addProductForm.value).subscribe((products: any) => {
      this.addProductForm.reset();
      this.loading = false;
      this.isSubmitted = false;
      this.productData.emit(products);
    });
  }

  clear() {
    this.addProductForm.reset();
  }
}
