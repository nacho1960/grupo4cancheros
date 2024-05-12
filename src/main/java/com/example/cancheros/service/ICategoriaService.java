package com.example.cancheros.service;

import com.example.cancheros.entity.Categoria;

import java.util.List;

public interface ICategoriaService {
    void guardar (Categoria Categoria) throws Exception;
    List<Categoria> listarTodos();

}
