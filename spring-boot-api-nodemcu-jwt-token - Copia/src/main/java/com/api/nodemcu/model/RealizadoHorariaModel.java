package com.api.nodemcu.model;

import jakarta.persistence.*;
import lombok.Data;

    @Entity
    @Data
    @Table(name="realizadohoraria")
public class RealizadoHorariaModel {

        @Id
        @GeneratedValue(strategy = GenerationType.IDENTITY)
        @Column(name = "id")
        private Integer id;
        private Integer horas7;
        private Integer horas8;
        private Integer horas9;
        private Integer horas10;
        private Integer horas11;
        private Integer horas12;
        private Integer horas13;
        private Integer horas14;
        private Integer horas15;
        private Integer horas16;
        private Integer horas17;
}
