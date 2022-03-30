package com.ssafy.ssafit.controller;

import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Api(value = "운동 API", tags = {"Exercise"})
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/recommendation")
public class ExerciseController {

}
