package com.example.cancheros.repository;

import com.example.cancheros.entity.Usuario;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository

public interface IUsuarioRepository extends JpaRepository<Usuario, Long> {


}
