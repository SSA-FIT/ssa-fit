package com.ssafy.ssafit.entity;

import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProfileRecommendation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private int ageGroup;

    @Column(length = 20)
    private String bmiLevel;

    @Column(length = 45)
    private String level;

    @Column(length = 45)
    private String gender;

    @ManyToOne(targetEntity = Exercise.class, fetch = FetchType.LAZY)
    @JoinColumn(name = "exercise_id")
    private Exercise exercise;
}
