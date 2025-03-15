import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { SignInComponent } from './sign-in.component';
import { AuthService } from '../../../core/auth.service';
import { Router } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('SignInComponent', () => {
  let fixture: ComponentFixture<SignInComponent>;
  let component: SignInComponent;
  let mockAuthService: jest.Mocked<AuthService>;
  let mockRouter: jest.Mocked<Router>;

  beforeEach(async () => {
    mockAuthService = {
      login: jest.fn().mockReturnValue(true) // Mock successful login
    } as unknown as jest.Mocked<AuthService>;

    mockRouter = {
      navigate: jest.fn()
    } as unknown as jest.Mocked<Router>;

    await TestBed.configureTestingModule({
      declarations: [SignInComponent],
      imports: [FormsModule, HttpClientTestingModule],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: Router, useValue: mockRouter }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SignInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('boundary', () => {
    it('should create the sign-in component', () => {
      expect(component).toBeTruthy();
    });

    it('should render the form with all fields and a submit button', () => {
      const formElement = fixture.debugElement.query(By.css('form'));
      expect(formElement).toBeTruthy();

      const emailInput = fixture.debugElement.query(By.css('input[name="email"]'));
      expect(emailInput).toBeTruthy();

      const passwordInput = fixture.debugElement.query(By.css('input[name="password"]'));
      expect(passwordInput).toBeTruthy();

      const submitButton = fixture.debugElement.query(By.css('button[type="submit"]'));
      expect(submitButton).toBeTruthy();
      expect(submitButton.nativeElement.textContent).toBe('Login');
    });

    it('should call AuthService login method on form submission', () => {
      const emailInput = fixture.debugElement.query(By.css('input[name="email"]')).nativeElement;
      const passwordInput = fixture.debugElement.query(By.css('input[name="password"]')).nativeElement;

      emailInput.value = 'test@example.com';
      passwordInput.value = 'password123';
      emailInput.dispatchEvent(new Event('input'));
      passwordInput.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      const form = fixture.debugElement.query(By.css('form'));
      form.triggerEventHandler('ngSubmit', null);

      expect(mockAuthService.login).toHaveBeenCalledWith('test@example.com', 'password123');
    });

  });
});
