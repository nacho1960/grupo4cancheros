package com.example.cancheros.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.cancheros.entity.Caracteristica;
import com.example.cancheros.service.ICaracteristicaService;


@RestController
@RequestMapping("/caracteristicas")
public class CaracteristicaController {
    private final ICaracteristicaService caracteristicaService;

    @Autowired
    // inyecta el servicio de características
    public CaracteristicaController(ICaracteristicaService caracteristicaService) {
        this.caracteristicaService = caracteristicaService;
    }

    @PostMapping
    // crea una nueva característica
    public Caracteristica create(@RequestBody Caracteristica caracteristica) {
        return caracteristicaService.save(caracteristica);
    }

    @GetMapping
    // devuelve todas las características
    public List<Caracteristica> getAll() {
        return caracteristicaService.findAll();
    }

    @GetMapping("/{id}")
    // devuelve una característica específica basada en su ID
    public Caracteristica getById(@PathVariable Long id) {
        return caracteristicaService.findById(id); //.orElse(null);
    }

    @PutMapping("/{id}")
    // actualiza una característica específica basada en su ID
    public Caracteristica update(@PathVariable Long id, @RequestBody Caracteristica caracteristica) {
        Optional<Caracteristica> optionalCaracteristica = Optional.ofNullable(caracteristicaService.findById(id));
        //Optional<Caracteristica> optionalCaracteristica = caracteristicaService.findById(id);
        if (optionalCaracteristica.isPresent()) {
            Caracteristica existingCaracteristica = optionalCaracteristica.get();
            BeanUtils.copyProperties(caracteristica, existingCaracteristica, "id");
            return caracteristicaService.save(existingCaracteristica);
        } else {
            // handle the case when the Caracteristica with the given ID does not exist
            throw new RuntimeException("Caracteristica not found with ID: " + id);
        }
    }
}

