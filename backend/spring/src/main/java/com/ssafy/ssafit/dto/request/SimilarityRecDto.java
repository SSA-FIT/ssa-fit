package com.ssafy.ssafit.dto.request;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SimilarityRecDto {

    private int id;

    private String name;

    private String imageURL;

    private int score;

}
