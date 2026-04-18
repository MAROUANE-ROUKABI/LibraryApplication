package ma.gov.mega.Library.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


import java.util.Date;

@Entity
@Table(name="livre")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Livre {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String titre;
    @Lob
    @Column(columnDefinition = "TEXT")
    private String description;
    private String ImageUrl;
    private int pages;
    private Date datePublication;
//    @Enumerated(EnumType.STRING)
//    private String categorie;
    @ManyToOne
    @JoinColumn(name="id_auteur")
    private Auteur auteur;
    @ManyToOne
    @JoinColumn(name="id_editeur")
    private Editeur editeur;
    @ManyToOne
    @JoinColumn(name="id_category")
    private Category category;
}
