import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';  

import { Product } from '../product';

import { ProductService } from '../product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: Product[];
  productForm: any;  

  constructor(private formbulider: FormBuilder, private productService: ProductService) { }

  ngOnInit() {
    this.productForm=this.formbulider.group({
      Name:['',[Validators.required]],
      Category:['',[Validators.required]],
      Price:['',[Validators.required]]
    });
    this.getProducts();
  }

  getProducts(): void {
    this.productService.getProducts()
    .subscribe(products => this.products = products);
  }

  add(product: Product): void {
    this.productService.addProduct(product)
      .subscribe(product => {
        this.products.push(product);
      });
  }

  delete(product: Product): void {
    this.products = this.products.filter(h => h !== product);
    this.productService.deleteProduct(product).subscribe();
  }

  onFormSubmit() {  
    const product = this.productForm.value;  
    this.add(product);  
    this.productForm.reset();  
  }  

  resetForm() {  
    this.productForm.reset();  
  }  
}
