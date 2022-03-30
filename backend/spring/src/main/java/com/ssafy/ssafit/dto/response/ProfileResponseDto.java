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
@ApiModel(value = "프로필 응답 정보", description = "회원정보를 반환한다.")
public class ProfileResponseDto {

    @ApiModelProperty(name="회원 정보", example = "userInfo{}")
    List<UserInfoResponseDto> userInfo;

    public static ProfileResponseDto of(User user) {

        ProfileResponseDto body = new ProfileResponseDto();
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
