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

    @Lob //Anotacion para campos grandes (hasta 4GB)
    @Column(name = "Imagen", nullable = false, columnDefinition = "LONGTEXT")
    private String imagen;

    @ManyToOne //Muchos productos pueden tener la misma categoria
    @JoinColumn (name="id_categoria")
    private Categoria categoria;



}
