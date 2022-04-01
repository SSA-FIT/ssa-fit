package com.ssafy.ssafit.dto.response;

import io.swagger.annotations.ApiModel;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ApiModel(value = "마이페이지 운동이력", description = "나의 날짜별 운동 이력을 주 단위로 반환한다.")
public class MyPageHistoryResponseDto {

    private List<DateAndExerciseHistoryDto> exerciseHistory;

    public static MyPageHistoryResponseDto of(List<DateAndExerciseHistoryDto> list) {

        MyPageHistoryResponseDto body = new MyPageHistoryResponseDto();
        body.exerciseHistory = list;
        return body;

    }
}
