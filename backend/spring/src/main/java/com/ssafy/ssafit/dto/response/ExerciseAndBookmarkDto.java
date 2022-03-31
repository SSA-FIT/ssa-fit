package com.ssafy.ssafit.dto.response;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ExerciseAndBookmarkDto {

    private int exerciseId;

    private String getName;

    private String imageURL;

    private String countPerSet;

    private int setCount;

    private String durationTime;

    private boolean bookmark;
}
