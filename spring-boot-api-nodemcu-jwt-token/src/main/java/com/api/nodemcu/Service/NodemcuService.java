package com.api.nodemcu.Service;

import com.api.nodemcu.model.NodemcuModel;
import com.api.nodemcu.model.OperationModel;
import com.api.nodemcu.repository.NodemcuRepository;
import com.api.nodemcu.repository.OperationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class NodemcuService {

    @Autowired
    private NodemcuRepository repository;

    @Autowired
    private OperationRepository operationRepository;

    public void iniciarTempo(String name, Integer tempo) {
        System.out.println("Chegou");
        System.out.println(name);
        System.out.println(tempo);
        OperationModel operation = operationRepository.findByName(name);
        NodemcuModel device = repository.findByNameId(operation);
        if(tempo == 0){
            device.setLocalTC(0);
            repository.save(device);
            return;
        }
        device.setLocalTC(tempo);
        repository.save(device);
    }
}
