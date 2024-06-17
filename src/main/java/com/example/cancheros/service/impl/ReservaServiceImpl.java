package com.example.cancheros.service.impl;

import com.example.cancheros.entity.MyUser;
import com.example.cancheros.entity.Producto;
import com.example.cancheros.entity.Reserva;
import com.example.cancheros.exceptions.InternalServerErrorException;
import com.example.cancheros.repository.IMyUserRepository;
import com.example.cancheros.repository.IProductoRepository;
import com.example.cancheros.repository.IReservaRepository;
import com.example.cancheros.service.IReservaService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;


@Service
public class ReservaServiceImpl implements IReservaService {
    private IReservaRepository reservaRepositorio;
    private IProductoRepository productoRepositorio;
    private IMyUserRepository usuarioRespositorio;

    private static final Logger LOGGER = Logger.getLogger(ReservaServiceImpl.class);

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
    public ResponseEntity<Reserva> guardar(@RequestBody Reserva reserva) throws InternalServerErrorException {
        try {
            LOGGER.info("Guardando reserva con id: " + reserva.getIdReserva());

            reservaRepositorio.save(reserva);
            LOGGER.info("Reserva guardada con éxito.");
            return ResponseEntity.ok(reserva);
        } catch (Exception e) {
            LOGGER.error("Error al guardar la reserva: ", e);
            throw new InternalServerErrorException("Error al guardar la reserva");
        }
    }

    @Override
    public List<Reserva> listarTodos() {
        LOGGER.info("Listando todas las reservas");
        return reservaRepositorio.findAll();
    }

    @Override
    public Reserva buscar(Long id) throws ResourceNotFoundException {
        LOGGER.info("Buscando reserva con el ID: " + id);
        return reservaRepositorio.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("No existe la reserva solicitada: " + id));
    }

    @Override
    public void eliminar(Long id) throws ResourceNotFoundException {
        LOGGER.info("Eliminando la reserva: " + id);
        Reserva reserva = buscar(id);
        reservaRepositorio.delete(reserva);
        LOGGER.info("Reserva eliminada con éxito: " + id);
    }

    @Override
    public void actualizar(Reserva reserva) throws ResourceNotFoundException {
        LOGGER.info("Actualizando la reserva con id: " + reserva.getIdReserva());
        Reserva reservaExistente = reservaRepositorio.findById(reserva.getIdReserva())
                .orElseThrow(() -> new ResourceNotFoundException("No existe la reserva solicitada: " + reserva.getIdReserva()));

        reservaExistente.setFechaInicio(reserva.getFechaInicio());
        reservaExistente.setFechaFin(reserva.getFechaFin());
        reservaExistente.setHoraInicio(reserva.getHoraInicio());
        reservaExistente.setHoraFin(reserva.getHoraFin());

        Producto producto = productoRepositorio.findById(reserva.getProducto().getIdProducto())
                .orElseThrow(() -> new ResourceNotFoundException("No existe el producto con ID: " + reserva.getProducto().getIdProducto()));
        MyUser usuario = usuarioRespositorio.findById(reserva.getUsuario().getId())
                .orElseThrow(() -> new ResourceNotFoundException("No existe el usuario con ID: " + reserva.getUsuario().getId()));

        reservaExistente.setProducto(producto);
        reservaExistente.setUsuario(usuario);

        reservaRepositorio.save(reservaExistente);
        LOGGER.info("Reserva actualizada con éxito.");
    }
}

