package com.Collection.Collection.service;

import com.Collection.Collection.model.Volume;
import com.Collection.Collection.repository.VolumeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;


import java.util.List;
import java.util.Optional;
import java.util.Map;

@Service
public class VolumeService {

    @Autowired
    private VolumeRepository volumeRepository;

    @Autowired
    private Cloudinary cloudinary;

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

    public Volume saveVolume(Long mangaId, Volume volume, MultipartFile imageFile, boolean deleteImage) throws Exception {
        if (deleteImage) {
            // Supprimer l'image actuelle de Cloudinary si imgPath existe
            if (volume.getImgPath() != null && !volume.getImgPath().isEmpty()) {
                // Récupérer le public_id à partir de l'URL
                String publicId = volume.getImgPath().substring(volume.getImgPath().lastIndexOf('/') + 1, volume.getImgPath().lastIndexOf('.'));
                cloudinary.uploader().destroy(publicId, ObjectUtils.emptyMap());
                volume.setImgPath(null);
            }
        }

        if (imageFile != null && !imageFile.isEmpty()) {
            Map uploadResult = cloudinary.uploader().upload(imageFile.getBytes(), ObjectUtils.emptyMap());
            String imageUrl = uploadResult.get("secure_url").toString();
            volume.setImgPath(imageUrl);
        }

        volume.setMangaId(mangaId);
        return volumeRepository.save(volume);
    }


    public void deleteVolume(Long id) {
        Optional<Volume> volume = volumeRepository.findById(id);
        
        if (volume.isPresent()) {
            Volume v = volume.get();

            if (v.getImgPath() != null && !v.getImgPath().isEmpty()) {
                try {
                    // Récupérer le public_id depuis l'URL
                    String publicId = v.getImgPath().substring(
                            v.getImgPath().lastIndexOf('/') + 1,
                            v.getImgPath().lastIndexOf('.')
                    );

                    cloudinary.uploader().destroy(publicId, ObjectUtils.emptyMap());
                    v.setImgPath(null);

                } catch (IOException e) {
                    // Log propre pour éviter un crash silencieux
                    System.err.println("Erreur Cloudinary lors de la suppression de l'image : " + e.getMessage());
                }
            }
        }

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

    public String uploadImageToCloudinary(MultipartFile file) throws Exception {
        Map uploadResult = cloudinary.uploader().upload(file.getBytes(), ObjectUtils.emptyMap());
        return uploadResult.get("secure_url").toString();
    }

}
