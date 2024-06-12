package com.example.cancheros.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Data;


@Entity
@Data
@Table(name = "usuarios")
public class MyUser {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column
    private String nombre;

    @Column
    private String apellido;

    @Column
    private String email;

    @Column
    private String password;

    @Column
    private UsuarioRole usuarioRole; //Clase tipo enum, que le dará el rol al usuario.


    public MyUser(String nombre, String apellido, String email, String password, UsuarioRole usuarioRole) {
        this.nombre = nombre;
        this.apellido = apellido;
        this.email = email;
        this.password = password;
        this.usuarioRole = usuarioRole;
    }

    public MyUser() {
    }

    public String getEmail() {
        return email;
    }

    public String getNombre() {
            return nombre;
        }

}
