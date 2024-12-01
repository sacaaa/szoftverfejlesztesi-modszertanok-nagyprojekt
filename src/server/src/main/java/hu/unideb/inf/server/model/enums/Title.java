package hu.unideb.inf.server.model.enums;

import com.fasterxml.jackson.annotation.JsonValue;

public enum Title {
    DR("Dr."),
    PROF("Prof."),
    PROF_DR("Prof. Dr.");

    private final String title;

    Title(String title) {
        this.title = title;
    }

    @JsonValue
    public String getTitle() {
        return title;
    }
}
