package com.api.nodemcu.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.api.nodemcu.model.ControleGeralModel;
import com.api.nodemcu.model.MainModel;
import com.api.nodemcu.model.OperationModel;
import com.api.nodemcu.repository.ControleGeralRepository;

@RestController
@RequestMapping("/api/v1/geral")
public class ControleGeralController {

    @Autowired
    ControleGeralRepository controleGeralRepository;

    @GetMapping()
    public List<ControleGeralModel> listAll() {
        return controleGeralRepository.findAll();
    }

    @PostMapping()
    public ControleGeralModel post(@RequestBody ControleGeralModel item) {
        controleGeralRepository.save(item);
        return item;
    }

}
