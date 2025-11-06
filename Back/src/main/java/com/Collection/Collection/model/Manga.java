package com.Collection.Collection.model;

import jakarta.persistence.*;

@Entity
public class Manga {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    //Le nom de la série
    private String name;

    //Le nombre de volume présent dans la série
    private Long volumeNb;

    //Le statue de la série 
    @Enumerated(EnumType.STRING)
    private Statut statut;

    //Le mangaka
    private String author;

    //GETTER
    public Long getId() {
        return this.id;
    }

    public String getName() {
        return this.name;
    }

    public Long getVolumeNb() {
        return this.volumeNb;
    }

    public Statut getStatut() {
        return this.statut;
    }

    public String getAuthor() {
        return this.author;
    }
    
    //SETTER
    public void setId(Long newId) {
        this.id = newId;
    }

    public void setName(String newName) {
        this.name = newName;
    }

    public void setVolumeNb(Long newVolumeNb) {
        this.volumeNb = newVolumeNb;
    }

    public void setStatut(Statut newStatut) {
        this.statut = newStatut;
    }

    public void setAuthor(String newAuthor) {
        this.author = newAuthor;
    }


}