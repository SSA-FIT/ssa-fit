package com.ssafy.ssafit.service;

import com.ssafy.ssafit.dto.request.ExerciseHistoryDto;
import com.ssafy.ssafit.dto.request.ExerciseHistoryRequestDto;
import com.ssafy.ssafit.entity.Exercise;
import com.ssafy.ssafit.entity.ExerciseHistory;
import com.ssafy.ssafit.entity.User;
import com.ssafy.ssafit.repository.ExerciseHistoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@Service("ExerciseHistoryService")
public class ExerciseHistoryServiceImpl implements ExerciseHistoryService {

    @Autowired
    private ExerciseHistoryRepository exerciseHistoryRepository;

    @Transactional
    public boolean saveExerciseHistory(ExerciseHistoryRequestDto exerciseHistoryRequestDto, User user) {

        List<ExerciseHistoryDto> exercises = exerciseHistoryRequestDto.getExercises();

        List<ExerciseHistory> exerciseHistories = new ArrayList<>();
        for (ExerciseHistoryDto exerciseHis : exercises) {

            int exerciseId = exerciseHis.getId();
            String countPerSet = exerciseHis.getCountPerSet();
            int setCount = exerciseHis.getSetCount();
            String durationTime = exerciseHis.getDurationTime();

            boolean check = checkValidate(countPerSet, setCount, durationTime);
            if (!check) {
                return false;
            }

            Exercise exercise = new Exercise();
            exercise.setId(exerciseId);

            ExerciseHistory exerciseHistory = ExerciseHistory.builder()
                    .countPerSet(countPerSet)
                    .setCount(setCount)
                    .durationTime(durationTime)
                    .exercise(exercise)
                    .user(user)
                    .build();

            exerciseHistories.add(exerciseHistory);
        }

        exerciseHistoryRepository.saveAll(exerciseHistories);

        return true;

    }

    // 운동이력 저장시 유효성 체크
    public boolean checkValidate(String countPerSet, int setCount, String durationTime) {
        if (countPerSet == null || countPerSet.equals("")) {
            if (setCount != 0 || (durationTime == null || durationTime.equals(""))) {
                return false;
            }
        } else if (setCount == 0) {
             return false;
        }
        return true;

    }

}
