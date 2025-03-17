import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ProductListComponent } from './product-list.component';
import { SearchFilterComponent } from '../../../shared/search-filter/search-filter.component';
import { RouterTestingModule } from '@angular/router/testing';
import { DataService } from '../../../core/data.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('ProductListComponent', () => {
  let fixture: ComponentFixture<ProductListComponent>;
  let component: ProductListComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductListComponent, SearchFilterComponent],
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [DataService]
    }).compileComponents();

    fixture = TestBed.createComponent(ProductListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('boundary', () => {
    it('should create the product list component', () => {
      expect(component).toBeTruthy();
    });

    it('should render the search filter component', () => {
      const searchFilter = fixture.debugElement.query(By.css('app-search-filter'));
      expect(searchFilter).toBeTruthy();
    });

    it('should render the list of products', () => {
      component.filteredProducts = [
        { id: 1, name: 'Product 1' },
        { id: 2, name: 'Product 2' }
      ];
      fixture.detectChanges();

      const productItems = fixture.debugElement.queryAll(By.css('ul li'));
      expect(productItems.length).toBe(2);
      expect(productItems[0].nativeElement.textContent).toContain('Product 1');
      expect(productItems[1].nativeElement.textContent).toContain('Product 2');
    });

    it('should render buttons for each product', () => {
      component.filteredProducts = [
        { id: 1, name: 'Product 1' }
      ];
      fixture.detectChanges();

      const productItem = fixture.debugElement.query(By.css('ul li'));
      const viewButton = productItem.query(By.css('button:nth-child(1)'));
      const editButton = productItem.query(By.css('button:nth-child(2)'));
      const deleteButton = productItem.query(By.css('button:nth-child(3)'));

      expect(viewButton.nativeElement.textContent).toBe('View');
      expect(editButton.nativeElement.textContent).toBe('Edit');
      expect(deleteButton.nativeElement.textContent).toBe('Delete');
    });

    it('should render the Add Product button', () => {
      const addProductButton = fixture.debugElement.query(By.css('button[routerLink="/inventory/add-product"]'));
      expect(addProductButton).toBeTruthy();
      expect(addProductButton.nativeElement.textContent).toBe('Add Product');
    });
  });
});
