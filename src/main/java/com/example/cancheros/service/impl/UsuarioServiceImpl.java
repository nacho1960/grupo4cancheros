package com.example.cancheros.service.impl;

import com.example.cancheros.entity.MyUser;
import com.example.cancheros.entity.UsuarioRole;
import com.example.cancheros.exceptions.ResourceNotFoundException;
import com.example.cancheros.repository.IMyUserRepository;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.persistence.EntityExistsException;
import lombok.Getter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.sql.DataSource;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
public class UsuarioServiceImpl implements UserDetailsService {
    @Autowired
    IMyUserRepository userRepository;

    @Autowired
    ObjectMapper mapper;

    @Getter
    @Autowired
    //Fuente de datos para las conexiones a la base de datos.
    private DataSource dataSource;

    @Autowired
    //Codificador de contraseñas.
    private PasswordEncoder passwordEncoder;

    public MyUser obtenerUsuarioPorEmail(String email) {
        return userRepository.findByEmail(email);
    }

    @Override
    //Método que carga los detalles del usuario (por email) y lanza una excepcion si no se encuentra el usuario.
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {

        //Buscamos un usuario en el repositorio por email y lo asigna a MyUser:
        MyUser myUser = userRepository.findByEmail(email);

        //Si el usuario es nulo, lanzamos la excepción de que no fue encontrado.
        if (myUser == null) {
            throw new UsernameNotFoundException("User not found");
        }

        //Si encontramos al usuario, creamos y retornamos un objeto User de Spring Security con el email, la constraseña y su colección de roles.
        return new User(myUser.getEmail(), myUser.getPassword(),
                Collections.singleton(new SimpleGrantedAuthority("ROLE_" + myUser.getUsuarioRole())));
    }

    //Método para guardar un nuevo usuario en la base de datos.
    public MyUser saveUsuario(MyUser usuario) {
        // Verificamos si el correo electrónico ya está registrado
        if (userRepository.findByEmail(usuario.getEmail()) != null) {
            throw new EntityExistsException("Email already registered");
        }

        //Establecemos que cuando creamos un nuevo usuario, por defecto tiene el rol de usuario.
        usuario.setUsuarioRole(UsuarioRole.USER);

        //Codificamos la contraseña antes de guardarla.
        usuario.setPassword(passwordEncoder.encode(usuario.getPassword()));

        //Guardamos el usuario.
        return userRepository.save(usuario);
    }

    //Método para buscar un usuario.
    public MyUser buscar(Long id) {
        Optional<MyUser> usuario = userRepository.findById(id);
        return mapper.convertValue(usuario, MyUser.class);
    }

    //Método para listar todos los usuarios.
    public List<MyUser> listarTodos() {
        List<MyUser> usuarios = userRepository.findAll();
        return usuarios;
    }

    //Método para actualizar el usuario.
    public void actualizar(MyUser usuario) throws ResourceNotFoundException {
        if (buscar(usuario.getId()) == null) {
            throw new ResourceNotFoundException("No existe el usuario que desea actualizar.");
        }
        userRepository.save(usuario);
    }

}
