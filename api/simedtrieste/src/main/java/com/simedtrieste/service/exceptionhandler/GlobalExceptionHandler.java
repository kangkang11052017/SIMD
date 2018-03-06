package com.simedtrieste.service.exceptionhandler;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.simedtrieste.exception.NotFoundException;

@ControllerAdvice
@RestController
public class GlobalExceptionHandler {

    @ResponseStatus(value = HttpStatus.BAD_REQUEST)
    @ExceptionHandler(value = NotFoundException.class)
    public ErrorResponse handleBaseException(NotFoundException ex) {

        return new ErrorResponse(ex.getErrorCode(), ex.getMessage());
    }

}
