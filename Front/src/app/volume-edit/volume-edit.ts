import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { VolumeService, Volume } from '../Service/volume.service';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationsService } from '../Service/notifications-service';
import { Manga, MangaService } from '../Service/manga.service';

@Component({
  selector: 'app-volume-edit',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './volume-edit.html',
  styleUrls: ['./volume-edit.scss'],
})
export class VolumeEdit implements OnInit {

  volume?: Volume;
  manga?: Manga;
  deleteImage: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private volumeService: VolumeService,
    private router: Router,
    private mangaService: MangaService,
    private notificationService : NotificationsService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.volumeService.getVolumeById(id).subscribe({
      next: (volume) => {
        this.volume = volume;
        this.mangaService.getMangaById(this.volume.mangaId).subscribe({
          next: (manga) => {
            this.manga = manga;
          },
          error: (err) => {
            console.error('Erreur lors de la récupération du manga : ', err);
            this.notificationService.show('Erreur lors de la récupération du manga', 'error');
          }
        })
      },
      error: (err) => {
        console.error('Erreur lors de la récupération du tome : ', err);
        this.notificationService.show('Erreur lors de la récupération du tome', 'error');
        this.router.navigate(['/']);
      }
    });
  }

  onFileSelected(event: any): void {

    if (!this.volume) return;

    const file: File = event.target.files[0];

    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      this.volumeService.uploadImage(formData).subscribe({
        next: (dbPath) => {
          this.volume!.imgPath = dbPath;
        },
        error: (err) => console.error('Erreur upload image :', err)
      });
    }
  }

  Retour(): void {
    this.router.navigate([`/volume/${this.volume?.id}`])
  }

  maj() {

    if (!this.volume) {
      this.notificationService.show("Une erreur est survenue", "error");
      return;
    }
    if (this.deleteImage) {
      this.volume.imgPath = null as any;
    }

    this.volumeService.updateVolume(this.volume.id, this.volume).subscribe({
      next: () => {
        this.notificationService.show('Tome mis à jour avec succès', "success")
        this.router.navigate([`/volume/${this.volume?.id}`]);
      },
      error: (err) => {
        console.error('Erreur lors de la mise à jour du tome : ', err);
        this.notificationService.show('Erreur lors de la mise à jour du Tome',"error");
      }
    });
  }

  updateVolume():void {
    if (!this.volume || !this.manga) return;

    if (this.volume.numero > this.manga.volumeNb) {
      this.notificationService.show("Le numéro du tome ne peut être supérieur au nombre total de volume de la série", "error");
      return;
    }

    if (this.volume.numero < 0) {
      this.notificationService.show("Le numéro du tome ne peut être négatif", "error");
      return;
    }

    this.volumeService.getVolumeByMangaAndNumberAndCollector(this.volume.mangaId, this.volume.numero, this.volume.collector).subscribe({
      next: (existingVolume) => {
        if (!this.volume) return;
        this.notificationService.show(`${this.volume.collector}`,'success');

        if (existingVolume.id == this.volume.id) {
          this.maj();
        } else {
          this.notificationService.show("Il y a déja un tome possèdant ces caractèristiques ", 'error');
          return;
        }
      }, 
      error: (err) => {
        if (err.status == 404) {
          this.maj();
        } else {
          this.notificationService.show("Impossible", 'error');
          return;
        }
      }
    })    
  }

}
