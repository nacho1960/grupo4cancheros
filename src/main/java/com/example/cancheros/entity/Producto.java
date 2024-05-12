package com.example.cancheros.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name="producto")

public class Producto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long idProducto;
    private String nombreProducto;
    private String rutaImagenProducto;

}
