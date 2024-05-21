import { BehaviorSubject } from 'rxjs';

export class GameService {
  private board = new BehaviorSubject<string[][]>([
    ['', '', ''],
    ['', '', ''],
    ['', '', ''],
  ]);
  private currentPlayer = new BehaviorSubject<string>('X');
  private winner = new BehaviorSubject<string | null>(null);

  board$ = this.board.asObservable();
  currentPlayer$ = this.currentPlayer.asObservable();
  winner$ = this.winner.asObservable();

  playMove(row: number, col: number) {
    if (this.board.value[row][col] === '' && !this.winner.value) {
      const newBoard = this.board.value.map((rowArr, rIdx) =>
        rowArr.map((cell, cIdx) =>
          rIdx === row && cIdx === col ? this.currentPlayer.value : cell
        )
      );
      this.board.next(newBoard);

      if (this.checkWinner(newBoard, this.currentPlayer.value)) {
        this.winner.next(this.currentPlayer.value);
      } else {
        this.currentPlayer.next(this.currentPlayer.value === 'X' ? 'O' : 'X');
      }
    }
  }

  resetGame() {
    this.board.next([
      ['', '', ''],
      ['', '', ''],
      ['', '', ''],
    ]);
    this.currentPlayer.next('X');
    this.winner.next(null);
  }

  private checkWinner(board: string[][], player: string): boolean {
    const winConditions = [
      [board[0][0], board[0][1], board[0][2]],
      [board[1][0], board[1][1], board[1][2]],
      [board[2][0], board[2][1], board[2][2]],

      [board[0][0], board[1][0], board[2][0]],
      [board[0][1], board[1][1], board[2][1]],
      [board[0][2], board[1][2], board[2][2]],

      [board[0][0], board[1][1], board[2][2]],
      [board[2][0], board[1][1], board[0][2]],
    ];
    return winConditions.some((condition) =>
      condition.every((cell) => cell === player)
    );
  }
}
