import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../../../core/data.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.css']
})
export class UpdateProductComponent implements OnInit {
  updateProductForm: FormGroup;
  productId: number | null = null;

  constructor(
    private route: ActivatedRoute,
    private dataService: DataService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.updateProductForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', Validators.required],
      manufacturer: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      quantity: [1, [Validators.required, Validators.min(1)]]
    });
  }

  ngOnInit(): void {
    // Get product ID from route params
    this.productId = Number(this.route.snapshot.paramMap.get('id'));

    if (this.productId) {
      // Load product data from service
      console.log(this.productId, typeof this.productId);
      
      this.dataService.getProductById(this.productId).subscribe(
        (product) => {
          if (product) {
            // Populate the form with product data
            this.updateProductForm.patchValue(product);
          } else {
            alert('Product not found.');
            this.router.navigate(['/inventory']);
          }
        },
        (error) => {
          console.error('Error loading product:', error);
          alert('An error occurred while loading the product.');
          this.router.navigate(['/inventory']);
        }
      );
    }
  }

  onUpdate(): void {
    if (this.updateProductForm.valid && this.productId !== null) {
      // Update product data
      const updatedProduct = { id: this.productId, ...this.updateProductForm.value };
      this.dataService.updateProduct(updatedProduct).subscribe(
        () => {
          alert('Product updated successfully!');
          this.router.navigate(['/inventory']);
        },
        (error) => {
          console.error('Error updating product:', error);
          alert('An error occurred while updating the product.');
        }
      );
    } else {
      alert('Please correct the errors in the form.');
    }
  }
}
