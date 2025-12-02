package com.Collection.Collection.controller;

import com.Collection.Collection.model.Volume;
import com.Collection.Collection.service.VolumeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;

import java.util.List;
import java.util.Optional;
import java.util.Map;

import java.io.*;
import java.nio.file.*;


@RestController
@RequestMapping
@CrossOrigin(origins = "http://localhost:4200")
public class VolumeController {

    @Autowired
    private VolumeService volumeService;

    @Autowired
    private Cloudinary cloudinary;

    // Récupérer tous les volumes d’un manga
    @GetMapping("/manga/{mangaId}/volumes")
    public List<Volume> getAllVolumesByManga(@PathVariable Long mangaId) {
        return volumeService.getAllVolumesByMangaId(mangaId);
    }

    // Récupérer un volume précis par son ID
    @GetMapping("/volume/{id}")
    public ResponseEntity<Volume> getVolumeById(@PathVariable Long id) {
        Optional<Volume> volume = volumeService.getVolumeById(id);
        return volume.map(ResponseEntity::ok)
                     .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Ajouter un nouveau volume pour un manga spécifique
    @PostMapping("/manga/{mangaId}/volumes")
    public ResponseEntity<Volume> createVolume(
            @PathVariable Long mangaId,
            @RequestPart("volume") Volume volume,
            @RequestPart(value = "image", required = false) MultipartFile imageFile) throws Exception {

        Volume savedVolume = volumeService.saveVolume(mangaId, volume, imageFile, false);
        return ResponseEntity.ok(savedVolume);
    }

    // Modifier un volume (avec image optionnelle)
    @PutMapping("/volume/{id}")
    public ResponseEntity<Volume> updateVolume(
            @PathVariable Long id,
            @RequestPart("volume") Volume updatedVolume,
            @RequestPart(value = "image", required = false) MultipartFile imageFile,
            @RequestParam(value = "deleteImage", defaultValue = "false") boolean deleteImage) throws Exception {

        Optional<Volume> existingVolume = volumeService.getVolumeById(id);
        if (existingVolume.isPresent()) {
            updatedVolume.setId(id);
            Volume savedVolume = volumeService.saveVolume(updatedVolume.getMangaId(), updatedVolume, imageFile, deleteImage);
            return ResponseEntity.ok(savedVolume);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

   // Supprimer un volume
    @DeleteMapping("/volume/{id}")
    public ResponseEntity<Void> deleteVolume(@PathVariable Long id) {
        Optional<Volume> existingVolume = volumeService.getVolumeById(id);
        if (existingVolume.isPresent()) {
            volumeService.deleteVolume(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/volumes/first/{mangaId}")
    public ResponseEntity<Volume> getFirstVolume(@PathVariable Long mangaId) {
        Optional<Volume> firstVolume = volumeService.getFirstVolume(mangaId);
        return firstVolume.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping("/manga/{mangaId}/volumes/total")
    public ResponseEntity<Long> getNumberOfVolumes(@PathVariable Long mangaId) {
        Long total = volumeService.getNumberOfManga(mangaId);
        return ResponseEntity.ok(total);
    }

    // Upload indépendant d’une image (retourne URL Cloudinary)
    @PostMapping("/upload")
    public ResponseEntity<String> uploadImage(@RequestParam("file") MultipartFile file) {
        try {
            if (file.isEmpty()) {
                return ResponseEntity.badRequest().body("Fichier vide");
            }
            String imageUrl = volumeService.uploadImageToCloudinary(file);
            return ResponseEntity.ok(imageUrl);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body("Erreur lors de l'upload sur Cloudinary");
        }
    }
}

