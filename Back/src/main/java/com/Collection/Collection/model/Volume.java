package com.Collection.Collection.model;

import jakarta.persistence.*;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

@Entity
@JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
public class Volume {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JoinColumn(name = "id_manga", nullable = false )
    private Long mangaId;

    private int numero;

    private String imgPath;

    @Column(length = 10000)
    private String resume;


    private boolean collector;

    // Jaquette alternative
    private boolean jaqAlt;

    //GETTER
    public Long getId() {
        return this.id;
    }

    public Long getMangaId() {
        return this.mangaId;
    }

    public int getNumero() {
        return this.numero;
    }

    public String getImgPath() {
        return this.imgPath;
    }

    public String getResume() {
        return this.resume;
    }

    public boolean getCollector() {
        return this.collector;
    }

    public boolean getJaqAlt() {
        return this.jaqAlt;
    }

    //SETTER 
    public void setId(Long newId) {
        this.id = newId;
    }

    public void setMangaId(Long newMangaId) { 
        this.mangaId = newMangaId;        
    }

    public void setNumero(int newNumero) {
        this.numero = newNumero;        
    }

    public void setImgPath(String newImgPath) {
        this.imgPath = newImgPath;        
    }

    public void setResume(String newResume) {
        this.resume = newResume;        
    }

    public void setCollector(boolean newCollector) {
        this.collector = newCollector;
    }

    public void setJaqAlt(boolean newJaqAlt) {
        this.jaqAlt = newJaqAlt;
    } 


}