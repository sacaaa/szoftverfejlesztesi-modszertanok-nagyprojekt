package hu.unideb.inf.server.model.enums;

public enum Title {
    DR("Dr."),
    PROF("Prof."),
    PROF_DR("Prof. Dr.");

    private final String title;

    Title(String title) {
        this.title = title;
    }

    public String getTitle() {
        return title;
    }
}
