package sample;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class SendMailController 
{
    @RequestMapping(value = "/sendMail", method = RequestMethod.POST)
    public @ResponseBody boolean sendMail(@RequestBody Contact contact) {
       System.out.println(">> sendMail content: " + contact.toString());
       return Mailer.send("simedtrieste@gmail.com","12345678x@X",contact.getEmail(),"simedtrieste notify",contact.getContent());
    }
}
