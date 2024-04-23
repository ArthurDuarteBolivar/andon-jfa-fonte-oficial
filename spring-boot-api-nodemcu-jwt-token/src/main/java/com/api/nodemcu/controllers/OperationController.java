package com.api.nodemcu.controllers;

import com.api.nodemcu.model.NodemcuModel;
import com.api.nodemcu.model.OperationModel;
import com.api.nodemcu.repository.NodemcuRepository;
import com.api.nodemcu.repository.OperationRepository;

import jakarta.transaction.Transactional;

import org.apache.coyote.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/operation")
public class OperationController {

    @Autowired
    OperationRepository repository;

    @Autowired
    NodemcuRepository nodemcuRepository;

    @PostMapping()
    public OperationModel post(@RequestBody OperationModel operation) {
        repository.save(operation);
        return operation;
    }

    @GetMapping("/{name}")
    public OperationModel getByName(@PathVariable String name) {
        return repository.findByName(name);
    }


    @Transactional
    @GetMapping("/{name}/{ocupado}")
    public ResponseEntity<String> updateOcupadoByName(@PathVariable String name, @PathVariable Boolean ocupado) {
        OperationModel operation = repository.findByName(name);
        if (operation != null) {
            repository.updateOcupadoByName(ocupado, operation.getId());
            return ResponseEntity.ok("Ocupado atualizado com sucesso para " + name);
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Operação não encontrada para o nome " + name);
        }
    }

    @GetMapping("/pausa/{pausa}")
    public void updatePausa(@PathVariable Boolean pausa){
        List<NodemcuModel> nodemcu = nodemcuRepository.findAll();
        for(NodemcuModel item : nodemcu){
            item.setState("verde");
            nodemcuRepository.save(item);
        }
        List<OperationModel> operation = repository.findAll();
        for (OperationModel op : operation) {
            op.setPausa(pausa);
            repository.save(op);
        }
    }

}
