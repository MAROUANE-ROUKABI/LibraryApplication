package ma.gov.mega.Library.mappers;

import ma.gov.mega.Library.dtos.EditeurDto;
import ma.gov.mega.Library.entities.Editeur;
import org.mapstruct.*;

@Mapper(componentModel = "spring")

public interface EditeurMapper {



        @Mapping(target = "address", source = "address")
        Editeur toEntity(EditeurDto dto);

        @Mapping(target = "address", source = "address")
        EditeurDto toDto(Editeur entity);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    @Mapping(target = "address", source = "address")
    void updateFromDto(EditeurDto dto, @MappingTarget Editeur editeur);
}
