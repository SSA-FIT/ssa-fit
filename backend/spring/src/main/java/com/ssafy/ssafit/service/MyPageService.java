package com.ssafy.ssafit.service;

import com.ssafy.ssafit.dto.response.DateAndExerciseHistoryDto;

import java.util.List;

public interface MyPageService {

    // 운동 이력과 즐겨찾기가 포함된 조회
    List<DateAndExerciseHistoryDto> getMyPageHistory(String year, String month, String week, int userId);
}
