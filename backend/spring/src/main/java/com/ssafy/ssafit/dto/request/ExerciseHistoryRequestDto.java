package com.ssafy.ssafit.dto.request;

import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;

import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ApiModel(value = "운동이력 정보 리스트", description = "운동이력 리스트를 입력하는 클래스")
public class ExerciseHistoryRequestDto {

    @ApiModelProperty(value = "운동아이디", example = "1")
    private List<ExerciseHistoryDto> exercises;

}
