package ma.gov.mega.Library.mappers;

import ma.gov.mega.Library.dtos.CategoryDto;
import ma.gov.mega.Library.entities.Category;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface CategoryMapper {
    Category toEntity(CategoryDto categoryDto);
    CategoryDto toDto(Category category);
}