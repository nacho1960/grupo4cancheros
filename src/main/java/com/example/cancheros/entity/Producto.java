package com.example.cancheros.entity;

import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.Lob;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.Data;


@Entity
@Data
@Table(name="Producto")

public class Producto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long idProducto;

    @Column(name = "Nombre", nullable = false)
    private String nombreProducto;

    @Column(name = "Descripcíon", nullable = false)
    private String descripcion;

    @Lob //Anotacion para campos grandes (hasta 4GB)
    @Column(name = "Imagen", nullable = false, columnDefinition = "LONGTEXT")
    private String imagen;

    @ManyToOne //Muchos productos pueden tener la misma categoria
    @JoinColumn (name="id_categoria")
    private Categoria categoria;

    @ManyToMany //relación de muchos a muchos entre Producto y Caracteristica
    @JoinTable(
        name = "producto_caracteristica",
        joinColumns = @JoinColumn(name = "id_producto"),
        inverseJoinColumns = @JoinColumn(name = "id_caracteristica"))
    private List<Caracteristica> caracteristicas;

    @Column(name = "Precio", nullable = false)
    private Double precioHora;

   }

