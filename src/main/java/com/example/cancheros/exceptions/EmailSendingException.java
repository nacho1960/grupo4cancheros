package com.example.cancheros.exceptions;

public class EmailSendingException extends Exception {
    public EmailSendingException(String message, Throwable cause) {
        super(message, cause);
    }
}