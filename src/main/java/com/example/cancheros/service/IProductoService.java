package com.example.cancheros.service;

import com.example.cancheros.entity.Producto;

import java.util.List;

public interface IProductoService {
    void guardar (Producto producto)throws Exception;
   List<Producto> listarTodos();
    Producto buscar(Long id) throws Exception ;
    void eliminar (Long id);
}
