package com.Collection.Collection.controller;

import com.Collection.Collection.model.Volume;
import com.Collection.Collection.service.VolumeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

import java.io.*;
import java.nio.file.*;


@RestController
@RequestMapping
@CrossOrigin(origins = "http://localhost:4200")
public class VolumeController {

    @Autowired
    private VolumeService volumeService;

    // Récupérer tous les volumes d’un manga
    @GetMapping("/manga/{mangaId}/volumes")
    public List<Volume> getAllVolumesByManga(@PathVariable Long mangaId) {
        return volumeService.getAllVolumesByMangaId(mangaId);
    }

    @GetMapping("/manga/{mangaId}/volumeNumber/{Number}/collector/{collect}")
    public ResponseEntity<Volume> getVolumeByMangaIdAndByNumeroAndByCollector(@PathVariable Long mangaId, @PathVariable Long Number, @PathVariable Boolean collect) {
        Optional<Volume> volume = volumeService.getVolumeByMangaIdAndByNumeroAndByCollector(mangaId, Number, collect);
        return volume.map(ResponseEntity::ok).orElseGet(() -> ResponseEntity.notFound().build());
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
    public Volume createVolume(@PathVariable Long mangaId, @RequestBody Volume volume) {
        return volumeService.saveVolumeForManga(mangaId, volume);
    }

    // Modifier un volume
    @PutMapping("/volume/{id}")
    public ResponseEntity<Volume> updateVolume(@PathVariable Long id, @RequestBody Volume updatedVolume) {
        Optional<Volume> existingVolume = volumeService.getVolumeById(id);
        if (existingVolume.isPresent()) {
            updatedVolume.setId(id);
            return ResponseEntity.ok(volumeService.saveVolume(updatedVolume));
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

    @PostMapping("/upload")
    public ResponseEntity<String> uploadImage(@RequestParam("file") MultipartFile file) {
        try {
            if (file.isEmpty()) {
                return ResponseEntity.badRequest().body("Fichier vide");
            }

            // Nom du fichier
            String fileName = file.getOriginalFilename();

            // Dossier où sauvegarder
            String uploadDir = "img/";

            // Créer le dossier s’il n’existe pas
            File directory = new File(uploadDir);
            if (!directory.exists()) {
                directory.mkdirs();
            }

            // Sauvegarde du fichier
            Path filePath = Paths.get(uploadDir, fileName);
            Files.write(filePath, file.getBytes());

            // Retour du chemin à stocker en BDD
            String dbPath = "img/" + fileName;
            return ResponseEntity.ok(dbPath);

        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body("Erreur lors de l'upload");
        }
    }

}

