package com.example.cancheros.service;

import com.example.cancheros.entity.Reserva;
import com.example.cancheros.exceptions.InternalServerErrorException;

import java.util.List;

public interface IReservaService {
    public void guardar(Reserva reserva) throws InternalServerErrorException;

    public List<Reserva> listarTodos();

    public Reserva buscar(Long id);

    public void eliminar(Long id);

    public void actualizar(Reserva reserva);
}
