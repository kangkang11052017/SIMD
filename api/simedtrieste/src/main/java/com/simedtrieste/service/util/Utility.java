package com.simedtrieste.service.util;

import java.util.Random;

public class Utility {

    public static String getAssignmentNo() {

        String SALTCHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
        String SALTNUMS = "1234567890";
        StringBuilder str1 = new StringBuilder();
        Random rnd = new Random();
        while (str1.length() < 3) {
            int index = (int) (rnd.nextFloat() * SALTCHARS.length());
            str1.append(SALTCHARS.charAt(index));
        }
        StringBuilder str2 = new StringBuilder();
        Random rnd2 = new Random();
        while (str2.length() < 5) {
            int index = (int) (rnd2.nextFloat() * SALTNUMS.length());
            str2.append(SALTNUMS.charAt(index));
        }

        String saltStr = str1.toString() + '-' + str2.toString();
        return saltStr;
    }
}
