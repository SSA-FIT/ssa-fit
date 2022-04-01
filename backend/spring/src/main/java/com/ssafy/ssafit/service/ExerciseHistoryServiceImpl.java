package com.ssafy.ssafit.service;

import com.ssafy.ssafit.dto.request.ExerciseHistoryRequestDto;
import com.ssafy.ssafit.entity.Exercise;
import com.ssafy.ssafit.entity.ExerciseHistory;
import com.ssafy.ssafit.entity.User;
import com.ssafy.ssafit.repository.ExerciseHistoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;

@Service("ExerciseHistoryService")
public class ExerciseHistoryServiceImpl implements ExerciseHistoryService {

    @Autowired
    private ExerciseHistoryRepository exerciseHistoryRepository;

    @Transactional
    public ExerciseHistory saveExerciseHistory(ExerciseHistoryRequestDto exerciseHistoryRequestDto, User user, Exercise exercise) {

        ExerciseHistory exerciseHistory = ExerciseHistory.builder()
                .countPerSet(exerciseHistoryRequestDto.getCountPerSet())
                .setCount(exerciseHistoryRequestDto.getSetCount())
                .durationTime(exerciseHistoryRequestDto.getDurationTime())
                .exercise(exercise)
                .user(user)
                .build();

        return exerciseHistoryRepository.save(exerciseHistory);

    }
}
