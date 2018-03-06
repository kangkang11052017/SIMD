package com.simedtrieste.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.simedtrieste.dao.constant.Const;
import com.simedtrieste.model.user.Contact;

@Controller
@RequestMapping("/api")
public class SendMailController 
{
    @RequestMapping(value = "/sendMail", method = RequestMethod.POST)
    public @ResponseBody boolean sendMail(@RequestBody Contact contact) {
       System.out.println(">> sendMail content: " + contact.toString());
       return Mailer.send(Const.mailServer,Const.mailPass,contact.getEmail(),Const.mailTitle,contact.getContent());
    }
}
