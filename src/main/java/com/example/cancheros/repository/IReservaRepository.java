package com.example.cancheros.repository;

import com.example.cancheros.entity.Reserva;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;


import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;

public interface IReservaRepository extends JpaRepository<Reserva, Long> {
    @Query("SELECT r FROM Reserva r WHERE r.fecha = :fecha AND r.hora = :hora")
    List<Reserva> buscarReservasPorFechaYHora(@Param("fecha") LocalDate fecha, @Param("hora") LocalTime hora);
}

