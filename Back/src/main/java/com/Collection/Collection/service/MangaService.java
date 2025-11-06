package com.Collection.Collection.service;

import com.Collection.Collection.model.Manga;
import com.Collection.Collection.repository.MangaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MangaService {

    @Autowired
    private MangaRepository mangaRepository;

    // Récupérer tous les mangas
    public List<Manga> getAllMangas() {
        return mangaRepository.findAllByOrderByNameAsc();
    }

    // Récupérer un manga par ID
    public Optional<Manga> getMangaById(Long id) {
        return mangaRepository.findById(id);
    }

    // Ajouter ou modifier un manga
    @Transactional
    public Manga saveManga(Manga manga) {
        return mangaRepository.save(manga);
    }

    // Supprimer un manga
    public void deleteManga(Long id) {
        mangaRepository.deleteById(id);
    }
}
