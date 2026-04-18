package ma.gov.mega.Library.dtos;

import lombok.Data;

@Data
public class LivreFilter {
    private Long auteurId;
    private Long editeurId;
    private String category;

}