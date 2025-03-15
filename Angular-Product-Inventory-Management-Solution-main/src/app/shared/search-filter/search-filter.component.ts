import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search-filter',
  templateUrl: './search-filter.component.html',
  styleUrls: ['./search-filter.component.css']
})
export class SearchFilterComponent {
  @Output() search = new EventEmitter<string>();

  onSearch(event: any): void {
    const query = event.target.value.trim();
    this.search.emit(query);
  }
}
