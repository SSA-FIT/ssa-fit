package com.ssafy.ssafit.controller;

import com.ssafy.ssafit.JWT.TokenProvider;
import com.ssafy.ssafit.common.ErrorResponseDto;
import com.ssafy.ssafit.common.SuccessResponseDto;
import com.ssafy.ssafit.dto.request.LoginRequestDto;
import com.ssafy.ssafit.dto.request.PasswordAuthCodeRequestDto;
import com.ssafy.ssafit.dto.request.PasswordResetRequestDto;
import com.ssafy.ssafit.dto.response.FindIdResponseDto;
import com.ssafy.ssafit.dto.response.LoginResponseDto;
import com.ssafy.ssafit.entity.User;
import com.ssafy.ssafit.exception.EmailCodeException;
import com.ssafy.ssafit.service.EmailService;
import com.ssafy.ssafit.service.UserService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@Api(value = "로그인 API", tags = {"login"})
@RestController
@RequestMapping("/api/users/login")
public class LoginController {

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private TokenProvider tokenProvider;

    @Autowired
    private UserService userService;

    @Autowired
    private EmailService emailService;

    @PostMapping("")
    @ApiOperation(value = "로그인", notes = "이메일과 비밀번호를 받아서 확인한 뒤 토큰을 생성하고 유저 정보 반환")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공", response = LoginResponseDto.class),
            @ApiResponse(code = 401, message = "인증 실패", response = ErrorResponseDto.class),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<?> userCheckAndSendToken(
            @RequestBody LoginRequestDto loginRequestDto) {

        User user;
        try {
            user = userService.userIdCheck(loginRequestDto.getUserId());
        } catch (Exception exception) {
            return ResponseEntity.status(500).body(ErrorResponseDto.of(500, "Internal Server Error, 로그인 실패"));
        }
        if (user == null) {
            return ResponseEntity.status(401).body(ErrorResponseDto.of(401, "아이디 또는 비밀번호를 확인해주세요"));
        }
        if (!passwordEncoder.matches(loginRequestDto.getPassword(), user.getPassword())) {
            return ResponseEntity.status(401).body(ErrorResponseDto.of(401, "아이디 또는 비밀번호를 확인해주세요"));
        }
        String token = tokenProvider.createToken(loginRequestDto.getUserId());
        return ResponseEntity.status(200).body(LoginResponseDto.of("로그인하였습니다.", token, user));

    }

    @GetMapping("/searching-id")
    @ApiOperation(value = "아이디 찾기", notes = "이메일을 받아서 확인한 뒤 아이디 암호화하여 반환")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<?> findUserIdAndSendUserId(
            @RequestParam("email") String email) {

        User user;
        try {
            user = userService.emailCheck(email);
        } catch (Exception exception) {
            return ResponseEntity.status(500).body(ErrorResponseDto.of(500, "Internal Server Error, 아이디 찾기 실패"));
        }
        if (user == null) {
            return ResponseEntity.status(401).body(ErrorResponseDto.of(401, "입력하신 이메일이 맞는지 확인해주세요."));
        }

        return ResponseEntity.status(200).body(FindIdResponseDto.of("아이디 찾기에 성공하였습니다.", user.getUserId()));

    }

    @GetMapping("/reset-password")
    @ApiOperation(value = "비밀번호 재설정 이메일 요청", notes = "비밀번호 재설정할 이메일 인증코드 보내기")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<?> resetPasswordAndSendCodeByEmail(
            @RequestParam("email") String email, @RequestParam("userId") String userId) {

        User user;
        try {
            user = userService.userIdCheck(userId);
            emailService.sendPwSimpleMessage(email);
        } catch (Exception exception) {
            return ResponseEntity.status(500).body(ErrorResponseDto.of(500, "Internal Server Error, 이메일 인증 실패"));
        }
        if (user == null) {
            return ResponseEntity.status(409).body(ErrorResponseDto.of(409, "입력하신 회원 정보가 맞는지 확인해주세요."));
        }

        return ResponseEntity.status(200).body(SuccessResponseDto.of("입력한 이메일로 인증 메일을 발송했습니다.\n 이메일에 표시된 인증코드를 입력해주세요."));

    }

    @PostMapping("/reset-password")
    @ApiOperation(value = "비밀번호 입력 코드 확인", notes = "아이디, 이메일, 코드 받아서 확인한 뒤 코드 검사")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 403, message = "인증 시간 만료"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<?> resetPasswordAndSendCodeByEmail(
            @RequestBody PasswordAuthCodeRequestDto passwordAuthCodeRequestDto) {

        try {
            emailService.getUserIdByCode(passwordAuthCodeRequestDto.getEmail(), passwordAuthCodeRequestDto.getCode());
        } catch (NullPointerException exception) {
            return ResponseEntity.status(500).body(ErrorResponseDto.of(403, "인증코드가 만료 되었습니다."));
        } catch (EmailCodeException exception) {
            return ResponseEntity.status(500).body(ErrorResponseDto.of(401, "올바른 인증 코드가 아닙니다."));
        } catch (Exception exception) {
            return ResponseEntity.status(500).body(ErrorResponseDto.of(500, "Internal Server Error, 이메일 인증 코드 확인 실패"));
        }

        return ResponseEntity.status(200).body(SuccessResponseDto.of("이메일 인증 완료 되었습니다."));

    }

    @PutMapping("/reset-password")
    @ApiOperation(value = "비밀번호 재설정", notes = "아이디와 이메일, 비밀번호를 받아서 확인한 뒤 비밀번호 재설정")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 400, message = "비밀번호 재설정 실패"),
            @ApiResponse(code = 401, message = "아이디 이메일 입력 오류"),
            @ApiResponse(code = 409, message = "아이디 존재하지 않음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<?> resetPasswordAndSendCodeByEmail(
            @RequestBody PasswordResetRequestDto passwordResetRequestDto) {

        User user;
        try {

            user = userService.userIdCheck(passwordResetRequestDto.getUserId());

            if(user == null){
                return ResponseEntity.status(409).body(ErrorResponseDto.of(409, "입력하신 아이디와 이메일이 맞는지 확인해주세요."));
            }

            if(!user.getEmail().equals(passwordResetRequestDto.getEmail())){
                return ResponseEntity.status(401).body(ErrorResponseDto.of(401, "일치하지 않는 아이디와 이메일입니다."));
            }

            user = userService.resetPassword(passwordResetRequestDto.getPassword(), user);

        } catch (Exception exception) {
            return ResponseEntity.status(500).body(ErrorResponseDto.of(500, "Internal Server Error, 비밀번호 재설정 실패"));
        }

        if(user == null){
            return ResponseEntity.status(400).body(ErrorResponseDto.of(400, "비밀번호 재설정에 실패하였습니다."));
        }

        return ResponseEntity.status(200).body(SuccessResponseDto.of("비밀번호 재설정이 완료 되었습니다."));

    }
}
