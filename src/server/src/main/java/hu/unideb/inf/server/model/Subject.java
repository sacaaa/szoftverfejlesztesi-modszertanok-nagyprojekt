package hu.unideb.inf.server.model;

import hu.unideb.inf.server.model.base.BaseEntity;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "subjects")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Subject extends BaseEntity {

    @Column(name = "name", nullable = false, unique = true)
    private String name;

}

