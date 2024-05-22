package com.api.nodemcu.controllers;

import com.api.nodemcu.model.NodemcuModel;
import com.api.nodemcu.model.OperationModel;
import com.api.nodemcu.repository.NodemcuRepository;
import com.api.nodemcu.repository.OperationRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/nodemcu")
public class NodemcuController {


    @Autowired
    private NodemcuRepository repository;

    @Autowired
    private OperationRepository operationRepository;




    @GetMapping("/{name}")
    public NodemcuModel findByName(@PathVariable String name) {
        System.out.println(name);
        OperationModel operation = operationRepository.findByName(name);
        System.out.println(operation);
        NodemcuModel nodemcu = repository.findByNameId(operation);
        System.out.println(nodemcu);
        return nodemcu;
    }


}