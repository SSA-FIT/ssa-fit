package com.ssafy.ssafit.dto.response;

import com.ssafy.ssafit.entity.Exercise;
import io.swagger.annotations.ApiModel;
import io.swagger.annotations.ApiModelProperty;
import lombok.*;

import java.util.List;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ApiModel(value = "즐겨찾기 운동 리스트", description = "사용자가 즐겨찾기한 운동 리스트를 응답하는 클래스")
public class BookmarkResponseDto {

    @ApiModelProperty(name="즐겨찾기 운동 리스트", example = "[{ \"id\" : 1, \"name\" : \"윗몸일으키기\", \"imageURL\" : \"http:~~~\" }, ]")
    List<Exercise> bookmark;

    public static BookmarkResponseDto of (List<Exercise> exercises){

        BookmarkResponseDto res = new BookmarkResponseDto();
        res.setBookmark(exercises);
        return res;

    }
}
