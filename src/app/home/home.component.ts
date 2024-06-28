import { Component, ViewChild } from '@angular/core';
import { CharacterService } from '../services/character.service';
import {CommonModule, DatePipe, NgFor, NgIf} from '@angular/common';
import {FormControl, FormGroup, ReactiveFormsModule} from '@angular/forms';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgFor, DatePipe, NgIf, CommonModule, ReactiveFormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'  
})
export class HomeComponent {
  @ViewChild("charactersDiv") charactersDiv: HTMLDivElement = {} as HTMLDivElement;

  characters: any;

  currentPage: number = 1;
  totalPages: number = 0;
  pagesToShow: number[] = [];
  count: number = 0;

  searchForm = new FormGroup({
    searchField: new FormControl<string>(''),
  });

  isFilterOn: boolean = false;

  constructor(private characterService: CharacterService) { }

  ngOnInit(): void {
    this.loadCharacters();
  }

  loadCharacters(): void {
    this.characterService.getAllCharacters(this.currentPage).subscribe(data => {
      this.characters = data.results;
      this.totalPages = data.info.pages;
      this.count = data.info.count;
      this.updatePagesToShow();
    });
  }

  goToPage(page: number): void {
    this.currentPage = page;
    if (this.isFilterOn) {
      this.search()
    } else {
      this.loadCharacters();
    }
    this.scrollToElement(this.charactersDiv);
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      if (this.isFilterOn) {
        this.search()
      } else {
        this.loadCharacters();
      }
      this.scrollToElement(this.charactersDiv);
    }
  }

  prevPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      if (this.isFilterOn) {
        this.search()
      } else {
        this.loadCharacters();
      }
      this.scrollToElement(this.charactersDiv);
    }
  }

  updatePagesToShow(): void {
    const pages = [];
    if (this.currentPage > 2) {
      pages.push(this.currentPage - 1);
    }
    pages.push(this.currentPage);
    if (this.currentPage < this.totalPages - 1) {
      pages.push(this.currentPage + 1);
    }
    this.pagesToShow = pages;
  }

  search(): void {
    if(!this.searchForm.value.searchField) return;
    if (!this.isFilterOn) {
      this.currentPage = 1;
    };
    this.isFilterOn = true;

    this.characterService.searchByName(this.currentPage, this.searchForm.value.searchField).subscribe(data => {
      this.characters = data.results;
      this.totalPages = data.info.pages;
      this.count = data.info.count;
      this.updatePagesToShow();
    }, error => {
      this.characters = [];
      this.totalPages = 1;
      this.count = 0;
      this.updatePagesToShow();
    });
  }

  resetFilter(): void {
    this.currentPage = 1;
    this.isFilterOn = false;
    this.searchForm.setValue({searchField: ""})
    this.loadCharacters();
  }

  scrollToElement(element:any): void {
    element.nativeElement.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
  }
}
