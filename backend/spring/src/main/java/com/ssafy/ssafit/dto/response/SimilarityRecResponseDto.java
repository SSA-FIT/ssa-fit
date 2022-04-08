package com.ssafy.ssafit.dto.response;

import com.ssafy.ssafit.dto.request.SimilarityRecDto;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;

import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ApiModel(value = "유사도 기반 운동 추천", description = "유사도 기반으로 추천된 운동을 반환한다.")
public class SimilarityRecResponseDto {

    @ApiModelProperty(name="유시도 기반 추천 운동 리스트", example = "similarityRec : [{}]")
    List<SimilarityRecDto> similarityRec;

    public static SimilarityRecResponseDto of(List<SimilarityRecDto> exercises) {

        SimilarityRecResponseDto body = new SimilarityRecResponseDto();
        List<SimilarityRecDto> exerciseInfo = exercises;

        body.similarityRec = exerciseInfo;
        return body;

    }
}
