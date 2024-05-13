package com.api.nodemcu.model;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;
import java.util.TimeZone;

@Entity
@Data
@Table(name = "realizado")
public class ControleRealizadoModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    private Integer imposto;

    private Integer realizado;

    private Integer realizadoHora;
    private String justificativa;

    private Date data;

    @PrePersist
    protected void prePersist() {
        if (this.data == null) {
            TimeZone.setDefault(TimeZone.getTimeZone("America/Sao_Paulo"));
            data = new Date();
        }
    }

}