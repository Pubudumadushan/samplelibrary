package lk.samplelibrary;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

//import com.mysql.cj.x.protobuf.MysqlxDatatypes.Scalar.String;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
public class BookController {

    @Autowired
    private BookRepository bookDao;

    @GetMapping(value = "/book/all", produces = "application/json")

    public List<Book> getAll(){

        return bookDao.findAll();


    }

    @GetMapping(value = "/book")
    public ModelAndView BOOKuI(){

        ModelAndView bookView = new ModelAndView();
        bookView.setViewName("book.html");
        return bookView;

    }

  

    @PostMapping(value = "/book")
    public String saveBook(@RequestBody Book book){

        //check duplicates
        Book bookISBN = bookDao.getByIsbn(book.getIsbn());
        if(bookISBN !=null){

            return "This ISBN is already exists";
        }

       

        //set autogenatated values
        //book.setBookid("0003");

        try {

            String nextBookId = bookDao.getNextBookId();

            if(nextBookId == null){
                book.setBookid("0001");
        
            }
            else{
                book.setBookid(nextBookId);
            }


            bookDao.save(book);
            return "Ok";

        } catch (Exception e) {
            
            return e.getMessage();
        }

    }


    

    @PutMapping(value = "/book")
    public String updateBook(@RequestBody Book book){

        Book exisBook = bookDao.getReferenceById(book.getId());

        if(exisBook == null){

            return "No Such Record";
        }


        //check duplicate isbn
        
        Book uniqueIsbn = bookDao.getByIsbn(book.getIsbn());

        if (uniqueIsbn == null || book.getIsbn().equals(uniqueIsbn.getIsbn())) {

            bookDao.save(book);
            return "OK";
            
        }else{

            return "ISBN Already Exist in the database";
        }

    }




    @DeleteMapping(value = "/book")
    public String deleteBook(@RequestBody Book book ){

        try {
            book.setDelete(true);
            bookDao.save(book);
            return "OK";

        } catch (Exception e) {
            
            return "Failed "+ e.getMessage();
        }
    }


    
    
}
