package com.ssafy.ssafit.service;

import com.ssafy.ssafit.dto.request.ProfileRecDto;
import com.ssafy.ssafit.entity.Exercise;
import com.ssafy.ssafit.entity.User;
import com.ssafy.ssafit.repository.ExerciseRepository;
import com.ssafy.ssafit.repository.ProfileRecommendationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Calendar;
import java.util.List;

@Service("profileRecommendationService")
public class ProfileRecommendationServiceImpl implements ProfileRecommendationService{

    @Autowired
    ProfileRecommendationRepository profileRecommendationRepository;

    @Autowired
    ExerciseRepository exerciseRepository;

    @Override
    public List<Exercise> profileRecExerciseList(ProfileRecDto profileRecDto) {

        int ageGroup = getAgeGroup(profileRecDto.getBirth());
        String bmiLevel = getBmiLevel(profileRecDto.getHeight(), profileRecDto.getWeight());
        String gender = profileRecDto.getGender();
        String level = profileRecDto.getLevel();

        return getExerciseList(ageGroup, bmiLevel, gender, level);

    }

    @Override
    public List<Exercise> profileRecExerciseLogin(User user) {

        int ageGroup = getAgeGroup(user.getBirth());
        String bmiLevel = getBmiLevel(user.getHeight(), user.getWeight());
        String gender = user.getGender();
        String level = user.getLevel();

        return getExerciseList(ageGroup, bmiLevel, gender, level);

    }

    public List<Exercise> getExerciseList(int ageGroup, String bmiLevel, String gender, String level) {

        List<Integer> exerIdList = profileRecommendationRepository.nonLoginRec(ageGroup, bmiLevel, gender, level);
        List<Exercise> exerciseList = exerciseRepository.findAllByIdIn(exerIdList);
        return exerciseList;

    }

    // BMI 계산 후 String으로 반환
    public String getBmiLevel(String height, String weight) {

        float h = Float.parseFloat(height);
        float w = Float.parseFloat(weight);

        float bmi = (float) (w / Math.pow(h, 2));

        if (bmi < 18.5) {
            return "저체중";
        } else if (bmi < 23) {
            return "정상";
        } else if (bmi < 25) {
            return "비만전단계 비만";
        } else if (bmi < 30) {
            return "1단계 비만";
        } else if (bmi < 35) {
            return "2단계 비만";
        } else {
            return "3단계 비만";
        }

    }

    // 나이대 계산
    public int getAgeGroup(String birth) {

        // 현재기준
        Calendar current = Calendar.getInstance();
        int currentYear  = current.get(Calendar.YEAR);
        int currentMonth = current.get(Calendar.MONTH) + 1;
        int currentDay   = current.get(Calendar.DAY_OF_MONTH);

        int birthYear = Integer.parseInt(birth.substring(0, 4));
        int birthMonth = Integer.parseInt(birth.substring(5, 7));
        int birthDay = Integer.parseInt(birth.substring(8));

        int age = currentYear - birthYear;
        if (birthMonth * 100 + birthDay > currentMonth * 100 + currentDay)
            age--;

        if (age < 20) {
            return 10;
        } else if (age < 30) {
            return 20;
        } else if (age < 40) {
            return 30;
        } else if (age < 50) {
            return 40;
        } else if (age < 60) {
            return 50;
        } else if (age < 70) {
            return 60;
        } else {
            return 70;
        }
    }

}
