import { Component , OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MangaService, Manga } from '../Service/manga.service';
import { VolumeService, Volume } from '../Service/volume.service';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

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
    private volumeService: VolumeService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.mangaService.getMangaById(id).subscribe(manga => {
      this.manga = manga;
      this.volume.mangaId = manga.id;
    });
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

  createVolume(): void {
    if (!this.manga) return;

    this.volumeService.createVolume(this.volume,this.manga.id).subscribe({
      next: () => {
        alert('Tome créé avec succès !');
        this.router.navigate([`/manga/${this.manga?.id}`]); // 🔥 retour vers la page du manga
      },
      error: (err) => console.error('Erreur création tome :', err)
    });
  }
}
