package com.ssafy.ssafit.dto.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ApiModel(value = "마이페이지 운동이력 요청", description = "운동이력 요청")
public class DateRequestDto {

    @ApiModelProperty(value = "년도", example = "2022")
    private String year;

    @ApiModelProperty(value = "월", example = "3")
    private String month;

    @ApiModelProperty(value = "주차", example = "1")
    private String week;
}
