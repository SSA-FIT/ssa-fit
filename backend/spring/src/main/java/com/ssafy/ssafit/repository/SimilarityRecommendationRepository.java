package com.ssafy.ssafit.repository;

import com.ssafy.ssafit.entity.SimilarityRecommendation;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface SimilarityRecommendationRepository extends JpaRepository<SimilarityRecommendation, Long> {

    Optional<SimilarityRecommendation> findByUserId(int userId);

}
