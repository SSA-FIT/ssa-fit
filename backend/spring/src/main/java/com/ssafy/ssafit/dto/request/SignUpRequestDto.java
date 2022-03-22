package com.ssafy.ssafit.dto.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ApiModel(value = "회원가입 정보", description = "회원 정보를 입력하는 클래스")
public class SignUpRequestDto {

    @ApiModelProperty(value = "키", example = "180.5")
    private String height;

    @ApiModelProperty(value = "체중", example = "77.5")
    private String weight;

    @ApiModelProperty(value = "운동레벨", example = "초보")
    private String level;

    @ApiModelProperty(value = "생년월일", example = "2000-01-01")
    private String birth;

    @ApiModelProperty(value = "성별", example = "남")
    private String gender;

    @ApiModelProperty(value = "아이디", example = "ssafit321")
    private String userId;

    @ApiModelProperty(value = "닉네임", example = "싸핏유저")
    private String nickname;

    @ApiModelProperty(value = "이메일", example = "jwb7214@gmail.com")
    private String email;

    @ApiModelProperty(value = "비밀번호", example = "a123123")
    private String password;

}
