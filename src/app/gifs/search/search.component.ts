import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styles: [],
})
export class SearchComponent {
  // Es como un query selector
  @ViewChild('txtSearch') txtSearch!: ElementRef<HTMLInputElement>; // Non-null assertion operator

  constructor(private gifsService: GifsService) {}
  search() {
    const valueSearch = this.txtSearch.nativeElement.value;
    if (valueSearch.trim().length === 0) {
      return;
    } // Validar que no entre espacios vacios
    this.gifsService.searchGifs(valueSearch);
    this.txtSearch.nativeElement.value = '';
  }
}
