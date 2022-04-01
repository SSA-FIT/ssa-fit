package com.ssafy.ssafit.repository;

import com.ssafy.ssafit.entity.ExerciseBookmark;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ExerciseBookmarkRepository extends JpaRepository<ExerciseBookmark, Long> {

    @Query(value = "SELECT exercise_id " +
            "FROM exercise_bookmark " +
            "WHERE user_id = :userId", nativeQuery = true)
    List<Integer> findExerciseBookmarks(@Param("userId") int userId);

}
