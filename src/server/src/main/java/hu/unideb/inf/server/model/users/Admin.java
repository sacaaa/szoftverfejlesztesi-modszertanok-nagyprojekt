package hu.unideb.inf.server.model.users;

import hu.unideb.inf.server.model.base.User;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "admins")
@Data
public class Admin extends User {
}
