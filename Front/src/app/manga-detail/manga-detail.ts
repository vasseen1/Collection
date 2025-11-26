import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { MangaService, Manga} from '../Service/manga.service';
import { Volume, VolumeService } from '../Service/volume.service';
import { NotificationsService } from '../Service/notifications-service';

export const STATUT_LABELS: { [key: string]: string } = {
  EN_COURS: 'En cours',
  TERMINE: 'Terminé',
  ARRETE: 'Arrêté',
  EN_ATTENTE: 'En pause'
};

@Component({
  selector: 'app-manga-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './manga-detail.html',
  styleUrls: ['./manga-detail.scss']
})

export class MangaDetail implements OnInit {

  manga?: Manga;
  volumes: Volume[] = [];
  normalVolumes: Volume[] = [];
  collectorVolumes: Volume[] = [];
  firstVolumeWithImage?: Volume;

  constructor(
    private route: ActivatedRoute,
    private mangaService: MangaService,
    private volumeService: VolumeService,
    private router: Router,
    private notificationService: NotificationsService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    // Récupère les infos du manga
    this.mangaService.getMangaById(id).subscribe({
      next: (manga) => {
        this.manga = manga;

        // Nombre total de volumes
        this.mangaService.getNumberOfVolumes(manga.id).subscribe({
          next: (count) => {
            manga.volumeCount = count;
          },
          error: (err) => {
            console.error('Erreur lors du comptage des volumes', err);
            this.notificationService.show('Impossible de récupérer le nombre de volumes.','error');
          }
        });
      },
      error: (err) => {
        console.error('Erreur lors de la récupération du manga', err);
        this.notificationService.show('Impossible de récupérer le manga depuis le serveur.',"error");
      }
    });


    // Récupère les volumes
    this.volumeService.getVolumesByManga(id).subscribe((volumes: Volume[]) => {
      this.volumes = volumes;
      this.firstVolumeWithImage = this.volumes.find(v => v.imgPath);

      this.collectorVolumes = volumes.filter(v => v.collector);
      this.normalVolumes = volumes.filter(v => !v.collector);
    });

  }

    getStatutLabel(statut: string): string {
      return STATUT_LABELS[statut] || statut;
    }

    supprimerManga():void {

      if (!this.manga) {
        console.error("Aucun Manga chargé !");
        this.notificationService.show('Aucun Manga chargé !','error');
        return;
      }

      if (confirm('Es-tu sûr?')) {
        this.mangaService.deleteTome(this.manga.id).subscribe(() => {
          this.notificationService.show('Manga supprimé avec succès',"success");
          this.router.navigate(['/']);
        })
      } else {
        this.notificationService.show('Suppression annulée', 'error');
      }
    }
}
