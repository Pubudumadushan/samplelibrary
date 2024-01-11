package lk.samplelibrary;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class BookTypeController {

    @Autowired
    private BookTypeRepository bookTypeDao;

    @GetMapping(value = "booktype/all", produces = "application/json")

    public List<BookType>getALL(){

        return bookTypeDao.findAll();
    }

    
}
