package com.example.cancheros.service.impl;

import com.example.cancheros.entity.Reserva;
import com.example.cancheros.exceptions.InternalServerErrorException;
import com.example.cancheros.repository.IReservaRepository;
import com.example.cancheros.service.IReservaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReservaServiceImpl implements IReservaService {

    @Autowired
    private IReservaRepository reservaRepository;

    @Override
    public ResponseEntity<Reserva> guardar(Reserva reserva) throws InternalServerErrorException {
        try {
            Reserva savedReserva = reservaRepository.save(reserva);
            return ResponseEntity.ok(savedReserva);
        } catch (Exception e) {
            throw new InternalServerErrorException("Error al guardar la reserva");
        }
    }

    @Override
    public List<Reserva> listarTodos() {
        return reservaRepository.findAll();
    }

    @Override
    public Reserva buscar(Long id) {
        return reservaRepository.findById(id).orElse(null);
    }

    @Override
    public void eliminar(Long id) {
        reservaRepository.deleteById(id);
    }

    @Override
    public void actualizar(Reserva reserva) {
        reservaRepository.save(reserva);
    }

    @Override
    public List<Reserva> listarReservasPorUsuario(Long idUsuario) {
        return reservaRepository.findByUsuarioId(idUsuario);
    }
}



