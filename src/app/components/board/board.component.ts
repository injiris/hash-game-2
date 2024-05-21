import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { GameService } from '../../game-service';

@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss',
  providers: [GameService],
})
export class BoardComponent {
  board$: Observable<string[][]>;
  currentPlayer$: Observable<string>;
  winner$: Observable<string | null>;

  constructor(private gameService: GameService) {
    this.board$ = this.gameService.board$;
    this.currentPlayer$ = this.gameService.currentPlayer$;
    this.winner$ = this.gameService.winner$;
  }

  playMove(row: number, col: number): void {
    this.gameService.playMove(row, col);
  }

  resetGame(): void {
    this.gameService.resetGame();
  }
}
