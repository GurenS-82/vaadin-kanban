package fusen.com.example.repo;

import fusen.com.example.domain.BoardColumn;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.*;

public interface ColumnRepo extends JpaRepository<BoardColumn, Long> {
  List<BoardColumn> findByBoardIdOrderBySortOrderAsc(Long boardId);
}