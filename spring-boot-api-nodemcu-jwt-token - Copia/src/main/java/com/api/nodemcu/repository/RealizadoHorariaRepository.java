package com.api.nodemcu.repository;

import com.api.nodemcu.model.OperationModel;
import com.api.nodemcu.model.RealizadoHorariaModel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RealizadoHorariaRepository extends JpaRepository<RealizadoHorariaModel, Integer> {
    List<RealizadoHorariaModel> findAll();

    <RealizadoHorariaMod extends RealizadoHorariaModel> RealizadoHorariaMod save(RealizadoHorariaMod nodemcu);
}
