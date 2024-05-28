package com.example.cancheros.service;

import java.util.List;
import java.util.Optional;

import com.example.cancheros.entity.Caracteristica;

public interface ICaracteristicaService {
    Caracteristica save(Caracteristica caracteristica); // Guardar una caracteristica
    List<Caracteristica> findAll(); // Listar todas las caracteristicas
    Optional<Caracteristica> findById(Long id); // Buscar una caracteristica por id
    void deleteById(Long id); // Eliminar una caracteristica por id
    void update(Caracteristica caracteristica) throws RuntimeException; // Actualizar una caracteristica
}
