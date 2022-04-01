package com.ssafy.ssafit.controller;

import com.ssafy.ssafit.common.ErrorResponseDto;
import com.ssafy.ssafit.common.SuccessResponseDto;
import com.ssafy.ssafit.dto.request.ExerciseHistoryRequestDto;
import com.ssafy.ssafit.dto.request.ProfileRecDto;
import com.ssafy.ssafit.dto.response.ExercisesResponseDto;
import com.ssafy.ssafit.dto.request.SimilarityRecDto;
import com.ssafy.ssafit.dto.response.SimilarityRecResponseDto;
import com.ssafy.ssafit.entity.Exercise;
import com.ssafy.ssafit.entity.User;
import com.ssafy.ssafit.service.*;
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

    private final UserService userService;
    private final ExerciseService exerciseService;
    private final ProfileRecommendationService profileRecommendationService;
    private final SimilarityRecommendationService similarityRecommendationService;
    private final ExerciseBookmarkService exerciseBookmarkService;
    private final ExerciseHistoryService exerciseHistoryService;

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

    @GetMapping("/similarity")
    @ApiOperation(value = "유사도 기반 추천", notes = "로그인 사용자와 유사도가 높은 사용자가 선호하는 운동을 보여준다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 403, message = "권한 오류"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<?> getSimilarityRecommendation(
            @AuthenticationPrincipal String token) {

        User user;
        List<SimilarityRecDto> similarityRecExercises;

        try {
            user = userService.getUserByUserId(token);
            if (user == null) {
                return ResponseEntity.status(403).body(ErrorResponseDto.of(403, "권한이 없습니다."));
            }
            similarityRecExercises = similarityRecommendationService.getSimilarRec(user);
        } catch (Exception exception) {
            return ResponseEntity.status(500).body(ErrorResponseDto.of(500,  "Internal Server Error, 즐겨찾기 응답 실패"));
        }

        return ResponseEntity.status(200).body(SimilarityRecResponseDto.of(similarityRecExercises));

    }

    @GetMapping("/bookmark")
    @ApiOperation(value = "즐겨찾기 운동 조회", notes = "로그인 사용자가 즐겨찾기한 운동을 보여준다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 403, message = "권한 오류"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<?> getExerciseBookmarks(
            @AuthenticationPrincipal String token) {

        User user;
        List<Exercise> bookmarkExercises;

        try {
            user = userService.getUserByUserId(token);
            if (user == null) {
                return ResponseEntity.status(403).body(ErrorResponseDto.of(403, "권한이 없습니다."));
            }
            bookmarkExercises = exerciseBookmarkService.getExerciseBookmarks(user);
        } catch (Exception exception) {
            return ResponseEntity.status(500).body(ErrorResponseDto.of(500,  "Internal Server Error, 즐겨찾기 응답 실패"));
        }

        return ResponseEntity.status(200).body(ExercisesResponseDto.of(bookmarkExercises));

    }

    @PostMapping("/records")
    @ApiOperation(value = "운동이력 저장", notes = "운동 후 입력한 정보를 기반으로 운동이력을 저장한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 400, message = "저장 실패"),
            @ApiResponse(code = 403, message = "권한 오류"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<?> saveExerciseHistory(
            @RequestBody ExerciseHistoryRequestDto exerciseHistoryRequestDto
            , @AuthenticationPrincipal String token) {

        int exerciseId = exerciseHistoryRequestDto.getId();
        String countPerSet = exerciseHistoryRequestDto.getCountPerSet();
        int setCount = exerciseHistoryRequestDto.getSetCount();
        String durationTime = exerciseHistoryRequestDto.getDurationTime();

        User user;
        Exercise exercise = null;
        try {
            user = userService.getUserByUserId(token);
            exercise = exerciseService.getExerciseByExerciseId(exerciseId);
            if (user == null) {
                return ResponseEntity.status(403).body(ErrorResponseDto.of(403, "권한이 없습니다."));
            }
            if (countPerSet == null || countPerSet.equals("")) {
                if ((setCount == 0 && (durationTime == null || durationTime.equals(""))) || (setCount != 0)) {
                    return ResponseEntity.status(400).body(ErrorResponseDto.of(400, "운동이력 저장 실패하였습니다."));
                }
            } else {
                if (setCount == 0) return ResponseEntity.status(400).body(ErrorResponseDto.of(400, "운동이력 저장 실패하였습니다."));
            }
            exerciseHistoryService.saveExerciseHistory(exerciseHistoryRequestDto, user, exercise);
        } catch (Exception exception) {
            return ResponseEntity.status(500).body(ErrorResponseDto.of(500, "Internal Server Error, 운동이력 저장 실패"));
        }

        return ResponseEntity.status(200).body(SuccessResponseDto.of("운동이력 저장 성공하였습니다."));

    }

}
