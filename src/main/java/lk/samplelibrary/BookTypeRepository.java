package lk.samplelibrary;

import org.springframework.data.jpa.repository.JpaRepository;

public interface BookTypeRepository extends JpaRepository<BookType,Integer> {
    
}
