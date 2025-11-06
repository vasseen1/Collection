import { Routes } from '@angular/router';
import { MangaListComponent } from './manga-list/manga-list';
import { MangaDetail } from './manga-detail/manga-detail';
import { VolumeDetail } from './volume-detail/volume-detail';
import { MangaForm } from './manga-form/manga-form';
import { VolumeForm } from './volume-form/volume-form';
import { MangaEdit } from './manga-edit/manga-edit';
import { VolumeEdit } from './volume-edit/volume-edit';

export const routes: Routes = [
  { path: '', component: MangaListComponent },
  { path: 'manga/:id', component: MangaDetail },
  { path: 'volume/:id', component: VolumeDetail },
  { path: 'manga', component: MangaForm },
  { path: 'manga/:id/volume', component: VolumeForm },
  { path: 'volume/edit/:id', component: VolumeEdit },
  { path: 'manga/edit/:id', component: MangaEdit }
];
