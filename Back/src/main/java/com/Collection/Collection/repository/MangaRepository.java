package com.Collection.Collection.repository;

import com.Collection.Collection.model.Manga;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface MangaRepository extends JpaRepository<Manga, Long> {
    List<Manga> findAllByOrderByNameAsc();
}
