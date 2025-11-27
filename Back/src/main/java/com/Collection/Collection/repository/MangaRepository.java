package com.Collection.Collection.repository;

import com.Collection.Collection.model.Manga;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface MangaRepository extends JpaRepository<Manga, Long> {
    List<Manga> findAllByOrderByNameAsc();
    Optional<Manga> findByName(String name);
}
