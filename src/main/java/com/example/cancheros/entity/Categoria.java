package com.example.cancheros.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;
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
    private  String Descripcion;

    @Column(name = "Precio", nullable = false)
    private Double precioHora;

}
