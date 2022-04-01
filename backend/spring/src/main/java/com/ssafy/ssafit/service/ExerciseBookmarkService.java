package com.ssafy.ssafit.service;


import com.ssafy.ssafit.entity.Exercise;
import com.ssafy.ssafit.entity.User;

import java.util.List;

public interface ExerciseBookmarkService {

    List<Exercise> getExerciseBookmarks(User user);

}
