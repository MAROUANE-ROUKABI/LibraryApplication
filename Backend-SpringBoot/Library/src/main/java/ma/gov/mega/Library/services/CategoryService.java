package ma.gov.mega.Library.services;

import ma.gov.mega.Library.dtos.AuteurDto;
import ma.gov.mega.Library.dtos.CategoryDto;

import java.util.List;

public interface CategoryService {
    List<CategoryDto> findAll();
    CategoryDto findById(Long id);
    void deleteById(Long id);
    void save(CategoryDto categoryDto);
    void update(CategoryDto categoryDto);
}
