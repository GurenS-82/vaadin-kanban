package fusen.com.example;

import fusen.com.example.domain.*;
import com.vaadin.flow.component.Key;
import com.vaadin.flow.component.button.Button;
import com.vaadin.flow.component.dependency.CssImport;
import com.vaadin.flow.component.dnd.*;
import com.vaadin.flow.component.html.Div;
import com.vaadin.flow.component.html.H2;
import com.vaadin.flow.component.orderedlayout.HorizontalLayout;
import com.vaadin.flow.component.orderedlayout.VerticalLayout;
import com.vaadin.flow.component.textfield.TextField;
import com.vaadin.flow.router.Route;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.*;

@Route("")
@CssImport("./styles/board.css")
public class MainView extends VerticalLayout {

  private final BoardService service;
  private Board board;

  // 列ID -> コンテナ
  private final Map<Long, VerticalLayout> columnBoxes = new LinkedHashMap<>();

@Autowired
public MainView(BoardService service) {
  this.service = service;
  setSizeFull(); setPadding(true); setSpacing(true);

  // 常にボード＆列を保証
  board = service.ensureDefaultBoard();
  var cols = service.loadColumns(board.getId());

  TextField noteText = new TextField();
  noteText.setPlaceholder("新しい付箋（Enterで追加）");
  TextField color = new TextField();
    color.setPlaceholder("#FFE58F");
    color.setWidth("120px");

  Button addBtn = new Button("TODOに追加", _ -> {
    var columns = service.loadColumns(board.getId());
    // TODO 列が無い場合は先頭列、先頭も無ければ ensureDefaultBoard で補完
    BoardColumn target = columns.stream()
        .filter(c -> "TODO".equals(c.getTitle()))
        .findFirst()
        .orElseGet(() -> {
          service.ensureDefaultBoard();
          var cs = service.loadColumns(board.getId());
          return cs.isEmpty() ? null : cs.get(0);
        });

    String t = noteText.getValue().trim();
    if (target != null && !t.isEmpty()) {
      service.addNote(target.getId(), t, color.getValue().isBlank()? "#FFE58F" : color.getValue());
      noteText.clear();
      render();
    }
  });
  noteText.addKeyPressListener(Key.ENTER, _ -> addBtn.click());
  add(new HorizontalLayout(noteText, color, addBtn));

  HorizontalLayout boardLayout = new HorizontalLayout();
  boardLayout.addClassName("board");
  boardLayout.setSizeFull();
  add(boardLayout);

  // 列が無ければ ensureDefaultBoard が作るので、空でも落ちない
  for (BoardColumn col : cols) {
    boardLayout.add(buildColumn(col));
  }
  render();
}

  private VerticalLayout buildColumn(BoardColumn col) {
    VerticalLayout shell = new VerticalLayout();
    shell.addClassName("column");
    shell.setPadding(false);
    shell.setSpacing(true);
    shell.setWidth("33%");
    shell.setMinHeight("400px");

    H2 head = new H2(col.getTitle());
    VerticalLayout box = new VerticalLayout();
    box.addClassName("note-container");
    box.setPadding(false);
    box.setSpacing(true);

    // 列自体へのドロップ：末尾扱い
    var dropTarget = DropTarget.create(box);
    dropTarget.setDropEffect(DropEffect.MOVE);
    dropTarget.addDropListener(ev -> {
      ev.getDragSourceComponent().ifPresent(source -> {
        if (source instanceof Div srcNote) {
          Long noteId = Long.valueOf(srcNote.getId().orElse("0"));
          // 末尾 index = 現在の子要素数
          int tailIndex = box.getChildren().toList().size();
          service.moveNote(noteId, col.getId(), tailIndex);
          render();
        }
      });
    });

    shell.add(head, box);
    columnBoxes.put(col.getId(), box);
    return shell;
  }

  /** ノート1件のUIを作る（wrapper 自体も DropTarget にして「直前挿入」を実現） */
  private Div createNoteWrapper(Note n, BoardColumn col, int indexInColumn) {
    // 実ノート
    Div card = new Div();
    card.setId(String.valueOf(n.getId()));
    card.addClassName("note");
    card.getStyle().set("background", n.getColorHex());
    card.setText(n.getText());
    DragSource<Div> drag = DragSource.create(card);
    drag.setEffectAllowed(EffectAllowed.MOVE);

    // 削除ボタン
    Div del = new Div();
    del.setText("×");
    del.addClassName("note-delete");
    del.addClickListener(_ -> { service.deleteNote(n.getId()); render(); });

    // ラッパ（この wrapper を DropTarget にして「ここに落としたら自分の直前に挿入」）
    Div wrapper = new Div(card, del);
    wrapper.addClassName("note-wrapper");
    wrapper.setWidthFull();

    var wrapperDrop = DropTarget.create(wrapper);
    wrapperDrop.setDropEffect(DropEffect.MOVE);
    wrapperDrop.addDropListener(ev -> {
      ev.getDragSourceComponent().ifPresent(source -> {
        if (source instanceof Div srcNote) {
          Long noteId = Long.valueOf(srcNote.getId().orElse("0"));
          // wrapper の index を列の children から算出し、その位置へ挿入
          VerticalLayout box = columnBoxes.get(col.getId());
          int insertIndex = box.getChildren().toList().indexOf(wrapper);
          if (insertIndex < 0) insertIndex = 0; // 念のため
          service.moveNote(noteId, col.getId(), insertIndex);
          render();
        }
      });
    });

    return wrapper;
  }

  private void render() {
    // 列ごとの中身を最新化
    List<BoardColumn> cols = service.loadColumns(board.getId());
    for (BoardColumn col : cols) {
      VerticalLayout box = columnBoxes.get(col.getId());
      if (box == null) continue;
      box.removeAll();

      List<Note> notes = service.loadNotes(col.getId());
      for (int i = 0; i < notes.size(); i++) {
        box.add(createNoteWrapper(notes.get(i), col, i));
      }
    }
  }
}