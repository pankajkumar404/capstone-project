import { TestBed, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { By } from '@angular/platform-browser';

describe('AppComponent', () => {
    let fixture: ComponentFixture<AppComponent>;
    let component: AppComponent;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [AppComponent],
            imports: [RouterTestingModule]
        }).compileComponents();

        fixture = TestBed.createComponent(AppComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    describe('boundary', () => {
        it('should create the app component', () => {
            expect(component).toBeTruthy();
        });

        it('should have the title "Product Inventory System"', () => {
            expect(component.title).toBe('Product Inventory System');
        });

        it('should render the header component', () => {
            const headerElement = fixture.debugElement.query(By.css('app-header'));
            expect(headerElement).toBeTruthy();
        });

        it('should render the footer component', () => {
            const footerElement = fixture.debugElement.query(By.css('app-footer'));
            expect(footerElement).toBeTruthy();
        });

        it('should contain a router outlet tag', () => {
            const nativeElement = fixture.nativeElement;
            expect(nativeElement.innerHTML).toContain('<router-outlet>');
        });
    });
});
