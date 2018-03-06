package com.simedtrieste.controller;
import java.util.Properties;    
import javax.mail.*;    
import javax.mail.internet.*;    
class Mailer{  
    public static boolean send(String from, String password ,String to, String sub,String msg){  
          //Get properties object    
          Properties props = new Properties();    
	  	    props.put("mail.smtp.host", "smtp.gmail.com");
	  	    props.put("mail.from", from);
	  	    props.put("mail.smtp.starttls.enable", "true");
	  	    props.put("mail.smtp.port", "587");
	  	    props.setProperty("mail.debug", "false");  
	  	    props.put("mail.smtp.ssl.trust", "smtp.gmail.com");
	  	    props.setProperty("mail.smtp.user", from);
	  	    props.setProperty("mail.smtp.password", password);
	  	    props.setProperty("mail.smtp.auth", "true"); 	  	    
          //get Session   
          Session session = Session.getDefaultInstance(props,    
           new javax.mail.Authenticator() {    
           protected PasswordAuthentication getPasswordAuthentication() {    
           return new PasswordAuthentication(from,password);  
           }    
          });    
          
          
          //compose message    
          try {    
           MimeMessage message = new MimeMessage(session);    
           message.addRecipient(Message.RecipientType.TO, new InternetAddress(to));    
           message.setSubject(sub);    
           message.setText(msg);    
           //send message  
           System.out.println("message sent mail");   
           Transport.send(message);    
           System.out.println("message sent successfully");    
          } catch (Exception e) 
          {
        	  System.out.println("error send mail: " + e.toString());   
        	  return false;
          }    
          return true;
             
    }  
}  
  