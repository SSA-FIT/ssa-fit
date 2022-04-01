package com.ssafy.ssafit.service;


import com.ssafy.ssafit.dto.request.SimilarityRecDto;
import com.ssafy.ssafit.entity.User;

import java.util.List;

public interface SimilarityRecommendationService {

    List<SimilarityRecDto> getSimilarRec(User user);

}
