package com.ssafy.ssafit.controller;

import com.ssafy.ssafit.common.ErrorResponseDto;
import com.ssafy.ssafit.common.SuccessResponseDto;
import com.ssafy.ssafit.dto.request.EmailVerificationDto;
import com.ssafy.ssafit.dto.request.SignUpRequestDto;
import com.ssafy.ssafit.entity.User;
import com.ssafy.ssafit.exception.EmailCodeException;
import com.ssafy.ssafit.service.EmailService;
import com.ssafy.ssafit.service.UserService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Api(value = "회원가입 API", tags = {"SignUp"})
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/users/sign-up")
public class SignUpController {

    private final UserService userService;

    private final EmailService emailService;

    @GetMapping("/id-check")
    @ApiOperation(value = "아이디 중복체크", notes = "아이디를 중복체크한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 409, message = "사용자 존재"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<?> idCheck(
            @RequestParam("userId") String userId) {

        User user;
        try {
            user = userService.userIdCheck(userId);
        } catch (Exception exception) {
            return ResponseEntity.status(500).body(ErrorResponseDto.of(500,  "Internal Server Error, ID 중복 확인 실패"));
        }
        if (user != null) {
            return ResponseEntity.status(409).body(ErrorResponseDto.of(409, "이미 존재하는 ID 입니다."));
        }
        return ResponseEntity.status(200).body(SuccessResponseDto.of("사용 가능한 ID입니다."));

    }

    @GetMapping("/email-verification")
    @ApiOperation(value = "이메일 인증", notes = "이메일 중복체크 후 인증번호 발송한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 409, message = "이메일 존재"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<?> emailVerification(
            @RequestParam("email") String email) {

        User user;

        try {
            user = userService.emailCheck(email);
            if (user != null) {
                return ResponseEntity.status(409).body(ErrorResponseDto.of(409, "이미 등록된 이메일 입니다."));
            }
            emailService.sendSimpleMessage(email);
        } catch (Exception exception) {
            return ResponseEntity.status(500).body(ErrorResponseDto.of(500,  "Internal Server Error, 이메일 인증 실패"));
        }

        return ResponseEntity.status(200).body(SuccessResponseDto.of("입력한 이메일로 인증 메일을 발송했습니다.<br> 이메일에 표시된 인증코드를 입력해주세요."));

    }

    @PostMapping("/email-verification")
    @ApiOperation(value = "이메일 인증 코드 확인", notes = "이메일 인증번호를 확인한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 409, message = "이메일 존재"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<?> emailAndCodeVerification(
            @RequestBody EmailVerificationDto emailVerificationDto) {
        try {
            emailService.getUserIdByCode(emailVerificationDto.getEmail(), emailVerificationDto.getCode());
        } catch (EmailCodeException exception) {
            return ResponseEntity.status(401).body(ErrorResponseDto.of(401, "올바른 인증 코드가 아닙니다."));
        } catch (NullPointerException exception) {
            return ResponseEntity.status(403).body(ErrorResponseDto.of(403, "인증코드가 만료되었습니다."));
        } catch (Exception exception) {
            return ResponseEntity.status(500).body(ErrorResponseDto.of(500, "Internal Server Error, 인증 코드 확인 실패"));
        }
        return ResponseEntity.status(200).body(SuccessResponseDto.of("이메일 인증 완료 되었습니다."));

    }

    @PostMapping()
    @ApiOperation(value = "회원가입", notes = "사용자 정보를 받아 회원가입한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 400, message = "입력값 오류"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<?> signUpUser(
            @RequestBody SignUpRequestDto signUpRequestDto) {

        User user;
        try {
            user = userService.saveUser(signUpRequestDto);
        } catch (Exception exception) {
            return ResponseEntity.status(500).body(ErrorResponseDto.of(500, "Internal Server Error, 신체 정보 등록 실패"));
        }
        if(user == null) {
            return ResponseEntity.status(400).body(ErrorResponseDto.of(400, "신체 정보 입력값이 유효하지 않습니다."));
        }
        return ResponseEntity.status(200).body(SuccessResponseDto.of("신체 정보 입력이 완료되었습니다."));

    }
}
