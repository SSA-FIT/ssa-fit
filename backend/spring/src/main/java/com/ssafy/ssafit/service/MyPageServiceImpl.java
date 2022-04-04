package com.ssafy.ssafit.service;

import com.ssafy.ssafit.dto.response.DateAndExerciseHistoryDto;
import com.ssafy.ssafit.dto.response.ExerciseAndBookmark;
import com.ssafy.ssafit.dto.response.ExerciseAndBookmarkDto;
import com.ssafy.ssafit.entity.ExerciseBookmark;
import com.ssafy.ssafit.repository.ExerciseBookmarkRepository;
import com.ssafy.ssafit.repository.ExerciseHistoryRepository;
import com.ssafy.ssafit.util.CalendarUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;

@Service
public class MyPageServiceImpl implements MyPageService {

    @Autowired
    private ExerciseHistoryRepository exerciseHistoryRepository;

    @Autowired
    private ExerciseBookmarkRepository exerciseBookmarkRepository;

    @Autowired
    private CalendarUtil calendarUtil;

    @Override
    public List<DateAndExerciseHistoryDto> getMyPageHistory(String year, String month, String week, int userId) {
        String mm;
        if (month.length() == 1) {
            mm = "0" + month;
        } else {
            mm = month;
        }
        String monday = calendarUtil.getMonday(year, mm, week);
        String dateList[] = calendarUtil.getDaysOfWeek(monday, month);

        int sec[] = {3600, 60, 1};
        List<DateAndExerciseHistoryDto> list = new ArrayList<>();
        for (int i = 0; i < dateList.length; i++) {
            if (dateList[i].equals("null")) {
                continue;
            }
            //yy.MM.dd
            String date = "20" + dateList[i].substring(0, 2) + "-" + dateList[i].substring(3, 5) + "-" + dateList[i].substring(6, 8);
            System.out.println(date);
            List<ExerciseAndBookmark> historyListInterface = exerciseHistoryRepository.getMyPageExerciseHistory(date, userId).orElse(null);
            List<ExerciseAndBookmarkDto> historyList = new ArrayList<>();
            if (historyListInterface != null) {
                historyList = new ArrayList<>();

                for (ExerciseAndBookmark eab : historyListInterface) {

                    int isOK = -1;
                    for (int j = 0; j < historyList.size(); j++) {
                        if (eab.getExerciseId() == historyList.get(j).getExerciseId()) {

                            if (eab.getCountPerSet() != null && historyList.get(j).getCountPerSet() != null) {
                                String hisGet = historyList.get(j).getCountPerSet();
                                String eabGet = eab.getCountPerSet();
                                Double countPerSet = Double.parseDouble(hisGet) + Double.parseDouble(eabGet);
                                historyList.get(j).setCountPerSet(String.valueOf(countPerSet));
                            }

                            if (eab.getSetCount() != null) {
                                int setCount = historyList.get(j).getSetCount() + Integer.parseInt(eab.getSetCount());
                                historyList.get(j).setSetCount(setCount);
                            }
                            if (eab.getDurationTime() != null && historyList.get(j).getDurationTime() != null) {
                                String durationTime[] = eab.getDurationTime().split(":", 3);
                                int duration = 0;
                                for (int z = 0; z < 3; z++) {
                                    for (int k = 0; k < durationTime[z].length(); k++) {
                                        if (durationTime[z].charAt(k) != '0') {
                                            duration += ((durationTime[z].charAt(k) - '0') * sec[z] * (int) Math.pow(10, durationTime[z].length() - k - 1));
                                        }
                                    }
                                }
                                duration += Integer.parseInt(historyList.get(j).getDurationTime());
                                historyList.get(j).setDurationTime(String.valueOf(duration));
                            }
                            isOK = j;
                            break;
                        }
                    }

                    if (isOK == -1) {
                        boolean flag = (eab.getBookmark() != null) ? true : false;
                        int duration = 0;
                        if (eab.getDurationTime() != null) {
                            String durationTime[] = eab.getDurationTime().split(":", 3);
                            for (int h = 0; h < 3; h++) {
                                for (int k = 0; k < durationTime[h].length(); k++) {
                                    if (durationTime[h].charAt(k) != '0') {
                                        duration += ((durationTime[h].charAt(k) - '0') * sec[h] * (int) Math.pow(10, durationTime[h].length() - k - 1));
                                    }
                                }
                            }
                        }

                        ExerciseAndBookmarkDto eabd = ExerciseAndBookmarkDto.builder()
                                .exerciseId(eab.getExerciseId())
                                .getName(eab.getName())
                                .imageURL(eab.getImageURL())
                                .countPerSet(eab.getCountPerSet())
                                .durationTime(String.valueOf(duration))
                                .bookmark(flag)
                                .build();

                        if (eab.getSetCount() != null) {
                            eabd.setSetCount(Integer.parseInt(eab.getSetCount()));
                        }
                        historyList.add(eabd);

                    }

                }

                for (int j = 0; j < historyList.size(); j++) {
                    if (historyList.get(j).getDurationTime() != null) {
                        int time = Integer.parseInt(historyList.get(j).getDurationTime());
                        if (time > 0) {
                            int hour = time / 60 / 60;
                            int minute = time / 60 % 60;
                            int second = time % 60;
                            historyList.get(j).setDurationTime(hour + "시간 " + minute + "분 " + second + "초");
                        }else{
                            historyList.get(j).setDurationTime("0시간 0분 0초");
                        }
                    }
                }

                list.add(new DateAndExerciseHistoryDto(dateList[i], historyList));
            }
        }


        return list;
    }

    @Override
    public ExerciseBookmark getBookmarkByExerciseId(int exerciseId, int userId) {
        return exerciseBookmarkRepository.findByExerciseIdAndUserId(exerciseId, userId).orElse(null);
    }

    @Override
    @Modifying
    @Transactional
    public int saveBookmark(int exerciseId, int userId) {
        return exerciseBookmarkRepository.saveBookmark(exerciseId, userId);
    }

    @Override
    @Modifying
    @Transactional
    public int deleteBookmark(int id) {
        return exerciseBookmarkRepository.deleteBookmark(id);
    }
}
