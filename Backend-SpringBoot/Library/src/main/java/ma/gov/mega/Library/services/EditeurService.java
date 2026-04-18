package ma.gov.mega.Library.services;

import ma.gov.mega.Library.dtos.EditeurDto;

import java.util.List;

public interface EditeurService {
     EditeurDto update(Long id,EditeurDto editeurDto);
     List<EditeurDto> findAll();
     EditeurDto findById(Long id);
     void delete(Long id);
     EditeurDto save(EditeurDto editeurDto);
}
