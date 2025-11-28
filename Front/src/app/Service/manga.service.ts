import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { Volume } from './volume.service';

export interface Manga {
  id: number;
  name: string;
  volumeNb: number;
  statut: string;
  author: string;
  coverImg?: string;
  volumeCount: number;
}

@Injectable({
  providedIn: 'root'
})
export class MangaService {

  private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  getMangas(): Observable<Manga[]> {
    return this.http.get<Manga[]>(`${this.baseUrl}/manga`);
  }

  getNumberOfVolumes(mangaId: number): Observable<number> {
    return this.http.get<number>(`${this.baseUrl}/manga/${mangaId}/volumes/total`)
  }

  getMangaById(mangaId: number): Observable<Manga> {
    return this.http.get<Manga>(`${this.baseUrl}/manga/${mangaId}`);
  }

  getMangaByName(mangaName: string): Observable<Manga> {
    return this.http.get<Manga>(`${this.baseUrl}/manga/name/${mangaName}`);
  }

  deleteTome(mangaId: number) {
    return this.http.delete(`${this.baseUrl}/manga/${mangaId}`)
  }

  updateManga(mangaId: number, manga: Manga): Observable<Manga> {
    return this.http.put<Manga>(`${this.baseUrl}/manga/${mangaId}`,manga);
  }

  getFirstVolume(mangaId: number): Observable<Volume> {
    return this.http.get<Volume>(`${this.baseUrl}/volumes/first/${mangaId}`);
  }

  getFirstVolumeWithImage(mangaId: number) {
  return this.http.get<Volume[]>(`${this.baseUrl}/manga/${mangaId}/volumes`).pipe(
    map(volumes => volumes.find(v => v.imgPath)) // renvoie le premier volume qui a une image
  );
}


  createManga(manga: Manga): Observable<Manga> {
    return this.http.post<Manga>(`${this.baseUrl}/manga`, manga)
  }
}
