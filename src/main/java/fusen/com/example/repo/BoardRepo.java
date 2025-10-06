package fusen.com.example.repo;

import fusen.com.example.domain.Board;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BoardRepo extends JpaRepository<Board, Long> {}