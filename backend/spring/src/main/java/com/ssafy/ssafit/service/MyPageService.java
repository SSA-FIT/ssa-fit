package com.ssafy.ssafit.service;

import com.ssafy.ssafit.dto.response.DateAndExerciseHistoryDto;
import com.ssafy.ssafit.entity.ExerciseBookmark;

import java.util.List;

public interface MyPageService {

    // 운동 이력과 즐겨찾기가 포함된 조회
    List<DateAndExerciseHistoryDto> getMyPageHistory(String year, String month, String week, int userId);

    // 즐겨찾기 조회
    ExerciseBookmark getBookmarkByExerciseId(int exerciseId, int userId);

    // 즐겨찾기 등록
    int saveBookmark(int exerciseId, int userId);

    // 즐겨찾기 해제
    int deleteBookmark(int id);
}
