package com.ssafy.ssafit.service;

import com.ssafy.ssafit.entity.Exercise;
import java.util.List;

public interface ExerciseService {

    // 전체 운동 조회
    List<Exercise> exerciseList();

    Exercise getExerciseByExerciseId(int id);
}
