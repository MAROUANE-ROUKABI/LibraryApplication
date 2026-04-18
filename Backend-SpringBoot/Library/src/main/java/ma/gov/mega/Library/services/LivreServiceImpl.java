package ma.gov.mega.Library.services;

import ma.gov.mega.Library.LivreSpecification;
import ma.gov.mega.Library.dtos.LivreDto;
import ma.gov.mega.Library.dtos.LivreFilter;
import ma.gov.mega.Library.entities.Livre;
import ma.gov.mega.Library.exceptions.ResourceNotFoundException;
import ma.gov.mega.Library.mappers.LivreMapper;
import ma.gov.mega.Library.repositories.AuteurRepository;
import ma.gov.mega.Library.repositories.CategoryRepository;
import ma.gov.mega.Library.repositories.EditeurRepository;
import ma.gov.mega.Library.repositories.LivreRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.stream.Collectors;


@Service
public class LivreServiceImpl implements LivreService {
    private final LivreRepository livreRepository;
    private final LivreMapper livreMapper;
    private final AuteurRepository auteurRepository;
    private final EditeurRepository editeurRepository;
    private final CategoryRepository categoryRepository;
    private final FileService fileService;

    public LivreServiceImpl(LivreRepository livreRepository, LivreMapper livreMapper,
                            AuteurRepository auteurRepository, EditeurRepository editeurRepository,
                            CategoryRepository categoryRepository, FileService fileService) {
        this.livreRepository = livreRepository;
        this.livreMapper = livreMapper;
        this.auteurRepository = auteurRepository;
        this.editeurRepository = editeurRepository;
        this.categoryRepository = categoryRepository;
        this.fileService = fileService;
    }

    @Override
    public LivreDto getById(Long id) {
        Livre livre = livreRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Livre not found with id: " + id));
        return livreMapper.toDto(livre);
    }


    @Override
    public List<LivreDto> getAll(LivreFilter filter) {
        return livreRepository.findAll(LivreSpecification.filter(filter))
                .stream()
                .map(livreMapper::toDto)
                .toList();

    }


    private void validateRelations(LivreDto livreDto) {
        if (livreDto.getAuteurId() == null ||
                livreDto.getEditeurId() == null ||
                livreDto.getCategoryId() == null) {
            throw new IllegalArgumentException("Auteur, Editeur and Category are required");
        }
    }

    private void setRelations(Livre livre, LivreDto livreDto) {

        if (livreDto.getAuteurId() != null) {
            livre.setAuteur(
                    auteurRepository.findById(livreDto.getAuteurId())
                            .orElseThrow(() -> new ResourceNotFoundException("Auteur not found with id: " + livreDto.getAuteurId()))
            );
        }

        if (livreDto.getEditeurId() != null) {
            livre.setEditeur(
                    editeurRepository.findById(livreDto.getEditeurId())
                            .orElseThrow(() -> new ResourceNotFoundException("Editeur not found with id: " + livreDto.getEditeurId()))
            );
        }

        if (livreDto.getCategoryId() != null) {
            livre.setCategory(
                    categoryRepository.findById(livreDto.getCategoryId())
                            .orElseThrow(() -> new ResourceNotFoundException("Category not found with id: " + livreDto.getCategoryId()))
            );
        }
    }

    @Override
    public LivreDto save(LivreDto livreDto, MultipartFile image) {
        validateRelations(livreDto);
        Livre livre = livreMapper.toEntity(livreDto);
        setRelations(livre, livreDto);
        try{
            if (image != null && !image.isEmpty()) {
                String imageUrl = fileService.saveImage(image);
                livre.setImageUrl(imageUrl);
            }} catch (Exception e){ throw new RuntimeException("Error saving image", e);}

        return livreMapper.toDto(livreRepository.save(livre));
    }

    @Override
    public void delete(Long id) {
        Livre livre = livreRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Livre not found with id: " + id));
        livreRepository.delete(livre);
    }

    @Override
    public LivreDto update(Long id, LivreDto livreDto, MultipartFile image) {

        Livre livre = livreRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Livre not found"));
        livreMapper.updateFromDto(livreDto, livre);
        setRelations(livre, livreDto);
        try{
        if (image != null && !image.isEmpty()) {
            String url = fileService.saveImage(image);
            livre.setImageUrl(url);
        }} catch (Exception e){ throw new RuntimeException("Error saving image", e);}
        return livreMapper.toDto(livreRepository.save(livre));
    }
}
