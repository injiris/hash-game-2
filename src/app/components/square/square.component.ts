import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-square',
  styleUrl: './square.component.scss',
  templateUrl: './square.component.html',
})
export class SquareComponent {
  @Input()
  value: string = '';

  @Output()
  move = new EventEmitter<void>();

  onClick(): void {
    if (this.value === '') {
      this.move.emit();
    }
  }
}
