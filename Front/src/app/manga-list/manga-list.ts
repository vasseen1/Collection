import { Component, OnInit } from '@angular/core';
import {RouterModule} from '@angular/router';
import { MangaService, Manga } from '../Service/manga.service';
import { CommonModule } from '@angular/common';
import { SearchService } from '../Service/search.service';
import { FormsModule } from '@angular/forms';

export const STATUT_LABELS: { [key: string]: string } = {
  EN_COURS: 'En cours',
  TERMINE: 'Terminé',
  ARRETE: 'Arrêté',
  EN_ATTENTE: 'En pause',
};

@Component({
  selector: 'app-manga-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './manga-list.html',
  styleUrls: ['./manga-list.scss']
})
export class MangaListComponent implements OnInit {

  mangas: Manga[] = [];
  filteredMangas: Manga[] = [];
  selectedStatut: string = '';
  searchTerm: string ='';

  constructor(
    private mangaService: MangaService,
    private searchService: SearchService
  ) {}

  filterMangas(): void {
    this.filteredMangas = this.mangas.filter(manga => {
      const matchesStatut = this.selectedStatut ? manga.statut === this.selectedStatut : true;
      const matchesSearch = this.searchTerm ? manga.name.toLowerCase().includes(this.searchTerm.toLowerCase()) : true;
      return matchesStatut && matchesSearch;
    });
  }

  ngOnInit(): void {
    // Récupère tous les mangas
    this.mangaService.getMangas().subscribe(mangas => {
      this.mangas = mangas;
      this.filteredMangas = mangas;

      // Pour chaque manga, récupère le premier volume et le nombre de volumes
      this.mangas.forEach(manga => {
        // Premier volume pour la jaquette
        this.mangaService.getFirstVolume(manga.id).subscribe(volume => {
          manga.coverImg = volume.imgPath;
        });
        // Nombre total de volumes
        this.mangaService.getNumberOfVolumes(manga.id).subscribe(count => {
          manga.volumeCount = count;
        });
      });
    });

    this.searchService.searchTerm$.subscribe((term) => {
      this.searchTerm = term;
      this.filterMangas();
    });
  }

  getStatutLabel(statut: string): string {
    return STATUT_LABELS[statut] || statut;
  }

}



