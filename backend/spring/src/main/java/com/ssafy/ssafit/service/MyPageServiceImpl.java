package com.ssafy.ssafit.service;

import com.ssafy.ssafit.dto.response.DateAndExerciseHistoryDto;
import com.ssafy.ssafit.dto.response.ExerciseAndBookmark;
import com.ssafy.ssafit.dto.response.ExerciseAndBookmarkDto;
import com.ssafy.ssafit.repository.ExerciseHistoryRepository;
import com.ssafy.ssafit.util.CalendarUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class MyPageServiceImpl implements MyPageService {

    @Autowired
    private ExerciseHistoryRepository exerciseHistoryRepository;

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
        System.out.println(monday);
        String dateList[] = calendarUtil.getDaysOfWeek(monday, month);


        List<DateAndExerciseHistoryDto> list = new ArrayList<>();
        for (int i = 0; i < dateList.length; i++) {
            System.out.println(dateList[i]);
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

                    boolean flag = (eab.getBookmark() != null) ? true : false;

                    ExerciseAndBookmarkDto eabd = ExerciseAndBookmarkDto.builder()
                            .exerciseId(eab.getExerciseId())
                            .getName(eab.getName())
                            .imageURL(eab.getImageURL())
                            .countPerSet(eab.getCountPerSet())
                            .durationTime(eab.getDurationTime())
                            .bookmark(flag)
                            .build();

                    if(eab.getSetCount() != null){
                        eabd.setSetCount(Integer.parseInt(eab.getSetCount()));
                    }
                    historyList.add(eabd);

                }
                list.add(new DateAndExerciseHistoryDto(dateList[i], historyList));
            }
        }


        return list;
    }
}
