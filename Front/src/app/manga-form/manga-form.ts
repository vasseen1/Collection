import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Manga, MangaService } from '../Service/manga.service';
import { Volume, VolumeService } from '../Service/volume.service';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NotificationsService } from '../Service/notifications-service';

@Component({
  selector: 'app-manga-form',
  imports: [CommonModule, FormsModule],
  templateUrl: './manga-form.html',
  styleUrl: './manga-form.scss',
})
export class MangaForm implements OnInit {

  manga: Manga = {
      id:undefined as any, 
      name: '',
      volumeNb: 0,
      statut: '',
      author: '',
      coverImg: '',
      volumeCount: 0,
    };



    volume: Volume = {
      id:undefined as any, 
      mangaId: 0,
      numero: 1,
      imgPath: '',
      resume: '',
      collector: false
    };

    selectedFile?: File;

    readonly statut = ["EN_COURS","TERMINE","ARRETE","EN_ATTENTE"];

    constructor(
      private route: ActivatedRoute,
      private router: Router,
      private mangaService: MangaService,
      private volumeService: VolumeService,
      private notificationService : NotificationsService
    ) {}

    ngOnInit(): void {
      
    }

    onFileSelected(event: any): void {
      const file: File = event.target.files[0];

      if (file) {
        const formData = new FormData();
        formData.append('file', file);

        this.volumeService.uploadImage(formData).subscribe({
          next: (dbPath) => {
            this.volume.imgPath = dbPath;
          },
          error: (err) => console.error('Erreur upload image :', err)
        });
      }
    }

    Retour(): void {
      this.router.navigate([`/`])
    }

    createManga(): void {

      if (!this.manga.name || this.manga.name.trim().length === 0) {
        this.notificationService.show("Le titre ne peut pas être vide", "error");
        return;
      }

      if (!this.manga.volumeNb || this.manga.volumeNb < 1) {
        this.notificationService.show("Le nombre total de tomes ne peut pas être vide", "error");
        return;
      }

      if (this.manga.volumeNb > 1000) {
        this.notificationService.show("Faut pas abuser non plus", "error");
        return;
      }

      if (!this.manga.statut) {
        this.notificationService.show("Le statut ne peut pas être vide", "error");
        return;
      }

      if (!this.statut.includes(this.manga.statut)) {
        this.notificationService.show('Bien essayé mais statut est vérifié','error');
        return;
      }



      if (this.volume.numero > this.manga.volumeNb) {
        this.notificationService.show("Le numéro du tome ne peut pas être au dessus du nombre total de tomes","error")
        return;
      }

      if (this.volume.numero < 0) {
        this.notificationService.show("Le numéro du tome ne peut pas être négatif","error")
        return;
      }

      this.mangaService.getMangaByName(this.manga.name).subscribe({
        next: (existingManga) => {
          this.notificationService.show("Ce manga existe déjà dans la base, impossible de le recrée", "error");
          return;
        },
        error: (err) => {
          if (err.status == 404) {
            this.mangaService.createManga(this.manga).subscribe({
                    next: (createdManga) => {
                      this.volume.mangaId = createdManga.id;

                      this.volumeService.createVolume(this.volume,this.volume.mangaId).subscribe({
                        next: () => {
                          this.notificationService.show('Série et Tome créées avec succès !',"success");
                          this.router.navigate([`/manga/${this.volume.mangaId}`]);
                        },
                        error: (err) => {
                          console.error('Erreur création tome :', err);
                          this.notificationService.show('Erreur lors de la création du tome', "error");
                        }
                      })
                      
                    },
                    error: (err) => {
                      console.error('Erreur création série :', err);
                      this.notificationService.show('Erreur lors de la création de la série', 'error');
                    }
            });
          } else {
            this.notificationService.show("Une erreur est survenue", "error");
            console.error("Une erreur est survenue : ", err);
          }
        }
      })
    }

}
