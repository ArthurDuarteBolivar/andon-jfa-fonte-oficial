package com.api.nodemcu.controllers;

import com.api.nodemcu.model.FontesModel;
import com.api.nodemcu.model.NodemcuModel;
import com.api.nodemcu.model.OperationModel;
import com.api.nodemcu.repository.FontesRepository;

import jakarta.transaction.Transactional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/fonte")
public class FontesController {

    @Autowired
    FontesRepository repository;

    @GetMapping()
    public List<FontesModel> listAll() {
        return repository.findAll();
    }

    @Transactional
    @GetMapping("/{modelo}/{isCurrent}")
    public void Update(@PathVariable String modelo, @PathVariable Boolean isCurrent) {
        FontesModel fontes = repository.findBymodelo(modelo);
        fontes.setIs_current(isCurrent);
    }

    @PostMapping()
    public FontesModel post(@RequestBody FontesModel fonte) {
        return repository.save(fonte);
    }

}