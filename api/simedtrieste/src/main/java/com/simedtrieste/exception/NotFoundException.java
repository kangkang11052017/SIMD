package com.simedtrieste.exception;

public class NotFoundException extends Exception {

    /**
     * 
     */
    private static final long serialVersionUID = 1L;

    private String code;

    public NotFoundException() {
        super();
    }

    public NotFoundException(String message, Throwable cause) {
        super(message, cause);
    }

    public NotFoundException(String code, String message) {
        super(message);
        this.code = code;
    }

    public NotFoundException(String message) {
        super(message);
    }

    public NotFoundException(Throwable cause) {
        super(cause);
    }

    public String getErrorCode() {

        return this.code;
    }

}
