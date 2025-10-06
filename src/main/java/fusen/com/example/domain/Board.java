package fusen.com.example.domain;

import jakarta.persistence.*;
import java.util.*;

@Entity
public class Board {
  @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private String name;

  @OneToMany(mappedBy = "board", cascade = CascadeType.ALL, orphanRemoval = true)
  @OrderBy("sortOrder ASC")
  private List<BoardColumn> columns = new ArrayList<>();

  public static Board of(String name){ Board b=new Board(); b.name=name; return b; }

  // getters/setters
  public Long getId(){ return id; }
  public String getName(){ return name; }
  public void setName(String n){ this.name=n; }
  public List<BoardColumn> getColumns(){ return columns; }
}