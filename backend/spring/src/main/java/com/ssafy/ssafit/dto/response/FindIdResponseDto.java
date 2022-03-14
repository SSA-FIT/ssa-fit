package com.ssafy.ssafit.dto.response;

import com.ssafy.ssafit.common.ErrorResponseDto;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ApiModel(value = "아이디 찾기 정보", description = "아이디를 응답하는 클래스")
public class FindIdResponseDto {

    @ApiModelProperty(name="응답 메시지", example = "아이디 또는 비밀번호를 확인해주세요.")
    String message;

    @ApiModelProperty(name="회원 아이디", example = "ssafit***")
    String userId;

    public static FindIdResponseDto of(String message, String userId) {

        FindIdResponseDto body = new FindIdResponseDto();
        body.message = message;
        body.userId = userId;
        return body;

    }
}
