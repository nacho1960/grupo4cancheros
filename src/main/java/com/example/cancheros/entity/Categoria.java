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
@Table( name = "Categoria")

public class Categoria {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long idCategoria;

    @Column(name = "Nombre", nullable = false)
    private  String nombre ;

    @Column(name = "Descripcion", nullable = false)
    private  String descripcion;

    @Column(name = "Precio", nullable = false)
    private Double precioHora;

}
