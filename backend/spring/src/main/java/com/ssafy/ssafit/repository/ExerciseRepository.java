package com.ssafy.ssafit.repository;

import com.ssafy.ssafit.entity.Exercise;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ExerciseRepository extends JpaRepository<Exercise, Long> {

    List<Exercise> findAllByIdIn(List<Integer> id);

    Optional<Exercise> findExerciseById(int id);

}
