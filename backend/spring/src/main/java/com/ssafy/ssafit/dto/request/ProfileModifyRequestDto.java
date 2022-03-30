package com.ssafy.ssafit.dto.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ApiModel(value = "프로필 수정 요청", description = "프로필 수정")
public class ProfileModifyRequestDto {

    @ApiModelProperty(value = "키", example = "180.1")
    private String height;

    @ApiModelProperty(value = "몸무게", example = "70.0")
    private String weight;

    @ApiModelProperty(value = "운동레벨", example = "씨앗")
    private String level;

    @ApiModelProperty(value = "생년월일", example = "2000-01-01")
    private String birth;

    @ApiModelProperty(value = "성별", example = "남")
    private String gender;

    @ApiModelProperty(value = "닉네임", example = "싸피")
    private String nickname;
}
