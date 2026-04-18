package ma.gov.mega.Library.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import ma.gov.mega.Library.dtos.LivreDto;
import ma.gov.mega.Library.dtos.LivreFilter;
import ma.gov.mega.Library.entities.Livre;
import ma.gov.mega.Library.services.LivreService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("livres")
public class LivreController {
    private final LivreService livreService;

    public LivreController(LivreService livreService) {
        this.livreService = livreService;
    }
    @GetMapping("/{id}")
    public LivreDto getById(@PathVariable Long id) {
        return livreService.getById(id);
    }


    @GetMapping
    public List<LivreDto> getLivres( @RequestParam(required = false) Long auteurId,
            @RequestParam(required = false) Long editeurId,
            @RequestParam(required = false) String categorie
    ){
        LivreFilter filter = new LivreFilter();
        filter.setAuteurId(auteurId);
        filter.setEditeurId(editeurId);
        filter.setCategory(categorie);
        return livreService.getAll(filter);
    }


    @PostMapping( consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public LivreDto save(@RequestParam("livreDto") String livreDtoJson,
                         @RequestParam(value = "image", required = false) MultipartFile image) throws Exception {

        ObjectMapper objectMapper = new ObjectMapper();
        LivreDto livreDto = objectMapper.readValue(livreDtoJson, LivreDto.class);
        return livreService.save(livreDto, image);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        livreService.delete(id);
    }

    @PutMapping(value = "{id}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public LivreDto update(@PathVariable Long id,
                           @RequestParam("livreDto") String livreDtoJson,
                           @RequestParam(value = "image",required = false) MultipartFile image ) throws Exception {
        ObjectMapper objectMapper = new ObjectMapper();
        LivreDto livreDto = objectMapper.readValue(livreDtoJson, LivreDto.class);

        return livreService.update(id, livreDto, image);
    }
}
