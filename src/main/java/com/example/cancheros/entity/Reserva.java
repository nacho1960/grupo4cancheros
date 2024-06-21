package com.example.cancheros.entity;

import java.time.LocalDate;
import java.time.LocalTime;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name="reserva")

public class Reserva {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long idReserva;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd/MM/yyyy")
    @Column(name = "Fecha")
    private LocalDate fecha;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "HH:mm")
    @Column(name = "Hora")
    private LocalTime hora;

    //Muchas reservas tienen un producto.
    @ManyToOne
    @JoinColumn(name = "idProducto")
    private Producto producto;

    //Muchas reservas tienen un usuario.
    @ManyToOne
    @JoinColumn(name = "idUsuario")
    private MyUser usuario;



}
