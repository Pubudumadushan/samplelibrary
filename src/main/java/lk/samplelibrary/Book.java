package lk.samplelibrary;


import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "book")

@Data
@AllArgsConstructor
@NoArgsConstructor

public class Book {


    @Id//set primary key
    @Column(name = "id", unique = true)// collum name mapping
    @GeneratedValue(strategy = GenerationType.IDENTITY)  //AI
    private Integer id ;

    @Column(name = "bookid", unique = true)
    @NotNull
    private String bookid;

    @Column(name = "name")
    @NotNull
    private String name;

    @Column(name = "language")
    @NotNull 
    private String language;

    @Column(name = "edition")
    @NotNull 
    private Integer edition ;

    @Column(name = "isbn",unique = true)
    @NotNull
    private String isbn; 

    @Column(name = "deleted")
    private Boolean delete; 


    //foreign
    @ManyToOne
    @JoinColumn(name ="author_id", referencedColumnName = "id")
    private Author author_id ;


    @ManyToOne
    @JoinColumn(name = "booktype_id",referencedColumnName = "id")
    private BookType booktype_id;

    //test
}
