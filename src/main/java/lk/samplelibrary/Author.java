package lk.samplelibrary;


import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "author")

@Data
@AllArgsConstructor
@NoArgsConstructor

public class Author {

    @Id
    @Column(name = "id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id ;

    
    @Column(name = "name")
    @NotNull
    private String name ;

    @Column(name = "address")
    @NotNull
    private String address ;

    @Column(name = "contactnumber")
    @NotNull 
    private String contactnumber ;

    @Column(name = "email") 
    private String email ;

    @Column(name = "dob")
    @NotNull 
    private LocalDate dob;


    
}
