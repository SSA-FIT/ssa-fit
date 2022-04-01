package com.ssafy.ssafit.util;

import org.springframework.stereotype.Component;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;

@Component
public class CalendarUtil {

    // 특정 년,월,주 차에 월요일 구하기
    public static String getMonday(String yyyy, String mm, String wk) {

        java.text.SimpleDateFormat formatter = new java.text.SimpleDateFormat("yy.MM.dd");

        Calendar c = Calendar.getInstance();

        int y = Integer.parseInt(yyyy);

        int m = Integer.parseInt(mm) - 1;

        int w = Integer.parseInt(wk);

        c.set(Calendar.YEAR, y);

        c.set(Calendar.MONTH, m);

        c.set(Calendar.WEEK_OF_MONTH, w);

        c.set(Calendar.DAY_OF_WEEK, Calendar.MONDAY);

        return formatter.format(c.getTime());

    }

    public static String[] getDaysOfWeek(String dateStr, String nowMonth) {
        DateFormat df = new SimpleDateFormat("yy.MM.dd");
        String[] arrYMD = new String[7];
        try {
            Date date = df.parse(dateStr);
            Calendar cal = Calendar.getInstance();
            cal.setTime(date);

            int inYear = cal.get(cal.YEAR);
            int inMonth = cal.get(cal.MONTH);
            int inDay = cal.get(cal.DAY_OF_MONTH);

            int yoil = cal.get(cal.DAY_OF_WEEK); // 요일나오게하기(숫자로)
            if (yoil != 1) { // 해당요일이 일요일이 아닌경우
                yoil = yoil - 2;
            } else { // 해당요일이 일요일인경우
                yoil = 7;
            }
            inDay = inDay - yoil;

            for (int i = 0; i < 7; i++) {
                cal.set(inYear, inMonth, inDay + i); //
                String y = Integer.toString(cal.get(cal.YEAR));
                String m = Integer.toString(cal.get(cal.MONTH) + 1);
                String d = Integer.toString(cal.get(cal.DAY_OF_MONTH));

                if (!m.equals(nowMonth)) {
                    arrYMD[i] = "null";
                    continue;
                }
                if (m.length() == 1)
                    m = "0" + m;
                if (d.length() == 1)
                    d = "0" + d;

                // arrYMD[i] = y+m +d;
                arrYMD[i] = y.substring(2, 4) + "." + m + "." + d;
            }
        } catch (ParseException e) {
        }

        return arrYMD;
    }
}