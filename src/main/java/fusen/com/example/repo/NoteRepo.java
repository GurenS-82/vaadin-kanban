package fusen.com.example.repo;

import fusen.com.example.domain.Note;
import fusen.com.example.domain.BoardColumn;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.*;

public interface NoteRepo extends JpaRepository<Note, Long> {
  List<Note> findByColumnOrderByPositionAsc(BoardColumn column);
}