package ma.gov.mega.Library.mappers;

import ma.gov.mega.Library.dtos.AuteurDto;
import ma.gov.mega.Library.entities.Auteur;
import org.mapstruct.BeanMapping;
import org.mapstruct.Mapper;
import org.mapstruct.MappingTarget;
import org.mapstruct.NullValuePropertyMappingStrategy;

@Mapper(componentModel = "spring")
public interface AuteurMapper {
    Auteur toEntity(AuteurDto auteurDto);
    AuteurDto toDto(Auteur auteur);
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateFromDto(AuteurDto dto, @MappingTarget Auteur auteur);
}
