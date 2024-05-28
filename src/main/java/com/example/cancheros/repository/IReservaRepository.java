package com.example.cancheros.repository;

import com.example.cancheros.entity.Reserva;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IReservaRepository extends JpaRepository<Reserva,Long> {
}
