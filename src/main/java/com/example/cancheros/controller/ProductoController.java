package com.example.cancheros.controller;

import java.util.Collections;
import java.util.List;

import com.example.cancheros.exceptions.ResourceNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.cancheros.entity.Producto;
import com.example.cancheros.service.impl.ProductoServiceImpl;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/productos")
public class ProductoController {

    private ProductoServiceImpl productoService;

    @Autowired
    public ProductoController(ProductoServiceImpl productoService) {
        this.productoService = productoService;
    }

    @PostMapping("/new")
    public ResponseEntity<?> guardar(@RequestBody Producto producto) {
        try {
            System.out.println(producto);
            productoService.guardar(producto);
            return ResponseEntity.ok(HttpStatus.OK);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> buscar(@PathVariable Long id) throws ResourceNotFoundException {
        Producto producto = productoService.buscar(id);
        return new ResponseEntity<>(producto, HttpStatus.OK);
    }

    @GetMapping("/listarTodos")
    public List<Producto> listarTodos() {
        return productoService.listarTodos();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> eliminar(@PathVariable Long id) {
        productoService.eliminar(id);
        return ResponseEntity.ok(HttpStatus.NO_CONTENT);
    }

    @PutMapping("/update")
    public ResponseEntity<?> actualizar(@RequestBody Producto producto) throws ResourceNotFoundException {
        productoService.actualizar(producto);
        return ResponseEntity.ok(HttpStatus.OK);
    }

}
