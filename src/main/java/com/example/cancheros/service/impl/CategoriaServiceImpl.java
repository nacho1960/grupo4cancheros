package com.example.cancheros.service.impl;

import com.example.cancheros.entity.Categoria;
import com.example.cancheros.repository.ICategoriaRepository;
import com.example.cancheros.service.ICategoriaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.apache.log4j.Logger;
import java.util.List;

@Service
public class CategoriaServiceImpl implements ICategoriaService {

    private ICategoriaRepository repository;

    private static final Logger LOGGER = Logger.getLogger(CategoriaServiceImpl.class);

    @Autowired
    public CategoriaServiceImpl(ICategoriaRepository repository) {
        this.repository = repository;
    }

    @Override
    public void guardar(Categoria categoria) throws Exception{
        try {
            repository.save(categoria);
            LOGGER.info("Categoría guardado con éxito.");
        } catch (Exception e) {
            LOGGER.error(e);
            throw new Exception(e);
        }
    }

   @Override
    public List<Categoria> listarTodos() {
        LOGGER.info("Listando todas las categorías.");
        List<Categoria> categorias = repository.findAll();
        return categorias;
    }

}
