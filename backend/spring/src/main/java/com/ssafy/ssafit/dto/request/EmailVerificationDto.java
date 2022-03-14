package com.ssafy.ssafit.dto.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ApiModel(value = "이메일 인증", description = "인증코드, 이메일을 입력하는 클래스")
public class EmailVerificationDto {

    @ApiModelProperty(value = "이메일", example = "ssafit@gmail.com")
    private String email;

    @ApiModelProperty(value = "인증번호", example = "AwZ12VBD")
    private String code;
}
