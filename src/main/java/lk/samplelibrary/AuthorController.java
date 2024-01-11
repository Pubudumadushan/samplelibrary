package lk.samplelibrary;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;




@RestController

public class AuthorController {


    @Autowired
    private AuthorRepository authorDao;

    @GetMapping(value = "author/all", produces = "application/json")
    public List<Author>getALL(){

        return authorDao.findAll();
    }
    
    @GetMapping(value = "/author")
    public ModelAndView authorUi() {
        ModelAndView authorView = new ModelAndView();
        authorView.setViewName("author.html");

        return authorView ;
    }



    @PostMapping(value = "/author")
    public String saveBook(@RequestBody Author author){

        try {
            
            authorDao.save(author);
            return "OK";

        } catch (Exception e) {


            return e.getMessage();
            
        }
    }
    
    
    
}
