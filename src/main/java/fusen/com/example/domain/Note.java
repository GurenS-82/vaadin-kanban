package fusen.com.example.domain;

import jakarta.persistence.*;

@Entity
public class Note {
  @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
  private Long id;

  private String text;
  private String colorHex;     // "#FFE58F" など
  private int position;        // 列内の並び

  @ManyToOne(fetch = FetchType.LAZY)
  private BoardColumn column;

  public static Note of(BoardColumn col, String text, String color, int pos){
    Note n = new Note();
    n.column = col; n.text = text; n.colorHex = color; n.position = pos;
    return n;
  }

  // getters/setters
  public Long getId(){ return id; }
  public String getText(){ return text; }
  public void setText(String t){ this.text=t; }
  public String getColorHex(){ return colorHex; }
  public void setColorHex(String c){ this.colorHex=c; }
  public int getPosition(){ return position; }
  public void setPosition(int p){ this.position=p; }
  public BoardColumn getColumn(){ return column; }
  public void setColumn(BoardColumn c){ this.column=c; }
}