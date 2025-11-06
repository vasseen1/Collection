import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Manga, MangaService } from '../Service/manga.service';
import { Volume, VolumeService } from '../Service/volume.service';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-manga-form',
  imports: [CommonModule, FormsModule],
  templateUrl: './manga-form.html',
  styleUrl: './manga-form.scss',
})
export class MangaForm implements OnInit {

  manga: Manga = {
      id:undefined as any, 
      name: ' ',
      volumeNb: 0,
      statut: ' ',
      author: ' ',
      coverImg: ' ',
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

    constructor(
      private route: ActivatedRoute,
      private router: Router,
      private mangaService: MangaService,
      private volumeService: VolumeService
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

    createManga(): void {

      this.mangaService.createManga(this.manga).subscribe({
        next: (createdManga) => {
          this.volume.mangaId = createdManga.id;

          this.volumeService.createVolume(this.volume,this.volume.mangaId).subscribe({
            next: () => {
              alert('Série et Tome créées avec succès !');
              this.router.navigate([`/manga/${this.volume.mangaId}`]);
            },
            error: (err) => console.error('Erreur création tome :', err)
          })
          
        },
        error: (err) => console.error('Erreur création série :', err)
      });
    }

}
