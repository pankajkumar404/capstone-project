import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../../core/data.service';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent {
  constructor(private dataService: DataService, private router: Router) { }

  onAdd(form: any): void {
    if (form.valid) {
      const newProduct = { ...form.value, id: Date.now() }; // Generate a unique ID
      this.dataService.addProduct(newProduct).subscribe(() => {
        alert('Product added successfully!');
        this.router.navigate(['/inventory']);
      });
    } else {
      alert('Please fill in all required fields.');
    }
  }
}
