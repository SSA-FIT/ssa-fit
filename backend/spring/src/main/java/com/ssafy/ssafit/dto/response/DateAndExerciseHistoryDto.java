package com.ssafy.ssafit.dto.response;

import lombok.*;

import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class DateAndExerciseHistoryDto {

    private String date;

    private List<ExerciseAndBookmarkDto> exercise;
}
