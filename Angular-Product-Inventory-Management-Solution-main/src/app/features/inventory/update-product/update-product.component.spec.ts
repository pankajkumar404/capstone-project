import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { UpdateProductComponent } from './update-product.component';
import { ActivatedRoute } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DataService } from '../../../core/data.service';
import { of } from 'rxjs';

describe('UpdateProductComponent', () => {
  let fixture: ComponentFixture<UpdateProductComponent>;
  let component: UpdateProductComponent;

  const mockActivatedRoute = {
    snapshot: { paramMap: { get: jest.fn().mockReturnValue('1') } }
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UpdateProductComponent],
      imports: [
        ReactiveFormsModule, // Import ReactiveFormsModule for form handling
        HttpClientTestingModule // Import HttpClientTestingModule to mock HttpClient
      ],
      providers: [
        { provide: ActivatedRoute, useValue: mockActivatedRoute },
        DataService // Ensure DataService is included in providers
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(UpdateProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('boundary', () => {
    it('should create the update product component', () => {
      expect(component).toBeTruthy();
    });

    it('should render the form with all fields and a submit button', () => {
      const formElement = fixture.debugElement.query(By.css('form'));
      expect(formElement).toBeTruthy();

      const nameInput = fixture.debugElement.query(By.css('input[formControlName="name"]'));
      expect(nameInput).toBeTruthy();

      const descriptionInput = fixture.debugElement.query(By.css('input[formControlName="description"]'));
      expect(descriptionInput).toBeTruthy();

      const manufacturerInput = fixture.debugElement.query(By.css('input[formControlName="manufacturer"]'));
      expect(manufacturerInput).toBeTruthy();

      const priceInput = fixture.debugElement.query(By.css('input[formControlName="price"]'));
      expect(priceInput).toBeTruthy();

      const quantityInput = fixture.debugElement.query(By.css('input[formControlName="quantity"]'));
      expect(quantityInput).toBeTruthy();

      const submitButton = fixture.debugElement.query(By.css('button[type="submit"]'));
      expect(submitButton).toBeTruthy();
    });
  });
});
