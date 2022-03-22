package com.ssafy.ssafit.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.*;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;


@Entity
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @NotNull
    @Column(length = 20)
    private String height;

    @NotNull
    @Column(length = 20)
    private String weight;

    @NotNull
    @Column(length = 20)
    private String bmi;

    @NotNull
    @Column(length = 20)
    private String level;

    @NotNull
    @Column(length = 20)
    private String birth;

    @NotNull
    @Column(length = 10)
    private String gender;

    @NotNull
    @Column(length = 45, unique = true)
    private String userId;

    @NotNull
    @Column(length = 45, unique = true)
    private String nickname;

    @NotNull
    @Column(length = 45)
    private String email;

    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    private String password;

    @NotNull
    @Column(length = 20)
    private String roles;

    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    private LocalDateTime updatedAt;

    private LocalDateTime deletedAt;

    public List<String> getRoleList() {
        if (this.roles.length() > 0) {
            return Arrays.asList(this.roles.split(","));
        }
        return new ArrayList<>();

    }
}
