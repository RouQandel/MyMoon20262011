# A Little Love Book ♡

A mobile-first digital birthday book made with Angular.

## Run it

```bash
npm install
npm start          # opens on http://localhost:4200
```

## Make it yours

Everything personal lives in **one file**: `src/app/love-book.config.ts`

| What | Where |
| --- | --- |
| His name, nickname, your name, birthday | `HIS_NAME`, `NICKNAME`, `HER_NAME`, `BOOK.birthday` |
| Cover text & button | `BOOK.cover` |
| The song | put the mp3 in `public/music/` and set `BOOK.song.src` (e.g. `'music/our-song.mp3'`) |
| Photos (2–5 is perfect) | put them in `public/photos/` and set `photo: 'photos/us-1.jpg'` on a memory |
| Message screenshots | `screenshot: 'photos/text.png'` on a memory |
| Letters, reasons, dreams, promises, open-when letters | their sections in `BOOK` |
| Hidden notes behind stars/flowers | `BOOK.hiddenNotes` (`enabled: false` turns them off) |
| Tiny secret heart | `BOOK.secretHeart` |
| Sealed secret letter | `BOOK.secretLetter` |
| Final surprise letter | `BOOK.finalPage.surprise` |
| Remove / reorder chapters | `BOOK.pages` |

Memories without a photo automatically become pretty scrapbook notes with a little doodle.

## Share it

```bash
npm run build
```

Upload the `dist/love-book/browser` folder to any static host, e.g.:

- **Netlify Drop** – drag the folder onto https://app.netlify.com/drop and you get a link.
- **Vercel / GitHub Pages / Firebase Hosting** also work.

The music starts when he opens the book (browsers block sound until a tap) and keeps playing across all pages.
Pages turn by dragging them with a finger (or the mouse) — left for the next page, right to go back.
