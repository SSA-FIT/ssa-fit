package com.ssafy.ssafit.dto.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ApiModel(value = "운동이력 정보", description = "운동이력을 입력하는 클래스")
public class ExerciseHistoryDto {

    @ApiModelProperty(value = "운동아이디", example = "1")
    private int id;

    @ApiModelProperty(value = "운동횟수", example = "20")
    private int countPerSet;

    @ApiModelProperty(value = "운동세트", example = "3")
    private int setCount;

    @ApiModelProperty(value = "운동시간", example = "00:20:00")
    private String durationTime;

}
