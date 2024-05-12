package com.example.cancheros.controller;

import com.example.cancheros.entity.Producto;
import com.example.cancheros.service.impl.ProductoServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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
    public ResponseEntity<?> guardar(@RequestBody Producto producto)throws Exception {
        productoService.guardar(producto);

        return ResponseEntity.ok(HttpStatus.OK);
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
        return ResponseEntity.ok(HttpStatus.OK);
    }

}

