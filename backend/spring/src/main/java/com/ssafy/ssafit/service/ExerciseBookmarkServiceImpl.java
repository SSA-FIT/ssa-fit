package com.ssafy.ssafit.service;

import com.ssafy.ssafit.entity.Exercise;
import com.ssafy.ssafit.entity.User;
import com.ssafy.ssafit.repository.ExerciseBookmarkRepository;
import com.ssafy.ssafit.repository.ExerciseRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service("ExerciseBookmarkService")
public class ExerciseBookmarkServiceImpl implements ExerciseBookmarkService{

    @Autowired
    private ExerciseRepository exerciseRepository;

    @Autowired
    private ExerciseBookmarkRepository exerciseBookmarkRepository;

    public List<Exercise> getExerciseBookmarks(User user){
        int userId = user.getId();
        List<Integer> exerIdList = exerciseBookmarkRepository.findExerciseBookmarks(userId);
        List<Exercise> exerciseList = exerciseRepository.findAllByIdIn(exerIdList);
        return exerciseList;
    }

}
