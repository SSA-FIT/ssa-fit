package com.ssafy.ssafit.service;

import com.ssafy.ssafit.dto.request.ProfileModifyRequestDto;
import com.ssafy.ssafit.dto.request.SignUpRequestDto;
import com.ssafy.ssafit.entity.User;
import com.ssafy.ssafit.repository.UserRepository;
import com.ssafy.ssafit.util.CryptUtil;
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
        User user = userRepository.findByUserId(userId).orElse(null);
        if(user != null){
            CryptUtil.Aes aes = CryptUtil.getAES();
            String Height = null;
            String Weight = null;
            String Bmi = null;
            try {
                Height = aes.decrypt(user.getHeight());
                Weight = aes.decrypt(user.getWeight());
                Bmi = aes.decrypt(user.getBmi());
                user.setHeight(Height);
                user.setWeight(Weight);
                user.setBmi(Bmi);
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
        return user;
    }

    @Override
    public User emailCheck(String email) {
        return userRepository.findByEmail(email).orElse(null);
    }

    @Transactional
    @Modifying
    @Override
    public User saveUser(SignUpRequestDto signUpRequestDto) {

        double height = Double.parseDouble(signUpRequestDto.getHeight());
        height /= 100;
        double weight = Double.parseDouble(signUpRequestDto.getWeight());
        double bmi = weight / (height * height);

        CryptUtil.Aes aes = CryptUtil.getAES();
        String Height = null;
        String Weight = null;
        String Bmi = null;
        try {
            Height = aes.encrypt(signUpRequestDto.getHeight());
            Weight = aes.encrypt(signUpRequestDto.getWeight());
            Bmi = aes.encrypt(String.valueOf(bmi).substring(0, 4));
        } catch (Exception e) {
            e.printStackTrace();
        }

        User user = User.builder()
                .height(Height)
                .weight(Weight)
                .birth(signUpRequestDto.getBirth())
                .level(signUpRequestDto.getLevel())
                .email(signUpRequestDto.getEmail())
                .userId(signUpRequestDto.getUserId())
                .nickname(signUpRequestDto.getNickname())
                .password(passwordEncoder.encode(signUpRequestDto.getPassword()))
                .gender(signUpRequestDto.getGender())
                .bmi(Bmi)
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

    @Override
    public User getUserByUserId(String userId) {

        return userRepository.findByUserId(userId).orElse(null);

    }

    @Transactional
    @Modifying
    @Override
    public User modifyProfile(String userId, ProfileModifyRequestDto profileModifyRequestDto) {

        double height = Double.parseDouble(profileModifyRequestDto.getHeight());
        height /= 100;
        double weight = Double.parseDouble(profileModifyRequestDto.getWeight());
        double bmi = weight / (height * height);

        CryptUtil.Aes aes = CryptUtil.getAES();
        String Height = null;
        String Weight = null;
        String Bmi = null;
        try {
            Height = aes.encrypt(profileModifyRequestDto.getHeight());
            Weight = aes.encrypt(profileModifyRequestDto.getWeight());
            Bmi = aes.encrypt(String.valueOf(bmi).substring(0, 4));
        } catch (Exception e) {
            e.printStackTrace();
        }

        User user = userRepository.findByUserId(userId).orElse(null);
        user.setBirth(profileModifyRequestDto.getBirth());
        user.setHeight(Height);
        user.setWeight(Weight);
        user.setLevel(profileModifyRequestDto.getLevel());
        user.setGender(profileModifyRequestDto.getGender());
        user.setNickname(profileModifyRequestDto.getNickname());
        user.setBmi(Bmi);
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
