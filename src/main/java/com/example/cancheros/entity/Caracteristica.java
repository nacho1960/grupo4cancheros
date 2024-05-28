package com.example.cancheros.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;


@Data
@Entity
@Table( name = "Caracteristica")

public class Caracteristica {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idCaracteristica;

    @Column(name = "Nombre", nullable = false)
    private String nombre;

    @Column(name = "Imagen", nullable = false, columnDefinition = "LONGTEXT")
    private String imagen;

}
