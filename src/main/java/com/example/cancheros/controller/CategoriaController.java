package com.example.cancheros.controller;

import com.example.cancheros.entity.Categoria;
import com.example.cancheros.service.impl.CategoriaServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/categorias")
public class CategoriaController {
    private CategoriaServiceImpl categoriaService;

    @Autowired
    public CategoriaController(CategoriaServiceImpl categoriaService) {
        this.categoriaService = categoriaService;
    }

    @PostMapping("/new")
    public ResponseEntity<?> guardar(@RequestBody Categoria categoria)  {
        try {
            categoriaService.guardar(categoria);
            return ResponseEntity.ok(HttpStatus.OK);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @GetMapping("/listarTodos")
    public List<Categoria> listarTodos() {
        return categoriaService.listarTodos();
    }

}
