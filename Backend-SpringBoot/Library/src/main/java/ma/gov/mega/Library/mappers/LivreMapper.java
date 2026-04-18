package ma.gov.mega.Library.mappers;

import ma.gov.mega.Library.dtos.LivreDto;
import ma.gov.mega.Library.entities.Livre;
import org.mapstruct.*;


@Mapper(componentModel = "spring")
public interface LivreMapper {

    @Mapping(target = "auteur", ignore = true)
    @Mapping(target = "editeur", ignore = true)
    @Mapping(target = "category", ignore = true)
    Livre toEntity(LivreDto livreDto);

    @Mapping(source = "auteur.id", target = "auteurId")
    @Mapping(source = "auteur.prenom", target = "auteurPrenom")
    @Mapping(source = "auteur.nom", target = "auteurNom")
    @Mapping(source = "editeur.id", target = "editeurId")
    @Mapping(source = "editeur.nom", target = "editeurNom")
    @Mapping(source = "category.id", target = "categoryId")
    @Mapping(source = "category.name", target = "categoryName")
    LivreDto toDto(Livre livre);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(target = "auteur", ignore = true)
    @Mapping(target = "editeur", ignore = true)
    @Mapping(target = "category", ignore = true)
    void updateFromDto(LivreDto dto, @MappingTarget Livre livre);
}
