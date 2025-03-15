import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../../../core/data.service';
import { AuthService } from '../../../core/auth.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {
  products: any[] = [];
  filteredProducts: any[] = [];

  constructor(
    private dataService: DataService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.dataService.getProducts().subscribe((data) => {
      this.products = data;
      this.filteredProducts = data;
    });
  }

  onSearch(query: string): void {
    this.filteredProducts = this.products.filter(product =>
      product.name.toLowerCase().includes(query.toLowerCase())
    );
  }

  viewProduct(id: number): void {
    this.router.navigate([`/inventory/product-detail/${id}`]);
  }

  editProduct(id: number): void {
    this.router.navigate([`/inventory/update-product/${id}`]);
  }

  deleteProduct(id: number): void {
    // Check if the user is authenticated
    if (!this.authService.isLoggedIn()) {
      alert('You must be logged in to delete a product!');
      this.router.navigate(['/auth/sign-in']); // Redirect to login page
      return;
    }

    // Proceed with deletion if authenticated
    this.dataService.deleteProduct(id).subscribe(() => {
      this.products = this.products.filter(product => product.id !== id);
      this.filteredProducts = this.filteredProducts.filter(product => product.id !== id);
    });
  }
}
