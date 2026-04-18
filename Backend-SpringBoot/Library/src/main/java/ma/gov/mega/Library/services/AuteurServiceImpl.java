package ma.gov.mega.Library.services;

import ma.gov.mega.Library.dtos.AuteurDto;
import ma.gov.mega.Library.entities.Auteur;
import ma.gov.mega.Library.mappers.AuteurMapper;
import ma.gov.mega.Library.repositories.AuteurRepository;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
public class AuteurServiceImpl implements AuteurService {
    private final AuteurRepository auteurRepository;
    private final AuteurMapper auteurMapper;

    public AuteurServiceImpl(AuteurRepository auteurRepository, AuteurMapper auteurMapper) {
        this.auteurRepository = auteurRepository;
        this.auteurMapper = auteurMapper;
    }

    @Override
    public AuteurDto findById(Long id) {
        Auteur auteur = auteurRepository.findById(id)
                .orElseThrow(()-> new RuntimeException("Auteur Not Found"));
        return auteurMapper.toDto(auteur);    }

    @Override
    public List<AuteurDto> findAll() {

        return auteurRepository.findAll()
                .stream()
                .map(auteurMapper::toDto)
                .toList();    }

    @Override
    public AuteurDto save(AuteurDto auteurDto) {
        System.out.println(auteurDto+"2");

        return auteurMapper.toDto(
                auteurRepository.save(
                        auteurMapper.toEntity(auteurDto)));

    }

    @Override
    public void delete(Long id) {
        auteurRepository.deleteById(id);

    }

    @Override
    public AuteurDto update(Long id, AuteurDto auteurDto) {
        Auteur auteur = auteurRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Auteur not found"));

        auteurMapper.updateFromDto(auteurDto, auteur);

        Auteur updated = auteurRepository.save(auteur);

        return auteurMapper.toDto(updated);
    }

}
