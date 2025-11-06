package com.Collection.Collection.repository;

import com.Collection.Collection.model.Volume;

import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;


@Repository
public interface VolumeRepository extends JpaRepository<Volume, Long> {
    List<Volume> findByMangaIdOrderByNumeroAsc(Long mangaId);
    Volume findFirstByMangaIdOrderByNumeroAsc(Long mangaId);

    @Query("SELECT COUNT(DISTINCT v.numero) FROM Volume v WHERE v.mangaId = :mangaId")
    Long countDistinctByMangaId(@Param("mangaId") Long mangaId);
}
