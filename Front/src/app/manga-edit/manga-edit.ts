import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MangaService, Manga } from '../Service/manga.service';

export const STATUT_LABELS: { [key: string]: string } = {
  EN_COURS: 'En cours',
  TERMINE: 'Terminé',
  ARRETE: 'Arrêté',
  EN_ATTENTE: 'En pause'
};

@Component({
  selector: 'app-manga-edit',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './manga-edit.html',
  styleUrls: ['./manga-edit.scss'],
})

export class MangaEdit implements OnInit {

  manga?: Manga;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private mangaService: MangaService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.mangaService.getMangaById(id).subscribe(manga => {
      this.manga = manga;
    }); 

  }

  getStatutLabel(statut: string): string {
    return STATUT_LABELS[statut] || statut;
  }

  updateManga():void {
    if (!this.manga) return;

    this.mangaService.updateManga(this.manga.id, this.manga).subscribe({
      next: () => {
        alert('Série mise à jour avec succès');
        this.router.navigate(['/']);
      },
      error: (err) => console.error('Erreur lors de la mise à jour de la série : ', err),
    });
  }
}
