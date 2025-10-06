package fusen.com.example;


import fusen.com.example.domain.*;
import fusen.com.example.repo.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class BoardService {
  private final BoardRepo boards;
  private final ColumnRepo columns;
  private final NoteRepo notes;

  public BoardService(BoardRepo b, ColumnRepo c, NoteRepo n){
    this.boards=b; this.columns=c; this.notes=n;
  }

  /** ボードを1枚保証し、列(TODO/DOING/DONE)が無ければ作る */
  @Transactional
  public Board ensureDefaultBoard(){
    Board board = boards.findAll().stream().findFirst()
        .orElseGet(() -> boards.save(Board.of("My Board")));

    List<BoardColumn> cols = columns.findByBoardIdOrderBySortOrderAsc(board.getId());
    if (cols.isEmpty()) {
      columns.save(BoardColumn.of(board, "TODO", 0));
      columns.save(BoardColumn.of(board, "DOING", 1));
      columns.save(BoardColumn.of(board, "DONE", 2));
    }
    return board;
  }

  public List<BoardColumn> loadColumns(Long boardId){
    return columns.findByBoardIdOrderBySortOrderAsc(boardId);
  }

    // ★追加: コラムIDからノートを“確実に初期化して”返す
  @Transactional(readOnly = true)
  public List<Note> loadNotes(Long columnId) {
    BoardColumn col = columns.findById(columnId).orElseThrow();
    // リポジトリで列に属するノートを“明示取得”して初期化する
    List<Note> list = notes.findByColumnOrderByPositionAsc(col);
    // Detached後も参照できるように別リストに詰め替えて返す（初期化を確実化）
    return List.copyOf(list);
  }

  // ほかの add/move/delete はそのまま


  @Transactional
  public Note addNote(Long columnId, String text, String colorHex){
    BoardColumn col = columns.findById(columnId).orElseThrow();
    int pos = notes.findByColumnOrderByPositionAsc(col).size();
    return notes.save(Note.of(col, text, colorHex, pos));
  }

  @Transactional
  public void deleteNote(Long noteId){
    Note n = notes.findById(noteId).orElse(null);
    if(n==null) return;
    BoardColumn col = n.getColumn();
    notes.delete(n);
    var list = notes.findByColumnOrderByPositionAsc(col);
    for (int i=0;i<list.size();i++) list.get(i).setPosition(i);
  }

  /** 任意位置ドロップ */
  @Transactional
  public void moveNote(Long noteId, Long toColumnId, int toIndex){
    Note n = notes.findById(noteId).orElseThrow();
    BoardColumn from = n.getColumn();
    BoardColumn to   = columns.findById(toColumnId).orElseThrow();

    var fromList = notes.findByColumnOrderByPositionAsc(from);
    int oldPos = n.getPosition();
    for (Note x : fromList)
      if (!x.getId().equals(n.getId()) && x.getPosition() > oldPos)
        x.setPosition(x.getPosition()-1);

    var toList = notes.findByColumnOrderByPositionAsc(to);
    if (toIndex < 0) toIndex = 0;
    if (toIndex > toList.size()) toIndex = toList.size();
    for (Note x : toList)
      if (x.getPosition() >= toIndex)
        x.setPosition(x.getPosition()+1);

    n.setColumn(to);
    n.setPosition(toIndex);
  }
}