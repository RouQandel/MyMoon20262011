import { Injectable, signal } from '@angular/core';
import { Letter } from '../love-book.config';

export interface Note {
  text: string;
  title?: string;
  special?: boolean;
}

/** Overlays live at the app root so they are never trapped inside a 3D-transformed page. */
@Injectable({ providedIn: 'root' })
export class OverlayService {
  readonly note = signal<Note | null>(null);
  readonly letter = signal<Letter | null>(null);
  readonly surprise = signal(false);

  private noteTimer: ReturnType<typeof setTimeout> | undefined;

  showNote(note: Note): void {
    clearTimeout(this.noteTimer);
    this.note.set(note);
    if (!note.special) this.noteTimer = setTimeout(() => this.note.set(null), 5200);
  }

  closeNote(): void {
    clearTimeout(this.noteTimer);
    this.note.set(null);
  }

  openLetter(letter: Letter): void {
    this.letter.set(letter);
  }
}
