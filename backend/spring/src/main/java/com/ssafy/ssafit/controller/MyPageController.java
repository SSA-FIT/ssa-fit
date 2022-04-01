package com.ssafy.ssafit.controller;

import com.ssafy.ssafit.common.ErrorResponseDto;
import com.ssafy.ssafit.dto.request.DateRequestDto;
import com.ssafy.ssafit.dto.response.DateAndExerciseHistoryDto;
import com.ssafy.ssafit.dto.response.MyPageHistoryResponseDto;
import com.ssafy.ssafit.dto.response.ProfileResponseDto;
import com.ssafy.ssafit.entity.User;
import com.ssafy.ssafit.service.MyPageService;
import com.ssafy.ssafit.service.UserService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Api(value = "마이페이지 API", tags = {"MyPage"})
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/users")
public class MyPageController {

    @Autowired
    private UserService userService;

    @Autowired
    private MyPageService myPageService;

    @GetMapping("/exercise-history")
    @ApiOperation(value = "내 프로필 운동 이력 조회", notes = "토큰을 받아 나의 운동 이력을 반환함.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공", response = ProfileResponseDto.class),
            @ApiResponse(code = 403, message = "인증 실패", response = ErrorResponseDto.class),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<?> getTokenAndSendExerciseHistoryWithBookmark(
            @AuthenticationPrincipal final String token, DateRequestDto dateRequestDto) {

        User user;
        List<DateAndExerciseHistoryDto> list;
        try {
            user = userService.userIdCheck(token);
            if (user == null) {
                return ResponseEntity.status(403).body(ErrorResponseDto.of(403, "잘못된 접근입니다."));
            }
            list = myPageService.getMyPageHistory(dateRequestDto.getYear(), dateRequestDto.getMonth(), dateRequestDto.getWeek(), user.getId());
        } catch (Exception exception) {
            return ResponseEntity.status(500).body(ErrorResponseDto.of(500, "Internal Server Error, 내 프로필 응답 실패"));
        }

        return ResponseEntity.status(200).body(MyPageHistoryResponseDto.of(list));

    }
}
