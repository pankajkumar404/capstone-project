import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { SearchFilterComponent } from './search-filter.component';

describe('SearchFilterComponent', () => {
  let fixture: ComponentFixture<SearchFilterComponent>;
  let component: SearchFilterComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SearchFilterComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(SearchFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('boundary', () => {
    it('should create the search filter component', () => {
      expect(component).toBeTruthy();
    });

    it('should render the input field', () => {
      const inputElement = fixture.debugElement.query(By.css('input'));
      expect(inputElement).toBeTruthy();
    });

    it('should have a placeholder "Search..." in the input field', () => {
      const inputElement: HTMLInputElement = fixture.debugElement.query(By.css('input')).nativeElement;
      expect(inputElement.placeholder).toBe('Search...');
    });
  });
});
