package com.Collection.Collection.service;

import com.Collection.Collection.model.Volume;
import com.Collection.Collection.repository.VolumeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class VolumeService {

    @Autowired
    private VolumeRepository volumeRepository;

    public List<Volume> getAllVolumesByMangaId(Long mangaId) {
        return volumeRepository.findByMangaIdOrderByNumeroAsc(mangaId);
    }

    public Optional<Volume> getVolumeById(Long id) {
        return volumeRepository.findById(id);
    }

    public Volume saveVolumeForManga(Long mangaId, Volume volume) {
        volume.setMangaId(mangaId);
        return volumeRepository.save(volume);
    }

    public Volume saveVolume(Volume volume) {
        return volumeRepository.save(volume);
    }

    public void deleteVolume(Long id) {
        volumeRepository.deleteById(id);
    }

    public void deleteAll(List<Volume> volumes) {
        for (Volume volume: volumes) {
            deleteVolume(volume.getId());
        }
    }

    public Optional<Volume> getFirstVolume(Long mangaId) {
        return volumeRepository.findFirstByMangaIdOrderByNumeroAsc(mangaId);
    }

    public Long getNumberOfManga(Long mangaId) {
        return volumeRepository.countDistinctByMangaId(mangaId);
    }

    public Optional<Volume> getVolumeByMangaIdAndByNumeroAndByCollector(Long mangaId, Long Numero, Boolean collector) {
        return volumeRepository.findByMangaIdAndNumeroAndCollector(mangaId, Numero, collector);
    }
}
