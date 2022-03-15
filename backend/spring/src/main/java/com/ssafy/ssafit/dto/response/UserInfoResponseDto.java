package com.ssafy.ssafit.dto.response;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UserInfoResponseDto {

    int id;
    String height;
    String weight;
    String bmi;
    String level;
    String birth;
    String gender;
    String userId;
    String nickname;
    String email;

}
