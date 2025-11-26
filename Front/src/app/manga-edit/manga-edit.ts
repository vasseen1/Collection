import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MangaService, Manga } from '../Service/manga.service';
import { NotificationsService } from '../Service/notifications-service';

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
    private mangaService: MangaService,
    private notificationService: NotificationsService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.mangaService.getMangaById(id).subscribe({
      next: (manga) => {
        this.manga = manga;

        // Récupération du nombre de volumes
        this.mangaService.getNumberOfVolumes(manga.id).subscribe({
          next: (count) => {
            manga.volumeCount = count;
          },
          error: (err) => {
            console.error('Erreur lors de la récupération du nombre de volumes :', err);
            this.notificationService.show(
              'Impossible de récupérer le nombre de volumes',
              'error'
            );
          }
        });
      },
      error: (err) => {
        console.error('Erreur lors de la récupération du manga :', err);
        this.notificationService.show(
          'Impossible de récupérer les informations du manga',
          'error'
        );
        // Optionnel : rediriger vers la liste si l’ID est invalide
        this.router.navigate(['/']);
      }
    });
  }


  getStatutLabel(statut: string): string {
    return STATUT_LABELS[statut] || statut;
  }

  Retour(): void {
    this.router.navigate([`/manga/${this.manga?.id}`])
  }

  updateManga():void {
    if (!this.manga) return;

    this.mangaService.updateManga(this.manga.id, this.manga).subscribe({
      next: () => {
        this.notificationService.show('Série mise à jour avec succès',"success");
        this.router.navigate([`/manga/${this.manga?.id}`]);
      },
      error: (err) => {
        console.error('Erreur lors de la mise à jour de la série : ', err);
        this.notificationService.show('Une erreur est survenue lors de la mise à jour de la série', 'error');
      }
    });
  }
}
