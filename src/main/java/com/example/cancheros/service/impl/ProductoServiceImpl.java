package com.example.cancheros.service.impl;

import com.example.cancheros.entity.Producto;
import com.example.cancheros.repository.IProductoRepository;
import com.example.cancheros.service.IProductoService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
    public void guardar(Producto producto) {
        try {
            LOGGER.info("Guardando producto con id: " + producto.getIdProducto());
            repository.save(producto);
            LOGGER.info("Producto guardado con éxito.");
        } catch (Exception e) {
            LOGGER.error(e);
        }
    }

    @Override
    public List<Producto> listarTodos() {
        LOGGER.info("Listando todos los productos.");
        List<Producto> productos = repository.findAllProductoOrdered();
        return productos;
    }

    @Override
    public Producto buscar(Long id) throws Exception {
        LOGGER.info("Buscando Producto con el ID: " + id);
        Optional<Producto> producto = repository.findById(id);
        if (!producto.isPresent()){
            throw new Exception("No existe el producto solicitado: " + id);
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

}
