package com.ssafy.ssafit.dto.response;

import com.ssafy.ssafit.entity.Exercise;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;

import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ApiModel(value = "운동 정보", description = "운동 정보 리스트를 응답하는 클래스")
public class ExercisesResponseDto {

    @ApiModelProperty(name="운동 리스트", example = "[{ \"id\" : 1, \"name\" : \"윗몸일으키기\", \"imageURL\" : \"http:~~~\" }, ]")
    List<Exercise> exercises;

    public static ExercisesResponseDto of (List<Exercise> exercises){

        ExercisesResponseDto res = new ExercisesResponseDto();
        res.setExercises(exercises);
        return res;

    }

}
