package com.ssafy.ssafit.service;

import com.ssafy.ssafit.dto.request.SignUpRequestDto;
import com.ssafy.ssafit.entity.User;

public interface UserService {

    // id 중복체크
    User userIdCheck(String userId);

    // email 중복체크
    User emailCheck(String email);

    // 회원가입
    User saveUser(SignUpRequestDto signUpRequestDto);
}
