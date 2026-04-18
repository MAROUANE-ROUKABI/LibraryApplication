package ma.gov.mega.Library.dtos;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@JsonIgnoreProperties(value = {"id"}, allowGetters = true)
public class LivreDto {
        private Long id;
        private String titre;
        private Integer pages;
        private String ImageUrl;
        private String description;
        private Date datePublication;
        @NotNull(message = "Author ID is required")
        private Long auteurId;
        @NotNull(message = "Editor ID is required")
        private Long editeurId;
        @NotNull(message = "Category ID is required")
        private Long categoryId;
        private String auteurPrenom;
        private String auteurNom;
        private String editeurNom;
        private String categoryName;
    }

