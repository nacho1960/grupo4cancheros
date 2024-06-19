package com.example.cancheros.repository;

import com.example.cancheros.entity.Reserva;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List; 

public interface IReservaRepository extends JpaRepository<Reserva,Long> {
    List<Reserva> findByUsuarioId(Long idUsuario);
}
