package ma.gov.mega.Library.controllers;

import ma.gov.mega.Library.dtos.AuteurDto;
import ma.gov.mega.Library.entities.Auteur;
import ma.gov.mega.Library.services.AuteurService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/auteurs")
public class AuteurController {

    private final AuteurService auteurService;

    public AuteurController(AuteurService auteurService) {
        this.auteurService = auteurService;
    }
    @GetMapping("/{id}")
    public AuteurDto findById(@PathVariable Long id){
        return auteurService.findById(id);
    }
    @GetMapping
    public List<AuteurDto> findAll(){
        return auteurService.findAll();
    }
    @PostMapping
    public AuteurDto save(@RequestBody AuteurDto auteurDto){
        System.out.println(auteurDto+"1");
        return auteurService.save(auteurDto);
    }
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id){
        auteurService.delete(id);
    }
    @PutMapping("/{id}")
    public AuteurDto update(@PathVariable Long id, @RequestBody AuteurDto auteurDto){
        return auteurService.update(id,auteurDto);

    }
}
