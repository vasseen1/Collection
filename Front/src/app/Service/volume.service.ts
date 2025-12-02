import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


export interface Volume {
  id: number;
  mangaId: number;
  numero: number;
  imgPath: string;
  resume: string;
  collector: boolean;
  jaqAlt: boolean;
}

@Injectable({
  providedIn: 'root'
})

export class VolumeService {

  private baseUrl = 'http://localhost:8080';

  constructor(private http: HttpClient) {}

  
  
  getVolumesByManga(mangaId: number): Observable<Volume[]> {
    return this.http.get<Volume[]>(`${this.baseUrl}/manga/${mangaId}/volumes`);
  }

  getVolumeById(volumeId: number): Observable<Volume> {
    return this.http.get<Volume>(`${this.baseUrl}/volume/${volumeId}`)
  }

  deleteVolume(volumeId: number) {
    return this.http.delete(`${this.baseUrl}/volume/${volumeId}`)
  }

  updateVolume(volumeId: number, volume: Volume): Observable<Volume> {
    return this.http.put<Volume>(`${this.baseUrl}/volume/${volumeId}`,volume);
  }

  uploadImage(formData: FormData): Observable<string> {
    return this.http.post(`${this.baseUrl}/upload`, formData, { responseType: 'text' });
  }

  createVolumeWithImage(formData: FormData, mangaId: number): Observable<Volume> {
    return this.http.post<Volume>(`${this.baseUrl}/manga/${mangaId}/volumes`, formData);
  }

  updateVolumeWithImage(formData: FormData, volume: Volume, deleteImage: boolean): Observable<Volume> {
    return this.http.put<Volume>(`${this.baseUrl}/volume/${volume.id}?deleteImage=${deleteImage}`, formData);
  }

}
