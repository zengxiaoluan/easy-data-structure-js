class Node {
  left?: Node;
  right?: Node;
  up?: Node;
  down?: Node;

  type: string = "";

  row?: number; // 所在行 index
  col?: number; // 所在列 index
}

export class DancingLinks {
  ans: number[] = [];
  head: Node | undefined;
  columnHead: Node[] = [];
  rowHead: Node[] = [];
  removeNodes: any[] = [];
  lastRowFilledCol = false;

  constructor(readonly matrix: number[][]) {
    this.buildLink();

    this.dance();
  }

  buildLink() {
    this.createHead();
    this.createColumnHead();
    this.createMatrixNode();

    // this.showMatrixByColumn();
    // this.showMatrixByRow();
  }

  // 把一行行节点展示出来
  showMatrixByRow() {
    let row = this.matrix.length;
    let rowHead = this.rowHead;

    for (let i = 0; i < row; i++) {
      let head = rowHead[i];
      let row = this.getARow(head);

      console.log(i, row);
    }
  }

  // 获取一行的节点
  getARow(node: Node) {
    let head = node;
    let cur = head.right;
    let row = [head];

    while (cur !== head) {
      row.push(cur!);
      cur = cur!.right;
    }

    return row;
  }

  // 获取一列的节点
  getACol(colHead: Node) {
    let cur = colHead.down;
    let col = [];

    while (colHead !== cur) {
      col.push(cur);
      cur = cur!.down;
    }

    return col;
  }

  // 把一列列节点展示出来
  showMatrixByColumn() {
    let columnHead = this.columnHead;
    let col = columnHead.length;
    for (let i = 0; i < col; i++) {
      let colHead = columnHead[i];
      let col = this.getACol(colHead);
      console.log("column:", i, col);
    }
  }

  createMatrixNode() {
    let matrix = this.matrix;
    let columnHead = this.columnHead;

    let row = matrix.length;
    let col = matrix[0].length;

    let rowHead = [];

    for (let i = 0; i < row; i++) {
      for (let j = 0; j < col; j++) {
        if (matrix[i][j]) {
          let node = new Node();

          if (!rowHead[i]) {
            node.left = node.right = node;
            rowHead[i] = node;
          }

          let colHead = columnHead[j];
          let rowNodeHead = rowHead[i];

          node.row = i;
          node.col = j;

          // right left
          node.right = rowNodeHead;
          node.left = rowNodeHead.left;

          rowNodeHead!.left!.right = node;
          rowNodeHead.left = node;

          // up down
          node.down = colHead;
          node.up = colHead!.up;

          colHead!.up!.down = node;
          colHead.up = node;
        }
      }
    }

    this.rowHead = rowHead;
  }

  createColumnHead() {
    let head = this.head;
    let col = this.matrix[0].length;
    let arr = [];

    for (let i = 0; i < col; i++) {
      let node = new Node();
      node.col = i;

      node.type = "column head";

      node.up = node;
      node.down = node;

      node.right = head;
      node.left = head!.left;

      head!.left!.right = node;
      head!.left = node;

      arr.push(node);
    }

    this.columnHead = arr;
  }

  // 创建一个头节点，默认指向自身
  createHead() {
    let head = new Node();

    head.type = "head";

    head.left = head;
    head.right = head;
    head.up = head;
    head.down = head;

    this.head = head;
  }

  // 从节点最少的列开始
  getLeastColHead() {
    let head = this.head;
    let cur = head!.right;
    let min = Infinity;
    let leastColHead = cur;

    while (head !== cur) {
      let len = this.getACol(cur!).length;

      if (len < min) {
        leastColHead = cur;
        min = len;
      }

      cur = cur!.right;
    }

    return leastColHead;
  }

  // 回溯寻找答案
  dance() {
    let colHead = this.getLeastColHead();
    if (colHead === this.head) {
      return true;
    }

    let deepCount = this.getACol(colHead!).length;
    if (deepCount === 0) {
      return false;
    }

    let cur = colHead!.down;
    while (colHead !== cur) {
      this.ans.push(cur!.row!);

      let nodes = this.remove(colHead, cur);

      this.removeNodes.push(nodes);

      let hasAns = this.dance();

      if (hasAns) return true;

      this.ans.pop();
      let nodes2 = this.removeNodes.pop();
      this.recovery(nodes2);

      cur = cur!.down;
    }

    return false;
  }

  // 将删除的节点进行恢复
  recovery(recoveryNodes: any) {
    let { allRemoved, allColHead } = recoveryNodes;

    for (const node of allRemoved) {
      this.recoveryNodeVertical(node);
    }

    for (const colHead of allColHead) {
      this.recoveryNodeHorizontal(colHead);
    }
  }

  /**
   * 先拿到一行，这行中节点所属的每列需要删除，
   * 每列对应着每行，在上下节点中删除
   */
  remove(colHead: any, curVisit: any) {
    let allRemoved = new Set<Node>();
    let allColHead = new Set([colHead]);

    let rows = this.getARow(curVisit);

    for (const row of rows) {
      let colHead = this.columnHead[row!.col!];
      allColHead.add(colHead);

      let cols = this.getACol(colHead);
      for (const nodeCol of cols) {
        allRemoved.add(nodeCol!);

        let rows2 = this.getARow(nodeCol!);
        for (const node of rows2) {
          allRemoved.add(node);
        }
      }
    }

    for (const node of allRemoved) {
      this.removeNodeVertical(node);
    }

    for (const node of allColHead) {
      this.removeNodeHorizontal(node);
    }

    return { allRemoved, allColHead };
  }

  // 将节点从垂直删除 up、down
  removeNodeVertical(cur: Node) {
    cur!.up!.down = cur.down;
    cur.down!.up = cur.up;
  }

  // 将节点从垂直恢复
  recoveryNodeVertical(cur: Node) {
    cur.up!.down = cur;
    cur.down!.up = cur;
  }

  // 将节点从水平删除 left、right
  removeNodeHorizontal(cur: Node) {
    cur.left!.right = cur.right;
    cur.right!.left = cur.left;
  }

  // 将节点从水平恢复
  recoveryNodeHorizontal(cur: Node) {
    cur.left!.right = cur;
    cur.right!.left = cur;
  }
}
