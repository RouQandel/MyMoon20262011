import { Component, ElementRef, computed, inject, signal } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { BOOK, PAGE_TITLES, PageId, chapterLabel } from './love-book.config';
import { MusicService } from './services/music.service';
import { OverlayService } from './services/overlay.service';
import { MusicPlayer } from './components/music-player/music-player';
import { Overlays } from './components/overlays/overlays';
import { CoverPage } from './pages/cover-page/cover-page';
import { LetterPage } from './pages/letter-page/letter-page';
import { ReasonsPage } from './pages/reasons-page/reasons-page';
import { MemoriesPage } from './pages/memories-page/memories-page';
import { DreamsPage } from './pages/dreams-page/dreams-page';
import { PlaylistPage } from './pages/playlist-page/playlist-page';
import { OpenWhenPage } from './pages/open-when-page/open-when-page';
import { PromisesPage } from './pages/promises-page/promises-page';
import { WishPage } from './pages/wish-page/wish-page';
import { FinalPage } from './pages/final-page/final-page';

type Leaf = 'cover' | PageId;

interface Drag {
  id: number;
  x: number;
  y: number;
  t: number;
  book: HTMLElement;
  dir: 0 | 1 | -1;
  leaf?: HTMLElement;
  progress: number;
}

const TURN_MS = 900;

@Component({
  selector: 'app-root',
  imports: [
    MusicPlayer,
    Overlays,
    CoverPage,
    LetterPage,
    ReasonsPage,
    MemoriesPage,
    DreamsPage,
    PlaylistPage,
    OpenWhenPage,
    PromisesPage,
    WishPage,
    FinalPage,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
  host: { '(document:keydown)': 'onKey($event)' },
})
export class App {
  private readonly music = inject(MusicService);
  private readonly overlay = inject(OverlayService);

  protected readonly leaves: Leaf[] = ['cover', ...BOOK.pages];
  protected readonly current = signal(0);
  protected readonly opened = computed(() => this.current() > 0);
  protected readonly progress = computed(() => (this.current() / (this.leaves.length - 1)) * 100);
  protected readonly label = computed(() => {
    const leaf = this.leaves[this.current()];
    return leaf === 'cover' ? null : { chapter: chapterLabel(leaf), title: PAGE_TITLES[leaf] };
  });

  protected readonly swiped = signal(false);
  /** True once the current page has stopped turning; lets it drop the 3D context so it can scroll on mobile. */
  protected readonly settled = signal(true);

  private busyUntil = 0;
  private settleTimer?: ReturnType<typeof setTimeout>;
  private drag: Drag | null = null;
  private suppressClickUntil = 0;

  constructor() {
    inject(Title).setTitle(BOOK.tabTitle);
    // a finished drag must not also "tap" whatever is under the finger
    inject(ElementRef<HTMLElement>).nativeElement.addEventListener(
      'click',
      (e: Event) => {
        if (performance.now() < this.suppressClickUntil) {
          e.stopPropagation();
          e.preventDefault();
        }
      },
      true,
    );
  }

  protected open(): void {
    this.music.start();
    this.go(1);
  }

  protected next(): void {
    this.go(this.current() + 1);
  }

  protected prev(): void {
    this.go(this.current() - 1);
  }

  protected go(i: number): void {
    const now = Date.now();
    if (i < 0 || i >= this.leaves.length || i === this.current() || now < this.busyUntil) return;
    this.busyUntil = now + TURN_MS * 0.6;
    this.current.set(i);
    this.music.stopPageSong();
    this.unsettle();
  }

  private unsettle(): void {
    this.settled.set(false);
    clearTimeout(this.settleTimer);
    this.settleTimer = setTimeout(() => this.settled.set(true), TURN_MS + 50);
  }

  protected state(i: number): string {
    const c = this.current();
    if (i < c) return 'turned';
    if (i === c) return 'current';
    return i === c + 1 ? 'next' : 'ahead';
  }

  /** Turned leaves stack above unturned ones so a page is always on top while it flips. */
  protected z(i: number): number {
    const n = this.leaves.length;
    return i < this.current() ? n + i : n - i;
  }

  protected onPointerDown(e: PointerEvent): void {
    if (!e.isPrimary || (e.pointerType === 'mouse' && e.button !== 0) || Date.now() < this.busyUntil) return;
    this.drag = { id: e.pointerId, x: e.clientX, y: e.clientY, t: e.timeStamp, book: e.currentTarget as HTMLElement, dir: 0, progress: 0 };
  }

  protected onPointerMove(e: PointerEvent): void {
    const d = this.drag;
    if (!d || e.pointerId !== d.id) return;
    const dx = e.clientX - d.x;
    const dy = e.clientY - d.y;

    if (d.dir === 0) {
      if (Math.abs(dy) > 10 && Math.abs(dy) > Math.abs(dx)) {
        this.drag = null;
        return;
      }
      if (Math.abs(dx) < 10) return;
      const dir = dx < 0 ? 1 : -1;
      const c = this.current();
      if (c + dir < 0 || c + dir >= this.leaves.length) {
        this.drag = null;
        return;
      }
      d.dir = dir;
      d.leaf = d.book.querySelectorAll<HTMLElement>('.leaf')[dir === 1 ? c : c - 1];
      d.leaf.classList.add('dragging');
      d.book.setPointerCapture(e.pointerId);
    }

    const width = d.book.clientWidth * 0.85;
    d.progress = Math.min(Math.max((d.dir === 1 ? -dx : dx) / width, 0), 1);
    const angle = d.dir === 1 ? -180 * d.progress : -180 * (1 - d.progress);
    d.leaf!.style.transform = `rotateY(${angle}deg)`;
  }

  protected onPointerUp(e: PointerEvent, cancelled = false): void {
    const d = this.drag;
    this.drag = null;
    if (!d || e.pointerId !== d.id || d.dir === 0 || !d.leaf) return;

    this.suppressClickUntil = performance.now() + 400;
    const speed = Math.abs(e.clientX - d.x) / Math.max(e.timeStamp - d.t, 1);
    const commit = !cancelled && (d.progress > 0.3 || (speed > 0.45 && d.progress > 0.06));

    // clearing the inline angle lets the CSS transition finish (or undo) the turn from where the finger left it
    d.leaf.classList.remove('dragging');
    d.leaf.style.transform = '';
    if (!commit) {
      this.unsettle();
      return;
    }

    this.busyUntil = 0;
    if (this.current() === 0) this.open();
    else this.go(this.current() + d.dir);
    this.swiped.set(true);
  }

  protected onKey(e: KeyboardEvent): void {
    if (this.overlay.letter() || this.overlay.surprise() || this.overlay.note()?.special) return;
    if (e.key === 'ArrowRight') {
      if (this.current() === 0) this.open();
      else this.next();
    }
    if (e.key === 'ArrowLeft') this.prev();
  }
}
