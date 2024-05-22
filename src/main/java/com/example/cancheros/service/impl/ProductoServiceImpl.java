package com.example.cancheros.service.impl;

import com.example.cancheros.entity.Producto;
import com.example.cancheros.exceptions.ResourceNotFoundException;
import com.example.cancheros.repository.IProductoRepository;
import com.example.cancheros.service.IProductoService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@Service
public class ProductoServiceImpl implements IProductoService {
    private IProductoRepository repository;

    private static final Logger LOGGER =  Logger.getLogger(ProductoServiceImpl.class);

    @Autowired
    ObjectMapper mapper;

    @Autowired
    public ProductoServiceImpl(IProductoRepository repository) {
        this.repository = repository;
    }

    @Override
    public void guardar(Producto producto) throws Exception {
        try {
            List<Producto> productosExistentes = repository.findAll();
            for (Producto prod : productosExistentes) {
                if (prod.getNombreProducto().equals(producto.getNombreProducto())){
                    throw new Exception("Ya existe un producto con ese nombre: " + producto.getNombreProducto());
                }
            }
            repository.save(producto);
            LOGGER.info("Producto guardado con exito.");
        } catch (Exception e) {
            LOGGER.error(e);
            throw new Exception(e);
        }
    }

    @Override
    public List<Producto> listarTodos() {
        LOGGER.info("Listando todos los productos.");
        List<Producto> productos = repository.findAll();
        return productos;
    }

    @Override
    public Producto buscar(Long id) throws ResourceNotFoundException {
        LOGGER.info("Buscando Producto con el ID: " + id);
        Optional<Producto> producto = repository.findById(id);
        if (!producto.isPresent()){
            throw new ResourceNotFoundException("No existe el producto solicitado: " + id);
        }
        LOGGER.info("Producto encontrado.");
        return mapper.convertValue(producto, Producto.class);
    }

    @Override
    public void eliminar(Long id) {
        LOGGER.info("Eliminando producto: " + id);
        try {
            if (buscar(id) == null){
                throw new Exception("No existe el producto que intenta eliminar: " + id);
            }
        } catch (Exception e) {
            throw new RuntimeException(e);
        }
        repository.deleteById(id);
        LOGGER.info("Producto eliminado con éxito: " + id);
    }

    @Override
    public void actualizar(Producto producto) throws ResourceNotFoundException {
        LOGGER.info("Actualizando el producto con id: " + producto.getIdProducto());
        if (buscar(producto.getIdProducto()) == null){
            throw new ResourceNotFoundException("No existe el producto que intenta actualizar: " + producto.getIdProducto());
        }
        repository.save(producto);
        LOGGER.info("El producto fue actualizado con exito");
    }

}
