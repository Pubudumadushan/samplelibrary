package lk.samplelibrary;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface BookRepository extends JpaRepository<Book,Integer> {


                                            //kiveni parameter ekada //
    @Query(value = "SELECT b FROM Book b WHERE b.isbn=?1")
    Book getByIsbn(String isbn);

    @Query(value = "select lpad(max(bookid)+1,4,0)as bookid from book",nativeQuery = true)
    String getNextBookId();

    
}
