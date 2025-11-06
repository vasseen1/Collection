import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { VolumeService, Volume } from '../Service/volume.service';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-volume-edit',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './volume-edit.html',
  styleUrls: ['./volume-edit.scss'],
})
export class VolumeEdit implements OnInit {

  volume?: Volume;
  deleteImage: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private volumeService: VolumeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.volumeService.getVolumeById(id).subscribe(volume => {
      this.volume = volume;
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

  updateVolume():void {
    if (!this.volume) return;

    if (this.deleteImage) {
      this.volume.imgPath = null as any;
    }

    this.volumeService.updateVolume(this.volume.id, this.volume).subscribe({
      next: () => {
        alert('Tome mis à jour avec succès');
        this.router.navigate([`/manga/${this.volume?.mangaId}`]);
      },
      error: (err) => console.error('Erreur lors de la mise à jour du tome : ', err),
    });
  }

}
