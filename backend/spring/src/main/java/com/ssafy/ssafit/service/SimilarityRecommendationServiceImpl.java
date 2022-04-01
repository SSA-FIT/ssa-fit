package com.ssafy.ssafit.service;

import com.ssafy.ssafit.dto.request.SimilarityRecDto;
import com.ssafy.ssafit.entity.Exercise;
import com.ssafy.ssafit.entity.SimilarityRecommendation;
import com.ssafy.ssafit.entity.User;
import com.ssafy.ssafit.repository.ExerciseRepository;
import com.ssafy.ssafit.repository.SimilarityRecommendationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service("SimilarityRecommendationService")
public class SimilarityRecommendationServiceImpl implements SimilarityRecommendationService {

    @Autowired
    private ExerciseRepository exerciseRepository;

    @Autowired
    SimilarityRecommendationRepository similarityRecommendationRepository;

    public List<SimilarityRecDto> getSimilarRec(User user) {
        int userId = user.getId();
        List<SimilarityRecDto> exerciseList = new ArrayList<>();

        SimilarityRecommendation simRecData = similarityRecommendationRepository.findByUserId(userId).orElse(null);

        if (simRecData == null) return exerciseList;

        String exerSimRec = simRecData.getExerciseId();
        exerSimRec = exerSimRec.substring(0, exerSimRec.indexOf("}")).substring(exerSimRec.indexOf("{") + 1);

        List<Integer> exerIdList = new ArrayList<>();

        StringTokenizer st1 = new StringTokenizer(exerSimRec, ",");

        while (st1.hasMoreTokens()) {
            String str = st1.nextToken();
            StringTokenizer st2 = new StringTokenizer(str, ": ");
            SimilarityRecDto ex = new SimilarityRecDto();
            ex.setId(Integer.parseInt(st2.nextToken()));
            ex.setScore(Integer.parseInt(st2.nextToken()));
            exerciseList.add(ex);
            exerIdList.add(ex.getId());
        }

        List<Exercise> exerciseListQuery = exerciseRepository.findAllByIdIn(exerIdList);

        for (int i = 0; i < exerciseList.size(); i++) {
            for (int j = 0; j < exerciseListQuery.size(); j++) {
                if (exerciseList.get(i).getId() == exerciseListQuery.get(j).getId()) {
                    exerciseList.get(i).setName(exerciseListQuery.get(j).getName());
                    exerciseList.get(i).setImageURL(exerciseListQuery.get(j).getImageURL());
                    break;
                }
            }
        }
        return exerciseList;

    }

}
