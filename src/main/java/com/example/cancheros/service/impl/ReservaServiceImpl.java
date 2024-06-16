package com.example.cancheros.service.impl;

import com.example.cancheros.entity.Reserva;
import com.example.cancheros.exceptions.InternalServerErrorException;
import com.example.cancheros.repository.IMyUserRepository;
import com.example.cancheros.repository.IProductoRepository;
import com.example.cancheros.repository.IReservaRepository;
import com.example.cancheros.service.IReservaService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ReservaServiceImpl implements IReservaService {
    private IReservaRepository reservaRepositorio;
    private IProductoRepository productoRepositorio;
    private IMyUserRepository usuarioRespositorio;

    private static final Logger LOGGER =  Logger.getLogger(ReservaServiceImpl.class);

    @Autowired
    ObjectMapper mapper;

    @Autowired
    public ReservaServiceImpl(IReservaRepository reservaRepositorio, IProductoRepository productoRepositorio,
                              IMyUserRepository usuarioRespositorio) {
        this.reservaRepositorio = reservaRepositorio;
        this.productoRepositorio = productoRepositorio;
        this.usuarioRespositorio = usuarioRespositorio;
    }

    @Override
    public void guardar(Reserva reserva) throws InternalServerErrorException {
        try {
            LOGGER.info("Guardando reserva con id: " + reserva.getIdReserva());
            reservaRepositorio.save(reserva);
            LOGGER.info("Reserva guardada con éxito.");
        } catch (Exception e){
            throw new InternalServerErrorException("Error al guardar la reserva");
        }
    }

    @Override
    public List<Reserva> listarTodos() {
        LOGGER.info("Listando todas las reservas");
        List<Reserva> reservas = reservaRepositorio.findAll();
        return reservas;
    }

    @Override
    public Reserva buscar(Long id) throws ResourceNotFoundException{
        LOGGER.info("Buscando reserva con el ID: " + id);
        Optional<Reserva> reserva = reservaRepositorio.findById(id);
        if (!reserva.isPresent()){
            throw new ResourceNotFoundException("No existe la reserva solicitada: " + id);
        }
        LOGGER.info("Reserva encontrada.");
        return mapper.convertValue(reserva, Reserva.class);
    }

    @Override
    public void eliminar(Long id) throws ResourceNotFoundException {
        LOGGER.info("Eliminando la reserva: " + id);
        if (buscar(id) == null){
            throw new ResourceNotFoundException("No existe la reserva que intenta eliminar: " + id);
        }
        reservaRepositorio.deleteById(id);
        LOGGER.info("Reserva eliminada con éxito: " + id);
    }

    @Override
    public void actualizar(Reserva reserva) throws ResourceNotFoundException{
        LOGGER.info("Actualizando la reserva con id: " + reserva.getIdReserva());
        if (!reservaRepositorio.findById(reserva.getIdReserva()).isPresent()) {
            throw new ResourceNotFoundException("No existe la reserva solicitada: " + reserva.getIdReserva());
        }
        Reserva reservaExistente = reservaRepositorio.findById(reserva.getIdReserva()).get();

        reservaExistente.setFechaYHoraInicio(reservaExistente.getFechaYHoraInicio());
        reservaExistente.setFechaYHoraFin(reservaExistente.getFechaYHoraFin());

        if (productoRepositorio.findById(reserva.getProducto().getIdProducto()) == null) {
            throw new ResourceNotFoundException(
                    "No existe el producto con ID: " + reserva.getProducto().getIdProducto());
        }

        if (usuarioRespositorio.findById(reserva.getUsuario().getId()) == null) {
            throw new ResourceNotFoundException(
                    "No existe el usuario con ID: " + reserva.getUsuario().getId());
        }
        reservaExistente.setProducto(productoRepositorio.findById(reserva.getProducto().getIdProducto()).get());
        reservaExistente.setUsuario(usuarioRespositorio.findById(reserva.getUsuario().getId()).get());

        reservaRepositorio.save(reservaExistente);

        LOGGER.info("Reserva actualizada con éxito.");

    }
}
