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
    @Column(name = "FechaInicio")
    private LocalDate fechaInicio;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "dd/MM/yyyy")
    @Column(name = "FechaFin")
    private LocalDate fechaFin;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "HH:mm")
    @Column(name = "HoraInicio")
    private LocalTime horaInicio;

    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "HH:mm")
    @Column(name = "HoraFin")
    private LocalTime horaFin;

    //Muchas reservas tienen un producto.
    @ManyToOne
    @JoinColumn(name = "idProducto")
    private Producto producto;

    //Muchas reservas tienen un usuario.
    @ManyToOne
    @JoinColumn(name = "idUsuario")
    private MyUser usuario;



}
