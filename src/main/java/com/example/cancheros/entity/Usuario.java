package com.example.cancheros.entity;

import jakarta.persistence.*;
import lombok.Data;

@Data //SIRVE PARA MANEJAR GETTERYSETTER
@Entity/*Identificación de Entidades: Marca una clase Java como una entidad que se puede persistir en la base de datos.

Mapeo de Objetos a Tablas: Establece una correspondencia entre la clase Java y una tabla específica en la base de datos.

 Generación de SQL: Permite a Hibernate generar automáticamente las consultas SQL necesarias para almacenar, recuperar y actualizar entidades en la base de datos.

 Acceso a Datos Simplificado: Facilita el acceso a datos de la base de datos mediante interfaces de repositorio y métodos de Spring Data JPA.*/
@Table(name = "USER")
public class Usuario {
    @Id//marca como id al primer campo despues de la anotacion en este caso id pero podria llamarse distinto
   @GeneratedValue(strategy = GenerationType.IDENTITY)//genera  automaticamente los id en bd utilizando autincremento
    private Long idUsuario ;
    @Column( name = "nombre" , nullable = false)//unique significa
    private String nombre;
    @Column( name = "apellido", nullable = false)//el nullable en false significa que no se puede ingresar valores null otra forma de validacion de datos
    private String apellido;
    @Column(name = "email", unique = true , nullable = false)//el unique significa q solo podra haber un correo asi en la base es una forma de validacion
    private String email;
    private UserRole role;
}
