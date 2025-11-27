package com.Collection.Collection.controller;

import com.Collection.Collection.model.Manga;
import com.Collection.Collection.model.Volume;
import com.Collection.Collection.service.MangaService;
import com.Collection.Collection.service.VolumeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/manga")
@CrossOrigin(origins = "http://localhost:4200") 
public class MangaController {

    @Autowired
    private MangaService mangaService;

    @Autowired
    private VolumeService volumeService;

    // Récupérer tous les mangas
    @GetMapping
    public List<Manga> getAllMangas() {
        return mangaService.getAllMangas();
    }

    // Récupérer un manga par son nom
    @GetMapping("/name/{name}")
    public ResponseEntity<Manga> getMangaByName(@PathVariable String name) {
        Optional<Manga> manga = mangaService.getMangaByName(name);
        return manga.map(ResponseEntity::ok)
                    .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Récupérer un manga par ID
    @GetMapping("/{id}")
    public ResponseEntity<Manga> getMangaById(@PathVariable Long id) {
        Optional<Manga> manga = mangaService.getMangaById(id);
        return manga.map(ResponseEntity::ok)
                    .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Ajouter un nouveau manga
    @PostMapping
    public Manga createManga(@RequestBody Manga manga) {
        return mangaService.saveManga(manga);
    }

    // Modifier un manga existant
    @PutMapping("/{id}")
    public ResponseEntity<Manga> updateManga(@PathVariable Long id, @RequestBody Manga updatedManga) {
        Optional<Manga> existingManga = mangaService.getMangaById(id);
        if (existingManga.isPresent()) {
            updatedManga.setId(id);
            return ResponseEntity.ok(mangaService.saveManga(updatedManga));
        } else {
            return ResponseEntity.notFound().build();
        }
    }



    // Supprimer un manga
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteManga(@PathVariable Long id) {
        Optional<Manga> existingManga = mangaService.getMangaById(id);
        if (existingManga.isPresent()) {
            List<Volume> volumes = volumeService.getAllVolumesByMangaId(id);
            volumeService.deleteAll(volumes);
            mangaService.deleteManga(id);
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}
