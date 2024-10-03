package hu.unideb.inf.server.model.users;

import hu.unideb.inf.server.model.base.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "admins")
@Data
public class Admin extends User {
    public Admin() {
        super();
    }
}
