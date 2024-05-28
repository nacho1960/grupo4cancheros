package com.example.cancheros.service;

import com.example.cancheros.entity.Producto;
import com.example.cancheros.exceptions.ResourceNotFoundException;

import java.util.List;

public interface IProductoService {
    void guardar (Producto producto)throws Exception;
    List<Producto> listarTodos();
    Producto buscar(Long id) throws ResourceNotFoundException ;
    void eliminar (Long id);
    void actualizar (Producto producto) throws ResourceNotFoundException;
}
