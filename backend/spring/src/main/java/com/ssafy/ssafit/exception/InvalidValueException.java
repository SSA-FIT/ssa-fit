package com.ssafy.ssafit.exception;

public class InvalidValueException extends BusinessException {

    public InvalidValueException(ErrorCode errorCode) {
        super(errorCode);
    }

}
