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

    @ApiModelProperty(name="회원 아이디", example = "ssafit321")
    List<UserInfoResponseDto> userInfo;

    public static LoginResponseDto of(String message, String token, User user) {

        LoginResponseDto body = new LoginResponseDto();
        body.message = message;
        body.token = token;
        List<UserInfoResponseDto> userInfo = new ArrayList<>();
        UserInfoResponseDto userInformation = UserInfoResponseDto.builder()
                .id(user.getId())
                .height(user.getHeight())
                .weight(user.getWeight())
                .bmi(user.getBmi())
                .level(user.getLevel())
                .birth(user.getBirth())
                .gender(user.getGender())
                .userId(user.getUserId())
                .nickname(user.getNickname())
                .email(user.getEmail())
                .build();
        userInfo.add(userInformation);
        body.userInfo = userInfo;
        return body;

    }
}
