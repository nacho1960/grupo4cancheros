package com.example.cancheros.controller;

import java.util.Collections;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
    public ResponseEntity<?> buscar(@PathVariable Long id) throws Exception {
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

}
