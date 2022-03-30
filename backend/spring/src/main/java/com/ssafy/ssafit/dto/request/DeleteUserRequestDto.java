package com.ssafy.ssafit.dto.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ApiModel(value = "회원탈퇴 요청", description = "회원 탈퇴")
public class DeleteUserRequestDto {

    @ApiModelProperty(value = "비밀번호", example = "qwe123")
    private String password;

}
