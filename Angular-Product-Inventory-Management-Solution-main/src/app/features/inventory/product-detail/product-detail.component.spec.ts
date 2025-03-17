import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ProductDetailComponent } from './product-detail.component';
import { DataService } from '../../../core/data.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('ProductDetailComponent', () => {
  let fixture: ComponentFixture<ProductDetailComponent>;
  let component: ProductDetailComponent;

  const mockActivatedRoute = {
    snapshot: { paramMap: { get: jest.fn().mockReturnValue('1') } }
  };

  const mockDataService = {
    getProducts: jest.fn().mockReturnValue(
      of([
        {
          id: 1,
          name: 'Product 1',
          description: 'Sample description',
          manufacturer: 'Manufacturer 1',
          price: 100,
          quantity: 10
        }
      ])
    )
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductDetailComponent],
      imports: [HttpClientTestingModule],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        { provide: DataService, useValue: mockDataService }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('boundary', () => {
    it('should create the product detail component', () => {
      expect(component).toBeTruthy();
    });

    it('should render the product details heading', () => {
      const headingElement = fixture.debugElement.query(By.css('h2'));
      expect(headingElement).toBeTruthy();
      expect(headingElement.nativeElement.textContent).toBe('Product Details');
    });

    it('should display the product name', () => {
      const nameElement = fixture.debugElement.query(By.css('p:nth-child(2)'));
      expect(nameElement).toBeTruthy();
      expect(nameElement.nativeElement.textContent).toContain('Product 1');
    });

    it('should display the product description', () => {
      const descriptionElement = fixture.debugElement.query(By.css('p:nth-child(3)'));
      expect(descriptionElement).toBeTruthy();
      expect(descriptionElement.nativeElement.textContent).toContain('Sample description');
    });

    it('should display the product manufacturer', () => {
      const manufacturerElement = fixture.debugElement.query(By.css('p:nth-child(4)'));
      expect(manufacturerElement).toBeTruthy();
      expect(manufacturerElement.nativeElement.textContent).toContain('Manufacturer 1');
    });

    it('should display the product price', () => {
      const priceElement = fixture.debugElement.query(By.css('p:nth-child(5)'));
      expect(priceElement).toBeTruthy();
      expect(priceElement.nativeElement.textContent).toContain('100');
    });

    it('should display the product quantity', () => {
      const quantityElement = fixture.debugElement.query(By.css('p:nth-child(6)'));
      expect(quantityElement).toBeTruthy();
      expect(quantityElement.nativeElement.textContent).toContain('10');
    });
  });
});
