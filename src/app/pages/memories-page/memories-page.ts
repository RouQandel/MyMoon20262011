import { Component } from '@angular/core';
import { BOOK, chapterLabel } from '../../love-book.config';
import { Doodle } from '../../components/doodle/doodle';
import { Secret } from '../../components/secret/secret';

@Component({
  selector: 'app-memories-page',
  imports: [Doodle, Secret],
  templateUrl: './memories-page.html',
  styleUrl: './memories-page.scss',
})
export class MemoriesPage {
  protected readonly m = BOOK.memories;
  protected readonly chapter = chapterLabel('memories');
  protected readonly tilts = [-3, 2.5, -1.5, 3, -2];
}
