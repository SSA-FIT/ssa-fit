package com.ssafy.ssafit.controller;

import com.ssafy.ssafit.common.ErrorResponseDto;
import com.ssafy.ssafit.dto.request.ProfileRecDto;
import com.ssafy.ssafit.dto.response.ExercisesResponseDto;
import com.ssafy.ssafit.entity.Exercise;
import com.ssafy.ssafit.entity.User;
import com.ssafy.ssafit.service.ExerciseService;
import com.ssafy.ssafit.service.ProfileRecommendationService;
import com.ssafy.ssafit.service.UserService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Api(value = "운동 API", tags = {"Exercise"})
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/recommendation")
public class ExerciseController {

    private final ExerciseService exerciseService;

    private final ProfileRecommendationService profileRecommendationService;

    private final UserService userService;

    @GetMapping("")
    @ApiOperation(value = "전체 운동 조회", notes = "모든 운동 리스트(ID, 이름, 이미지 URL)를 조회한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 400, message = "전체 운동 조회 실패"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<?> exerciseInquiry() {

        List<Exercise> exercises;

        try {
            exercises = exerciseService.exerciseList();
        } catch (Exception exception) {
            return ResponseEntity.status(500).body(ErrorResponseDto.of(500,  "Internal Server Error, 전체 운동 조회 실패"));
        }

        return ResponseEntity.status(200).body(ExercisesResponseDto.of(exercises));

    }

    @PostMapping("/profile")
    @ApiOperation(value = "신체정보 기반 추천(비로그인)", notes = "비로그인 사용자가 입력한 신체정보를 기반으로 운동을 추천한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 400, message = "신체 정보 입력값이 유효하지 않음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<?> profileRecNonLogin(
            @RequestBody ProfileRecDto profileRecDto) {

        List<Exercise> profileRecExercises;

        try {
            profileRecExercises = profileRecommendationService.profileRecExerciseList(profileRecDto);
        } catch (Exception exception) {
            return ResponseEntity.status(500).body(ErrorResponseDto.of(500,  "Internal Server Error, 신체정보 기반 추천 실패"));
        }

        return ResponseEntity.status(200).body(ExercisesResponseDto.of(profileRecExercises));

    }

    @GetMapping("/profile")
    @ApiOperation(value = "신체정보 기반 추천(로그인)", notes = "로그인 사용자가 입력한 신체정보를 기반으로 운동을 추천한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 400, message = "신체 정보 입력값이 유효하지 않음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<?> profileRecLogin(
            @AuthenticationPrincipal String token) {

        User user;
        List<Exercise> profileRecExercises;

        try {
            user = userService.getUserByUserId(token);
            profileRecExercises = profileRecommendationService.profileRecExerciseLogin(user);
        } catch (Exception exception) {
            return ResponseEntity.status(500).body(ErrorResponseDto.of(500,  "Internal Server Error, 신체정보 기반 추천 실패"));
        }

        return ResponseEntity.status(200).body(ExercisesResponseDto.of(profileRecExercises));

    }

}
