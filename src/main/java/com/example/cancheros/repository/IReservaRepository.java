package com.example.cancheros.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.cancheros.entity.MyUser;
import com.example.cancheros.entity.Reserva;

public interface IReservaRepository extends JpaRepository<Reserva, Long> {

    List<Reserva> findByUsuario(MyUser usuario);
    List<Reserva> findByUsuarioId(Long idUsuario);

}
