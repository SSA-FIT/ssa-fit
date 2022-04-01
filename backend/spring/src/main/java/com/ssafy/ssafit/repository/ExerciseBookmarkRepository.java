package com.ssafy.ssafit.repository;

import com.ssafy.ssafit.entity.ExerciseBookmark;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.domain.Example;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;
import java.util.Optional;

@Repository
public interface ExerciseBookmarkRepository extends JpaRepository<ExerciseBookmark, Integer> {

    @Query(value = "SELECT exercise_id " +
            "FROM exercise_bookmark " +
            "WHERE user_id = :userId", nativeQuery = true)
    List<Integer> findExerciseBookmarks(@Param("userId") int userId);

    @Query(value = "SELECT *" +
            "FROM exercise_bookmark " +
            "WHERE exercise_id = :exerciseId AND user_id = :userId", nativeQuery = true)
    Optional<ExerciseBookmark> findByExerciseIdAndUserId(@Param("exerciseId") int exerciseId, @Param("userId") int userId);

    @Modifying
    @Transactional
    @Query(value = "INSERT INTO exercise_bookmark (exercise_id, user_id) values (:exerciseId, :userId)", nativeQuery = true)
    int saveBookmark(@Param("exerciseId") int exerciseId, @Param("userId") int userId);

    @Modifying
    @Transactional
    @Query(value = "DELETE FROM exercise_bookmark where id = :id", nativeQuery = true)
    int deleteBookmark(@Param("id") int id);
}
