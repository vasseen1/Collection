import { Component , OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MangaService, Manga } from '../Service/manga.service';
import { VolumeService, Volume } from '../Service/volume.service';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationsService } from '../Service/notifications-service';

@Component({
  selector: 'app-volume-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './volume-form.html',
  styleUrls: ['./volume-form.scss'],
})
export class VolumeForm implements OnInit {

  manga?: Manga;
  volume: Volume = {
    id:undefined as any, 
    mangaId: 0,
    numero: 1,
    imgPath: '',
    resume: '',
    collector: false
  };
  selectedFile?: File;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private mangaService: MangaService,
    private volumeService: VolumeService,
    private notificationService : NotificationsService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.mangaService.getMangaById(id).subscribe({
      next: (manga) => {
        this.manga = manga;
        this.volume.mangaId = manga.id;
      }, 
      error: (err) => {
        console.error('Erreur lors de la récupération du manga : ', err);
        this.notificationService.show('Erreur lors de la récupération du manga', "error");
        this.router.navigate(['/']);
      }
    });
  }




  Retour(): void {
    this.router.navigate([`/manga/${this.manga?.id}`])
  }

  createVolume(): void {
  if (!this.manga) return;

  if (this.volume.numero > this.manga.volumeNb) {
    this.notificationService.show("Le numéro du tome ne peut être supérieur au nombre total de volume de la série", "error");
    return;
  }

  if (this.volume.numero < 0) {
    this.notificationService.show("Le numéro du tome ne peut être négatif", "error");
    return;
  }

  // Vérifie si le volume existe déjà
  this.volumeService.getVolumeByMangaAndNumberAndCollector(this.manga.id, this.volume.numero, this.volume.collector)
    .subscribe({
      next: (existingVolume) => {
        this.notificationService.show("Impossible d'ajouter ce tome car il existe déjà", "error");
      },
      error: (err) => {
        if (err.status === 404) {
          // Crée FormData pour envoyer volume + image
          if (!this.manga) return;
          const formData = new FormData();
          formData.append('volume', new Blob([JSON.stringify(this.volume)], { type: 'application/json' }));
          if (this.selectedFile) {
            formData.append('image', this.selectedFile);
          }

          this.volumeService.createVolumeWithImage(formData, this.manga.id).subscribe({
            next: () => {
              this.notificationService.show('Tome créé avec succès !', "success");
              this.router.navigate([`/manga/${this.manga?.id}`]);
            },
            error: (err) => {
              console.error('Erreur création tome :', err);
              this.notificationService.show('Erreur lors de la création du tome', "error");
            }
          });
        } else {
          this.notificationService.show("Une erreur est survenue", "error");
          console.error("Une erreur est survenue : ", err);
        }
      }
    });
}

}
