package ma.gov.mega.Library.entities;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Entity
@Table(name="editeur")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Editeur {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nom;

    @Embedded
    private Address address;
    @OneToMany(mappedBy = "editeur", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Livre> livres;
}
