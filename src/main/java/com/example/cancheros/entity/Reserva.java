package com.example.cancheros.entity;

import java.time.LocalDateTime;
import java.util.Date;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name="reserva")

public class Reserva {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long idReserva;

    @Column(name="fecha_hora_inicio")
    private LocalDateTime fechaYHoraInicio;

    @Column(name="fecha_hora_fin")
    private LocalDateTime fechaYHoraFin;

    //Muchas reservas tienen un producto.
    @ManyToOne
    @JoinColumn(name = "idProducto")
    private Producto producto;

    //Muchas reservas tienen un usuario.
    @ManyToOne
    @JoinColumn(name = "idUsuario")
    private MyUser usuario;



}
