package com.ssafy.ssafit.repository;

import com.ssafy.ssafit.entity.ExerciseHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ExerciseHistoryRepository extends JpaRepository<ExerciseHistory, Long> {

}
