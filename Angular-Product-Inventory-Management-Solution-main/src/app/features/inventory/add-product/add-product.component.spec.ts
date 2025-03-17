import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AddProductComponent } from './add-product.component';
import { DataService } from '../../../core/data.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('AddProductComponent', () => {
  let fixture: ComponentFixture<AddProductComponent>;
  let component: AddProductComponent;

  const mockDataService = {
    addProduct: jest.fn()
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddProductComponent],
      imports: [FormsModule, HttpClientTestingModule],
      providers: [{ provide: DataService, useValue: mockDataService }]
    }).compileComponents();

    fixture = TestBed.createComponent(AddProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('boundary', () => {
    it('should create the add product component', () => {
      expect(component).toBeTruthy();
    });

    it('should render the form with all fields and the submit button', () => {
      const formElement = fixture.debugElement.query(By.css('form'));
      expect(formElement).toBeTruthy();

      const nameInput = fixture.debugElement.query(By.css('input[name="name"]'));
      expect(nameInput).toBeTruthy();

      const descriptionInput = fixture.debugElement.query(By.css('input[name="description"]'));
      expect(descriptionInput).toBeTruthy();

      const manufacturerInput = fixture.debugElement.query(By.css('input[name="manufacturer"]'));
      expect(manufacturerInput).toBeTruthy();

      const priceInput = fixture.debugElement.query(By.css('input[name="price"]'));
      expect(priceInput).toBeTruthy();

      const quantityInput = fixture.debugElement.query(By.css('input[name="quantity"]'));
      expect(quantityInput).toBeTruthy();

      const submitButton = fixture.debugElement.query(By.css('button[type="submit"]'));
      expect(submitButton).toBeTruthy();
      expect(submitButton.nativeElement.textContent).toBe('Add Product');
    });
  });
});
