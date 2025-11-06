import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { MangaService, Manga} from '../Service/manga.service';
import { Volume, VolumeService } from '../Service/volume.service';

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
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    // Récupère les infos du manga
    this.mangaService.getMangaById(id).subscribe(manga => {
      this.manga = manga;

      // Nombre total de volumes
      this.mangaService.getNumberOfVolumes(manga.id).subscribe(count => {
        manga.volumeCount = count;
      });
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
        return;
      }

      if (confirm('Es-tu sûr?')) {
        this.mangaService.deleteTome(this.manga.id).subscribe(() => {
          alert('Manga supprimé avec succès');
          this.router.navigate(['/']);
        })
      }
    }
}
