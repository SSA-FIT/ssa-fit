package com.ssafy.ssafit.service;

import com.ssafy.ssafit.dto.request.PasswordResetRequestDto;
import com.ssafy.ssafit.dto.request.ProfileModifyRequestDto;
import com.ssafy.ssafit.dto.request.SignUpRequestDto;
import com.ssafy.ssafit.entity.User;
import com.ssafy.ssafit.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDateTime;

@Service("UserService")
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public User userIdCheck(String userId) {
        return userRepository.findByUserId(userId).orElse(null);
    }

    @Override
    public User emailCheck(String email) {
        return userRepository.findByEmail(email).orElse(null);
    }

    @Transactional
    @Override
    public User saveUser(SignUpRequestDto signUpRequestDto) {

        double height = Double.parseDouble(signUpRequestDto.getHeight());
        height /= 100;
        double weight = Double.parseDouble(signUpRequestDto.getWeight());
        double bmi = weight / (height * height);

        User user = User.builder()
                .height(signUpRequestDto.getHeight())
                .weight(signUpRequestDto.getWeight())
                .birth(signUpRequestDto.getBirth())
                .level(signUpRequestDto.getLevel())
                .email(signUpRequestDto.getEmail())
                .userId(signUpRequestDto.getUserId())
                .nickname(signUpRequestDto.getNickname())
                .password(passwordEncoder.encode(signUpRequestDto.getPassword()))
                .gender(signUpRequestDto.getGender())
                .bmi(String.valueOf(bmi).substring(0, 4))
                .roles("ROLE_USER")
                .build();

        return userRepository.save(user);

    }

    @Transactional
    @Modifying
    @Override
    public User resetPassword(String password, User user) {

        user.setPassword(passwordEncoder.encode(password));

        return userRepository.save(user);

    }

    @Transactional
    @Modifying
    @Override
    public User modifyProfile(String userId, ProfileModifyRequestDto profileModifyRequestDto) {
        User user = userRepository.findByUserId(userId).orElse(null);
        user.setBirth(profileModifyRequestDto.getBirth());
        user.setHeight(profileModifyRequestDto.getHeight());
        user.setWeight(profileModifyRequestDto.getWeight());
        user.setLevel(profileModifyRequestDto.getLevel());
        user.setGender(profileModifyRequestDto.getGender());
        user.setNickname(profileModifyRequestDto.getNickname());
        LocalDateTime localDateTime = LocalDateTime.now();
        user.setUpdatedAt(localDateTime);
        userRepository.save(user);
        return user;
    }

    @Transactional
    @Modifying
    @Override
    public User deleteProfile(User user) {
        LocalDateTime localDateTime = LocalDateTime.now();
        user.setDeletedAt(localDateTime);
        User deleteUser = userRepository.save(user);
        return deleteUser;
    }

}
