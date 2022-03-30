package com.ssafy.ssafit.service;

import com.ssafy.ssafit.dto.request.ProfileRecDto;
import com.ssafy.ssafit.entity.Exercise;
import com.ssafy.ssafit.entity.User;

import java.util.List;

public interface ProfileRecommendationService {

    // 신체정보 기반 운동 리스트 - 비로그인
    List<Exercise> profileRecExerciseList(ProfileRecDto profileRecDto);

    // 신체정보 기반 운동 리스트 - 로그인
    List<Exercise> profileRecExerciseLogin(User user);

}
