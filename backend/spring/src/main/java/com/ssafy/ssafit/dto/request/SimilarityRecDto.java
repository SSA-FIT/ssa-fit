package com.ssafy.ssafit.dto.request;

import lombok.*;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SimilarityRecDto {

    int id;
    String name;
    String imageURL;
    int score;

}
