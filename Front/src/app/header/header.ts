import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SearchService } from '../Service/search.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './header.html',
  styleUrls: ['./header.scss'],
})
export class Header {
 constructor(private searchService: SearchService) {}

 onSearchChange(event: Event) {
  const value = (event.target as HTMLInputElement).value;
  this.searchService.updateSearchTerm(value);

 }
}
