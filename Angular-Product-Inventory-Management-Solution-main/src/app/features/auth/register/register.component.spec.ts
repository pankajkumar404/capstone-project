import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { RegisterComponent } from './register.component';
import { AuthService } from '../../../core/auth.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('RegisterComponent', () => {
  let fixture: ComponentFixture<RegisterComponent>;
  let component: RegisterComponent;
  let mockAuthService: jest.Mocked<AuthService>;

  beforeEach(async () => {
    mockAuthService = {
      register: jest.fn().mockReturnValue({ subscribe: jest.fn() }) // Mock register method
    } as unknown as jest.Mocked<AuthService>;

    await TestBed.configureTestingModule({
      declarations: [RegisterComponent],
      imports: [FormsModule, HttpClientTestingModule],
      providers: [{ provide: AuthService, useValue: mockAuthService }]
    }).compileComponents();

    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('boundary', () => {
    it('should create the register component', () => {
      expect(component).toBeTruthy();
    });

    it('should render the form with all fields and a submit button', () => {
      const formElement = fixture.debugElement.query(By.css('form'));
      expect(formElement).toBeTruthy();

      const emailInput = fixture.debugElement.query(By.css('input[name="email"]'));
      expect(emailInput).toBeTruthy();

      const passwordInput = fixture.debugElement.query(By.css('input[name="password"]'));
      expect(passwordInput).toBeTruthy();

      const firstNameInput = fixture.debugElement.query(By.css('input[name="firstName"]'));
      expect(firstNameInput).toBeTruthy();

      const lastNameInput = fixture.debugElement.query(By.css('input[name="lastName"]'));
      expect(lastNameInput).toBeTruthy();

      const locationInput = fixture.debugElement.query(By.css('input[name="location"]'));
      expect(locationInput).toBeTruthy();

      const mobileNumberInput = fixture.debugElement.query(By.css('input[name="mobileNumber"]'));
      expect(mobileNumberInput).toBeTruthy();

      const submitButton = fixture.debugElement.query(By.css('button[type="submit"]'));
      expect(submitButton).toBeTruthy();
      expect(submitButton.nativeElement.textContent).toBe('Register');
    });

  });
});
