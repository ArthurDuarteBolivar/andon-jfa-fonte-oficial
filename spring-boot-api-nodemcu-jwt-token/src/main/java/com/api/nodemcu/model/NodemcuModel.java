package com.api.nodemcu.model;

import jakarta.persistence.*;
import lombok.Data;
import org.apache.catalina.User;

import java.math.BigInteger;
import java.util.Date;
import java.util.List;
import java.util.TimeZone;

@Entity
@Data
@Table(name="thdados")
public class NodemcuModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @OneToOne
    @JoinTable(name = "nameId")
    private OperationModel nameId;

    @ManyToOne
    @JoinTable(name = "fontesId")
    private FontesModel fontesId;

    private Integer count;

    private Integer time;

    private String state;

    private Date data;

    private Integer currentTC;

    private Integer maintenance;

    private Integer firtlastTC;

    private Integer secondtlastTC;

    private Integer thirdlastTC;

    private Integer shortestTC;

    private Integer QtdeTCexcedido;

    private Integer TCmedio;

    private Integer localTC;

    @PrePersist
    protected void prePersist() {
        if (this.data == null){
            TimeZone.setDefault(TimeZone.getTimeZone("America/Sao_Paulo"));
            data = new Date();
        }
    }

}

