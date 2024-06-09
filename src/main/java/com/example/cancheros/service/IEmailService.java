package com.example.cancheros.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import com.example.cancheros.entity.MyUser;

import lombok.extern.log4j.Log4j;

@Service
@Log4j
public class IEmailService {

    private final JavaMailSender mailSender;

//     @Autowired
//     private IConfirmationTokenRepository confirmationTokenRepository;

//     @Autowired
//     //Servicio de envío de correos electrónicos.
//     public IEmailService(JavaMailSender mailSender, IConfirmationTokenRepository confirmationTokenRepository) {
//         this.mailSender = mailSender;
//         this.confirmationTokenRepository = confirmationTokenRepository;
//     }

//     public void sendConfirmationEmail(MyUser user, String token) {
//         SimpleMailMessage message = new SimpleMailMessage();
//         message.setTo(user.getEmail());
//         message.setSubject("Confirmación de registro");
//         message.setText("Hola " + user.getNombre() + ",\n\nHas registrado la cuenta con el correo electrónico: " + user.getEmail() + ". Para confirmar tu registro, por favor haz click en el siguiente enlace: "
// + "http://localhost:8080/confirm-account?token=" + token + "\n\nUna vez que hayas confirmado tu cuenta, puedes iniciar sesión aquí: http://localhost:8080/login" + "\n\nSaludos,\nEl equipo de Cancheros");
//         mailSender.send(message);
//     }

    @Autowired
    //Servicio de envío de correos electrónicos.
    public IEmailService(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    public void sendConfirmationEmail(MyUser user) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(user.getEmail());
        message.setSubject("Confirmación de registro");
        message.setText("Hola " + user.getNombre() + ",\n\nHas registrado la cuenta con el correo electrónico: " + user.getEmail() + ". Confirmación de registro exitosa " + "\n\nPuedes iniciar sesión aquí: http://localhost:8080/login" + "\n\nSaludos,\nEl equipo de Cancheros");
        mailSender.send(message);
    }

}