package com.Collection.Collection.model;

public enum Statut {
    EN_COURS("En cours"),
    TERMINE("Terminé"),
    ARRETE("Arrêté"),
    EN_ATTENTE("En attente");

    private final String label;

    Statut(String label) {
        this.label = label;
    }

    public String getLabel() {
        return label;
    }



}