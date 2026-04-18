package ma.gov.mega.Library.controllers;

import ma.gov.mega.Library.dtos.EditeurDto;
import ma.gov.mega.Library.services.EditeurService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequestMapping("editeurs")
public class EditeurController {
    private final EditeurService editeurService;

    public EditeurController( EditeurService editeurService) {
        this.editeurService = editeurService;
    }

    @PutMapping("/{id}")
    public EditeurDto update(@PathVariable Long id, @RequestBody EditeurDto editeurDto){
        return editeurService.update(id, editeurDto);
    }
    @GetMapping
    public List<EditeurDto> findAll(){
        return editeurService.findAll();
    }
    @GetMapping("/{id}")
    public EditeurDto findById(@PathVariable Long id){
        return editeurService.findById(id);
    }
    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id){
        editeurService.delete(id);
    }
    @PostMapping
    public EditeurDto save(@RequestBody EditeurDto editeurDto){
        System.out.println(editeurDto.getAddress());
        return editeurService.save(editeurDto);
    }
}
