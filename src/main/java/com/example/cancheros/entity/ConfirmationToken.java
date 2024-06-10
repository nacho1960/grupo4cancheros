// package com.example.cancheros.entity;

// import jakarta.persistence.Entity;
// import jakarta.persistence.FetchType;
// import jakarta.persistence.GeneratedValue;
// import jakarta.persistence.GenerationType;
// import jakarta.persistence.Id;
// import jakarta.persistence.JoinColumn;
// import jakarta.persistence.OneToOne;
// import jakarta.persistence.Table;
// import lombok.Data;

// @Data
// @Entity
// @Table(name = "ConfirmationToken")
// public class ConfirmationToken {

//     @Id
//     @GeneratedValue(strategy = GenerationType.AUTO)
//     private Long id;

//     private String token;

//     @OneToOne(targetEntity = MyUser.class, fetch = FetchType.EAGER)
//     @JoinColumn(nullable = false, name = "user_id")
//     private MyUser user;
//     private Long expirationTime; //revisar si es necesario

//     public ConfirmationToken(String token, MyUser user) {
//         this.token = token;
//         this.user = user;
//     }
// }
