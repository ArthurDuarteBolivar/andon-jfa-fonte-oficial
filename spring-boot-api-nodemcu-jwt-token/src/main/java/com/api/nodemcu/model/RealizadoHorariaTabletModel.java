package com.api.nodemcu.model;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "realizadohoraria_tablet")
public class RealizadoHorariaTabletModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @OneToOne
    @JoinColumn(name = "name_id")
    private OperationModel nameId;

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
