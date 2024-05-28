package com.example.cancheros.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.cancheros.entity.Caracteristica;
import com.example.cancheros.service.impl.CaracteristicaServiceImpl;


@RestController
@RequestMapping("/caracteristicas")
public class CaracteristicaController {
    private final CaracteristicaServiceImpl caracteristicaService;

    @Autowired
    // inyecta el servicio de características
    public CaracteristicaController(CaracteristicaServiceImpl caracteristicaService) {
        this.caracteristicaService = caracteristicaService;
    }

    @PostMapping("/new")
    // crea una nueva característica
    public Caracteristica create(@RequestBody Caracteristica caracteristica) {
        return caracteristicaService.save(caracteristica);
    }

    @GetMapping("/all")
    // devuelve todas las características
    public List<Caracteristica> getAll() {
        return caracteristicaService.findAll();
    }

    @GetMapping("/{id}")
    // devuelve una característica específica basada en su ID
    public Optional<Caracteristica> getById(@PathVariable Long id) {
        return caracteristicaService.findById(id);
    }

    @DeleteMapping("/{id}")
    // elimina una característica específica basada en su ID
    public ResponseEntity<?> eliminar(@PathVariable Long id) {
        caracteristicaService.deleteById(id);
        return ResponseEntity.ok(HttpStatus.NO_CONTENT);
    }

    @PutMapping("/update")
    public ResponseEntity<?> actualizar(@RequestBody Caracteristica caracteristica) {
        caracteristicaService.actualizar(caracteristica);
        return ResponseEntity.ok(HttpStatus.OK);
    }

    
}
