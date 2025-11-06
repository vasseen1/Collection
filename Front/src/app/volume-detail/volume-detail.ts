import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule, Router } from '@angular/router';
import { MangaService, Manga } from '../Service/manga.service';
import { VolumeService, Volume } from '../Service/volume.service';

export const STATUT_LABELS: { [key: string]: string } = {
  EN_COURS: 'En cours',
  TERMINE: 'Terminé',
  ARRETE: 'Arrêté',
  EN_ATTENTE: 'En pause',
};

@Component({
  selector: 'app-volume-detail',
  imports: [CommonModule, RouterModule],
  templateUrl: './volume-detail.html',
  styleUrls: ['./volume-detail.scss'],
})
export class VolumeDetail implements OnInit{

  volume?: Volume;
  manga?:Manga;

  constructor( 
    private route: ActivatedRoute, 
    private mangaService: MangaService,
    private volumeService: VolumeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.volumeService.getVolumeById(id).subscribe(volume => {
      this.volume = volume;

    this.mangaService.getMangaById(volume.mangaId).subscribe(manga => {
      this.manga = manga;
    }
    )
    });
  }

  getStatutLabel(statut: string): string {
      return STATUT_LABELS[statut] || statut;
  }

  supprimerVolume():void {

    if (!this.volume) {
      console.error("Aucun Volume chargé !");
      return;
    }

    if (confirm('Es-tu sûr?')) {
      let temp: number | undefined = this.volume?.mangaId;
      this.volumeService.deleteVolume(this.volume.id).subscribe(() => {
        alert('Tome supprimé avec succès');
        this.router.navigate([`/manga/${temp}`]);
      })
    }
  }
}
