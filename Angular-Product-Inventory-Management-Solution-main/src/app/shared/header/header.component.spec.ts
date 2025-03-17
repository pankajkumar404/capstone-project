import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { HeaderComponent } from './header.component';
import { AuthService } from '../../core/auth.service';

describe('HeaderComponent', () => {
  let fixture: ComponentFixture<HeaderComponent>;
  let component: HeaderComponent;
  let mockAuthService: jest.Mocked<AuthService>;

  beforeEach(async () => {
    mockAuthService = {
      isLoggedIn: jest.fn(),
      logout: jest.fn()
    } as unknown as jest.Mocked<AuthService>;

    await TestBed.configureTestingModule({
      declarations: [HeaderComponent],
      imports: [RouterTestingModule],
      providers: [{ provide: AuthService, useValue: mockAuthService }]
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('boundary', () => {
    it('should create the header component', () => {
      expect(component).toBeTruthy();
    });

    it('should render Products and About links', () => {
      const links = fixture.debugElement.queryAll(By.css('a'));
      const linkTexts = links.map(link => link.nativeElement.textContent.trim());

      expect(linkTexts).toContain('Products');
      expect(linkTexts).toContain('About');
    });

    it('should show Sign In and Register links when not logged in', () => {
      mockAuthService.isLoggedIn.mockReturnValue(false); // Mock logged-out state
      fixture.detectChanges();

      const links = fixture.debugElement.queryAll(By.css('a'));
      const linkTexts = links.map(link => link.nativeElement.textContent.trim());

      expect(linkTexts).toContain('Sign In');
      expect(linkTexts).toContain('Register');
    });

    it('should not show Sign In and Register links when logged in', () => {
      mockAuthService.isLoggedIn.mockReturnValue(true); // Mock logged-in state
      fixture.detectChanges();

      const links = fixture.debugElement.queryAll(By.css('a'));
      const linkTexts = links.map(link => link.nativeElement.textContent.trim());

      expect(linkTexts).not.toContain('Sign In');
      expect(linkTexts).not.toContain('Register');
    });

    it('should show Logout button when logged in', () => {
      mockAuthService.isLoggedIn.mockReturnValue(true); // Mock logged-in state
      fixture.detectChanges();

      const logoutButton = fixture.debugElement.query(By.css('button'));
      expect(logoutButton).toBeTruthy();
      expect(logoutButton.nativeElement.textContent.trim()).toBe('Logout');
    });

    it('should call logout() method when Logout button is clicked', () => {
      mockAuthService.isLoggedIn.mockReturnValue(true); // Mock logged-in state
      fixture.detectChanges();

      const logoutButton = fixture.debugElement.query(By.css('button'));
      logoutButton.triggerEventHandler('click', null);

      expect(mockAuthService.logout).toHaveBeenCalled();
    });
  });
});
