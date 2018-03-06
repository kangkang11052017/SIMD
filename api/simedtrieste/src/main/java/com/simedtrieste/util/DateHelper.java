package com.simedtrieste.util;

public class DateHelper {
	public static Long convertDateTimetoNumber(String sDate) {
    	java.sql.Timestamp ts2 = java.sql.Timestamp.valueOf(sDate);
        return ts2.getTime();    	
	}
}
