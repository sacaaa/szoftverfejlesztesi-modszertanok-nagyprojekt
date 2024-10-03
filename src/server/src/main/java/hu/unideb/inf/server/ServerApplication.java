package hu.unideb.inf.server;

import hu.unideb.inf.server.model.logger.MyLogger;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.io.File;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

@SpringBootApplication
@EnableJpaAuditing
public class ServerApplication {

	public static void main(String[] args) {
		checkDatabase();
		SpringApplication.run(ServerApplication.class, args);
	}

	@Bean
	public BCryptPasswordEncoder bCryptPasswordEncoder() {
		return new BCryptPasswordEncoder();
	}

	private static void checkDatabase() {
		var url = "jdbc:sqlite:./data/database.db";
		File directory = new File("./data");
		if (! directory.exists()){
			directory.mkdir();
		}
		try (Connection conn = DriverManager.getConnection(url)) {
			if (conn != null) {
				MyLogger.log.info(String.format("A(z) %s adatbázis létrehozva.", url));
			}
		} catch (SQLException e) {
			MyLogger.log.error(String.format("Hiba történt az adatbázis létrehozása közben: %s", e.getMessage()), e);
		}
	}

}
