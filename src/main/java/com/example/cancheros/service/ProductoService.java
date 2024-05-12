package com.example.cancheros.service;


import com.example.cancheros.entity.Producto;
import com.example.cancheros.repository.ProductoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProductoService {
    @Autowired
    ProductoRepository productoRepository;
    public List<Producto> getProductos(){
        return productoRepository.findAll();
    }//retorna todos los productos
    public Optional<Producto> getProducto(Long id){
        return productoRepository.findById(id);
    }//chequear lo del optional
    public void saveOrUpdate(Producto producto){
        productoRepository.save(producto);
    }
    public void delete(Long id){
        productoRepository.deleteById(id);
    }



}
