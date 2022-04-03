package com.ssafy.ssafit.dto.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ApiModel(value = "신체정보", description = "비로그인 사용자의 신체정보를 입력하는 클래스")
public class ProfileRecDto {

    @ApiModelProperty(value = "키", example = "180.5")
    private String height;

    @ApiModelProperty(value = "체중", example = "77.5")
    private String weight;

    @ApiModelProperty(value = "운동레벨", example = "씨앗")
    private String level;

    @ApiModelProperty(value = "생년월일", example = "2000-01-01")
    private String birth;

    @ApiModelProperty(value = "성별", example = "남")
    private String gender;

}
