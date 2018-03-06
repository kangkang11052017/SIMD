package com.simedtrieste.models;

import com.simedtrieste.model.base.BaseMessage;

public class PersonReferalDTO extends BaseMessage {

    private String fullName;
    private String mobilePhone;
    private String jobTitle;
    private String companyName;

    public String getFullName() {

        return fullName;
    }

    public void setFullName(String fullName) {

        this.fullName = fullName;
    }

    public String getMobilePhone() {

        return mobilePhone;
    }

    public void setMobilePhone(String mobilePhone) {

        this.mobilePhone = mobilePhone;
    }

    public String getJobTitle() {

        return jobTitle;
    }

    public void setJobTitle(String jobTitle) {

        this.jobTitle = jobTitle;
    }

    public String getCompanyName() {

        return companyName;
    }

    public void setCompanyName(String companyName) {

        this.companyName = companyName;
    }

}