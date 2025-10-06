package fusen.com.example.domain;

import jakarta.persistence.*;
import java.util.*;

@Entity
@Table(name="board_column") // 予約語回避
public class BoardColumn {
  @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private String title;     // TODO / DOING / DONE
  private int sortOrder;    // 列の並び

  @ManyToOne(fetch = FetchType.LAZY)
  private Board board;

  @OneToMany(mappedBy = "column", cascade = CascadeType.ALL, orphanRemoval = true)
  @OrderBy("position ASC")
  private List<Note> notes = new ArrayList<>();

  public static BoardColumn of(Board b, String title, int sort){
    BoardColumn c = new BoardColumn();
    c.board = b; c.title = title; c.sortOrder = sort;
    return c;
  }

  // getters/setters
  public Long getId(){ return id; }
  public String getTitle(){ return title; }
  public void setTitle(String t){ this.title=t; }
  public int getSortOrder(){ return sortOrder; }
  public void setSortOrder(int v){ this.sortOrder=v; }
  public Board getBoard(){ return board; }
  public List<Note> getNotes(){ return notes; }
}