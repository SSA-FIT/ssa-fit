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
@ApiModel(value = "신체정보 기반 추천", description = "신체정보 기반 추천 운동 리스트를 응답하는 클래스")
public class ProfileRecResponseDto {

    @ApiModelProperty(name="신체정보 기반 추천 운동 리스트", example = "[{ \"id\" : 1, \"name\" : \"윗몸일으키기\", \"imageURL\" : \"http:~~~\" }, ]")
    List<Exercise> profileRec;

    public static ProfileRecResponseDto of (List<Exercise> exercises){

        ProfileRecResponseDto res = new ProfileRecResponseDto();
        res.setProfileRec(exercises);
        return res;

    }
}
