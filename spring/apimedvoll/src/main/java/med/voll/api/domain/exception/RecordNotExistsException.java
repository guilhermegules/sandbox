package med.voll.api.domain.exception;

public class RecordNotExistsException extends RuntimeException {
    public RecordNotExistsException(String message) {
        super(message);
    }
}
