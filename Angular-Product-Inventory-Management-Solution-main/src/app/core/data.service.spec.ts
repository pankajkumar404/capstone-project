import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { DataService } from './data.service';

describe('DataService', () => {
  let service: DataService;
  let httpTestingController: HttpTestingController;
  const apiUrl = 'http://localhost:3000';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [DataService]
    });

    service = TestBed.inject(DataService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify(); // Ensure no outstanding HTTP requests
  });

  describe('boundary', () => {
    it('should fetch users from the API', () => {
      const mockUsers = [{ id: 1, name: 'John' }, { id: 2, name: 'Jane' }];

      service.getUsers().subscribe(users => {
        expect(users).toEqual(mockUsers);
      });

      const req = httpTestingController.expectOne(`${apiUrl}/users`);
      expect(req.request.method).toBe('GET');
      req.flush(mockUsers);
    });

    it('should fetch a product by ID from the API', () => {
      const mockProduct = { id: 1, name: 'Product 1' };

      service.getProductById(1).subscribe(product => {
        expect(product).toEqual(mockProduct);
      });

      const req = httpTestingController.expectOne(`${apiUrl}/products/1`);
      expect(req.request.method).toBe('GET');
      req.flush(mockProduct);
    });

    it('should fetch all products from the API', () => {
      const mockProducts = [{ id: 1, name: 'Product 1' }, { id: 2, name: 'Product 2' }];

      service.getProducts().subscribe(products => {
        expect(products).toEqual(mockProducts);
      });

      const req = httpTestingController.expectOne(`${apiUrl}/products`);
      expect(req.request.method).toBe('GET');
      req.flush(mockProducts);
    });

    it('should send a POST request to add a new product', () => {
      const newProduct = { name: 'New Product' };

      service.addProduct(newProduct).subscribe(product => {
        expect(product).toEqual(newProduct);
      });

      const req = httpTestingController.expectOne(`${apiUrl}/products`);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(newProduct);
      req.flush(newProduct);
    });

    it('should send a DELETE request to delete a product by ID', () => {
      service.deleteProduct(1).subscribe(response => {
        expect(response).toBeNull(); // DELETE often returns null or empty response
      });

      const req = httpTestingController.expectOne(`${apiUrl}/products/1`);
      expect(req.request.method).toBe('DELETE');
      req.flush(null);
    });

    it('should send a PUT request to update an existing product', () => {
      const updatedProduct = { id: 1, name: 'Updated Product' };

      service.updateProduct(updatedProduct).subscribe(product => {
        expect(product).toEqual(updatedProduct);
      });

      const req = httpTestingController.expectOne(`${apiUrl}/products/1`);
      expect(req.request.method).toBe('PUT');
      expect(req.request.body).toEqual(updatedProduct);
      req.flush(updatedProduct);
    });
  });
});
