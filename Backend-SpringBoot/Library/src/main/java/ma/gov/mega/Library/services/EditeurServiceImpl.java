package ma.gov.mega.Library.services;

import ma.gov.mega.Library.dtos.EditeurDto;
import ma.gov.mega.Library.entities.Editeur;
import ma.gov.mega.Library.entities.Livre;
import ma.gov.mega.Library.mappers.EditeurMapper;
import ma.gov.mega.Library.repositories.EditeurRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class EditeurServiceImpl implements EditeurService {
    private final EditeurMapper editeurMapper;

    private final EditeurRepository editeurRepository;

    public EditeurServiceImpl(EditeurMapper editeurMapper, EditeurRepository editeurRepository) {
        this.editeurMapper = editeurMapper;
        this.editeurRepository = editeurRepository;
    }


    @Override
    public EditeurDto update(Long id, EditeurDto editeurDto) {
        Editeur editeur = editeurRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Editeur not found"));

        editeurMapper.updateFromDto(editeurDto, editeur);

        Editeur updated = editeurRepository.save(editeur);

        return editeurMapper.toDto(updated);

    }

    @Override
    public List<EditeurDto> findAll() {
        List<Editeur> editeurs = editeurRepository.findAll();

        return editeurs.stream()
                .map(editeurMapper::toDto)
                .collect(Collectors.toList());
    }

    @Override
    public EditeurDto findById(Long id) {
        Editeur editeur = editeurRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Editeur Not Found"));
        return editeurMapper.toDto(editeur);
    }

    @Override
    public void delete(Long id) {
        editeurRepository.deleteById(id);

    }

    @Override
    public EditeurDto save(EditeurDto dto) {

        Editeur editeur = editeurMapper.toEntity(dto);

        if (editeur.getAddress() == null && dto.getAddress() != null) {
            editeur.setAddress(dto.getAddress());
        }

        return editeurMapper.toDto(editeurRepository.save(editeur));
    }
}