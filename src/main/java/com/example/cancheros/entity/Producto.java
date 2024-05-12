package com.example.cancheros.entity;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Entity
@Data
@Table(name="Producto")

public class Producto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long idProducto;

    @Column(name = "Nombre", nullable = false)
    private String nombreProducto;

    @Column(name = "Imagen", nullable = false)
    private String rutaImagenProducto;
    @OneToOne
    @JoinColumn (name="id_categoria", referencedColumnName="idCategoria", nullable = false)

    private Categoria categoria;



}
