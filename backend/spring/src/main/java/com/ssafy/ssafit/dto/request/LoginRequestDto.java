package com.ssafy.ssafit.dto.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ApiModel(value = "로그인 입력 정보", description = "아이디, 비밀번호를 입력하는 클래스")
public class LoginRequestDto {

    @ApiModelProperty(value = "아이디", example = "ssafit321")
    private String userId;

    @ApiModelProperty(value = "비밀번호", example = "a123123")
    private String password;

}