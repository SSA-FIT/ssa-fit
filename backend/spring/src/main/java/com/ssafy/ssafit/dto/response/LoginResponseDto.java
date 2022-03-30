package com.ssafy.ssafit.dto.response;

import com.ssafy.ssafit.entity.User;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ApiModel(value = "로그인 응답 정보", description = "메시지, 토큰, 회원정보를 반환한다.")
public class LoginResponseDto {

    @ApiModelProperty(name="응답 메시지", example = "아이디 또는 비밀번호를 확인해주세요.")
    String message;

    @ApiModelProperty(name = "access-token", example = "akslndasujndoiw.asdfnjdaifnklfegsg2134.fsdfsadfsd")
    private String token;

    public static LoginResponseDto of(String message, String token) {

        LoginResponseDto body = new LoginResponseDto();
        body.message = message;
        body.token = token;
        return body;

    }
}
