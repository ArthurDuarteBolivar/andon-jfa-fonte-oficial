package com.api.nodemcu.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.api.nodemcu.model.ControleGeralModel;
import com.api.nodemcu.model.MainModel;

public interface ControleGeralRepository extends JpaRepository<ControleGeralModel, Integer>{

        List<ControleGeralModel> findAll();

    Optional<ControleGeralModel> findById(Integer id);

    <ControleGeralMod extends ControleGeralModel> ControleGeralMod save(ControleGeralMod nodemcu);
    
}
