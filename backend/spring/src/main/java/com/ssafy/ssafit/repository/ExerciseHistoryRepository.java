package com.ssafy.ssafit.repository;

import com.ssafy.ssafit.dto.response.ExerciseAndBookmark;
import com.ssafy.ssafit.entity.ExerciseHistory;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface ExerciseHistoryRepository extends JpaRepository<ExerciseHistory, Integer> {
    @Query(value = "SELECT eh.exercise_id AS exerciseId, e.name AS name, e.image_url AS imageURL, eh.count_per_set AS countPerSet, eh.set_count AS setCount, eh.duration_time AS durationTime, eh.bookmark AS bookmark\n" +
            "FROM (SELECT ehh.*, eb.user_id AS bookmark FROM exercise_history ehh\n" +
                "LEFT OUTER JOIN exercise_bookmark eb\n" +
                "ON eb.user_id = :userId AND eb.exercise_id = ehh.exercise_id\n" +
            ") AS eh\n" +
            "JOIN exercise e\n" +
            "ON eh.exercise_id = e.id\n" +
            "WHERE eh.user_id = :userId AND eh.created_at LIKE %:date%"
            , nativeQuery = true)
    Optional<List<ExerciseAndBookmark>> getMyPageExerciseHistory(@Param("date") String date, @Param("userId") int userId);
}
