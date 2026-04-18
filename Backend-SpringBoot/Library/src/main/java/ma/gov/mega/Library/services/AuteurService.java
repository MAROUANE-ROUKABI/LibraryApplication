package ma.gov.mega.Library.services;

import ma.gov.mega.Library.dtos.AuteurDto;

import java.util.List;

public interface AuteurService {
     AuteurDto findById(Long id);
     List<AuteurDto> findAll();
     AuteurDto save(AuteurDto auteurDto);
     void delete(Long id);
     AuteurDto update(Long id, AuteurDto auteurDto);
}
