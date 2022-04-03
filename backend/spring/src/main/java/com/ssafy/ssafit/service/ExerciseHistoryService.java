package com.ssafy.ssafit.service;

import com.ssafy.ssafit.dto.request.ExerciseHistoryRequestDto;
import com.ssafy.ssafit.entity.Exercise;
import com.ssafy.ssafit.entity.ExerciseHistory;
import com.ssafy.ssafit.entity.User;

public interface ExerciseHistoryService {

    //운동이력 저장
    boolean saveExerciseHistory(ExerciseHistoryRequestDto exerciseHistoryRequestDto, User user);

}
