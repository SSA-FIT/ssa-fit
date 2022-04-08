package com.ssafy.ssafit.controller;

import com.ssafy.ssafit.common.ErrorResponseDto;
import com.ssafy.ssafit.common.SuccessResponseDto;
import com.ssafy.ssafit.dto.request.DeleteUserRequestDto;
import com.ssafy.ssafit.dto.request.LoginRequestDto;
import com.ssafy.ssafit.dto.request.ProfileModifyRequestDto;
import com.ssafy.ssafit.dto.response.LoginResponseDto;
import com.ssafy.ssafit.dto.response.ProfileResponseDto;
import com.ssafy.ssafit.entity.User;
import com.ssafy.ssafit.service.UserService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

@Api(value = "프로필 API", tags = {"profile"})
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/users/profile")
public class ProfileController {

    @Autowired
    private UserService userService;

    private final PasswordEncoder passwordEncoder;

    @GetMapping("")
    @ApiOperation(value = "내 프로필 조회", notes = "토큰을 받아 나의 프로필을 반환함.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공", response = ProfileResponseDto.class),
            @ApiResponse(code = 403, message = "인증 실패", response = ErrorResponseDto.class),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<?> getTokenAndSendProfile(
            @AuthenticationPrincipal final String token) {

        User user;
        try {
            user = userService.userIdCheck(token);
            if (user == null) {
                return ResponseEntity.status(403).body(ErrorResponseDto.of(403, "잘못된 접근입니다."));
            }
        } catch (Exception exception) {
            return ResponseEntity.status(500).body(ErrorResponseDto.of(500, "Internal Server Error, 내 프로필 응답 실패"));
        }

        return ResponseEntity.status(200).body(ProfileResponseDto.of(user));

    }

    @PutMapping("")
    @ApiOperation(value = "내 프로필 수정", notes = "수정 정보와 토큰을 받아 나의 프로필을 수정함.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공", response = ProfileResponseDto.class),
            @ApiResponse(code = 403, message = "인증 실패", response = ErrorResponseDto.class),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<?> getTokenAndModifyProfile(
            @AuthenticationPrincipal final String token, @RequestBody ProfileModifyRequestDto profileModifyRequestDto) {

        User user;
        try {
            user = userService.userIdCheck(token);
            if (user == null) {
                return ResponseEntity.status(403).body(ErrorResponseDto.of(403, "프로필을 수정할 수 있는 권한이 없습니다."));
            }
            String userId = user.getUserId();
            User modifyUser = userService.modifyProfile(userId, profileModifyRequestDto);
        } catch (Exception exception) {
            return ResponseEntity.status(500).body(ErrorResponseDto.of(500, "Internal Server Error, 프로필 수정 실패"));
        }

        return ResponseEntity.status(200).body(SuccessResponseDto.of("프로필 수정 성공하였습니다."));

    }

    @DeleteMapping("")
    @ApiOperation(value = "회원 정보 삭제", notes = "비밀번호와 토큰을 받아 나의 프로필을 삭제함.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공", response = ProfileResponseDto.class),
            @ApiResponse(code = 403, message = "인증 실패", response = ErrorResponseDto.class),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<?> getTokenAndDeteleUser(
            @AuthenticationPrincipal final String token, @RequestBody DeleteUserRequestDto deleteUserRequestDto) {

        User user;
        try {
            user = userService.userIdCheck(token);

            if (user == null) {
                return ResponseEntity.status(403).body(ErrorResponseDto.of(403, "회원 탈퇴할 수 있는 권한이 없습니다."));
            }

            if (!passwordEncoder.matches(deleteUserRequestDto.getPassword(), user.getPassword())) {
                return ResponseEntity.status(403).body(ErrorResponseDto.of(403, "회원 탈퇴할 수 있는 권한이 없습니다."));
            }

            int deleteOK = userService.deleteProfile(user);
        } catch (Exception exception) {
            return ResponseEntity.status(500).body(ErrorResponseDto.of(500, "Internal Server Error, 회원 탈퇴 실패"));
        }

        return ResponseEntity.status(200).body(SuccessResponseDto.of("회원 탈퇴에 성공하였습니다."));

    }
}
