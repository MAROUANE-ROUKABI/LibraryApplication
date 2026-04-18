package ma.gov.mega.Library.services;

import ma.gov.mega.Library.dtos.LivreDto;
import ma.gov.mega.Library.dtos.LivreFilter;
import ma.gov.mega.Library.entities.Auteur;
import ma.gov.mega.Library.entities.Category;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface LivreService {
     LivreDto getById(Long id);
     List<LivreDto> getAll(LivreFilter filter);
     LivreDto  save(LivreDto livreDto, MultipartFile image);
     void delete(Long id);
     LivreDto update(Long id,LivreDto livreDto,MultipartFile image);

}
