package com.example.cancheros.repository;

import com.example.cancheros.entity.Producto;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository

public interface IProductoRepository extends JpaRepository<Producto,Long> {
    List<Producto> findAllProductoOrdered();
}
