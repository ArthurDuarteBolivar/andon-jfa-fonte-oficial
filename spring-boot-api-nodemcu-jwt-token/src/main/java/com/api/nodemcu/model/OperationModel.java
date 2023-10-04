package com.api.nodemcu.model;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;
import java.util.List;
import java.util.TimeZone;

@Entity
@Data
@Table(name="operaion")
public class OperationModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    private String name;

    private Integer limitedTime;


}

