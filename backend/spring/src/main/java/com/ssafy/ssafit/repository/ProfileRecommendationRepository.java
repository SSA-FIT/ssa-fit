package com.ssafy.ssafit.repository;

import com.ssafy.ssafit.entity.ProfileRecommendation;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProfileRecommendationRepository extends JpaRepository<ProfileRecommendation, Long> {

    @Query(value = "SELECT exercise_id " +
            "FROM profile_recommendation " +
            "WHERE age_group = :ageGroup AND bmi_level = :bmiLevel AND gender = :gender AND level = :level", nativeQuery = true)
    List<Integer> nonLoginRec(@Param("ageGroup") int ageGroup,
                              @Param("bmiLevel") String bmiLevel,
                              @Param("gender") String gender,
                              @Param("level") String level);
}
