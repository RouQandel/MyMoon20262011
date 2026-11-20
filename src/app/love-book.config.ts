/*
 * ♡ EDIT EVERYTHING HERE ♡
 *
 * Every name, message, photo and the song lives in this one file.
 *  - Photos:  put them in /public/photos and reference them as 'photos/your-file.jpg'
 *  - Song:    put your mp3 in /public/music and set song.src to 'music/your-song.mp3'
 *  - Pages:   reorder or delete entries in `pages` to change / remove chapters
 */

export type PageId =
  | 'letter'
  | 'reasons'
  | 'memories'
  | 'dreams'
  | 'playlist'
  | 'openWhen'
  | 'promises'
  | 'wish'
  | 'final';

export type DoodleName = 'heart' | 'star' | 'sparkle' | 'moon' | 'flower' | 'sprig' | 'note' | 'sun';

export interface Letter {
  title?: string;
  greeting?: string;
  paragraphs: string[];
  signoff?: string;
  signature?: string;
}

export interface Memory {
  date: string;
  title: string;
  story: string;
  /** e.g. 'photos/us-1.jpg' — leave it out for a text-only scrapbook note */
  photo?: string;
  /** a screenshot of a message, e.g. 'photos/first-text.png' */
  screenshot?: string;
  caption?: string;
  /** which part of the photo stays visible when cropped, e.g. 'center 30%' */
  focus?: string;
  /** little drawing used when there is no photo */
  doodle?: DoodleName;
}

const HIS_NAME = 'Ezz';
const NICKNAME = 'Zuzy';
const HER_NAME = 'Roro';

export const BOOK = {
  hisName: HIS_NAME,
  nickname: NICKNAME,
  herName: HER_NAME,
  birthday: 'November 20',
  tabTitle: `For my ${NICKNAME} ♡`,

  /** Chapters in order. Remove a line to remove that page. */
  pages: [
    'letter',
    'reasons',
    'memories',
    'dreams',
    'playlist',
    'openWhen',
    'promises',
    'wish',
    'final',
  ] as PageId[],

  cover: {
    eyebrow: 'A little book for',
    title: 'Happy Birthday, My Love',
    nicknameLine: `my ${NICKNAME} ♡`,
    subtitle: `Our Little Story — ${NICKNAME} & ${HER_NAME}`,
    openButton: 'Open your book ♡',
    hint: 'turn your sound on',
  },

  song: {
    src: 'music/our-song.mp3',
    title: 'El Badla Wel Fostan',
    artist: 'the song you used to sing to me',
    note: 'This song will always remind me of you.',
    loop: true,
  },

  letter: {
    title: 'If I could give you one thing…',
    greeting: `My ${NICKNAME},`,
    paragraphs: [
      'If I could give you one thing for your birthday, it wouldn’t be something I could wrap. I would give you the chance to see yourself the way I see you — just for a moment — so you’d finally understand how rare and wonderful you are.',
      'I wish you peace on the days that feel loud, and quiet confidence on the days you doubt yourself. I wish you success in everything you’re building, and rest whenever you need it. I wish you laughter that catches you off guard.',
      'Most of all, I wish you happiness — the soft, everyday kind that stays. You deserve every good thing this world has to offer, and I hope this year brings you closer to all of it.',
      'Thank you for being you. It’s my favourite thing in the world.',
    ],
    signoff: 'Always yours,',
    signature: HER_NAME,
  },

  /** The sealed envelope at the bottom of the first chapter. */
  secretLetter: {
    enabled: true,
    label: 'One more letter… sealed, just for you',
    hint: 'tap the seal to open it',
    title: 'A secret letter',
    greeting: `Hi ${NICKNAME},`,
    paragraphs: [
      'There are things I don’t always say out loud, because they feel too big for normal conversations. So I’m writing them here, where they can stay.',
      'You changed something in me. You made me softer and braver at the same time. You made me believe that love can be calm, and kind, and still give me butterflies.',
      'When I think about my favourite moments, you’re in almost all of them. And when I think about the future, I quietly hope you’re in every single one.',
    ],
    signoff: 'With all of my heart,',
    signature: HER_NAME,
  },

  reasons: {
    title: 'Little things I love about you',
    intro: 'Some are big, most are tiny. All of them are true.',
    /** Flip cards */
    cards: [
      'The way you laugh at your own jokes before you even finish them.',
      'How safe I feel whenever you’re near.',
      'Your voice when you’ve just woken up.',
      'How you remember the little things I say.',
      'The way you look at me when you think I’m not noticing.',
      'Your kindness — even when nobody sees it.',
      'How you make ordinary days feel like something.',
      'The songs you sing when you think no one is listening.',
      'Your patience with me. Always.',
      'How hard you work for the things you love.',
      'The way you say my name.',
      'That you’re you. Simply that.',
    ],
    /** Floating hearts — leave the list empty to hide them */
    floatingHearts: [
      'You make me feel at home.',
      'Your hugs fix everything.',
      'You’re my favourite notification.',
      'You make me braver.',
      'I love the way your mind works.',
      'You are my calm.',
      'I still get butterflies.',
    ],
  },

  memories: {
    title: 'Our memories',
    intro: 'Only a few pictures — and a hundred moments I keep in my heart.',
    items: [
      {
        date: 'The beginning of us',
        title: 'Our smile',
        story: 'Look at us. I could stare at this picture forever — you, me, and the happiest version of both of us.',
        photo: 'photos/us-selfie.jpeg',
        caption: 'my favourite selfie',
        focus: 'center 25%',
      },
      {
        date: 'Every walk',
        title: 'Walking next to you',
        story: 'You hold my hand like it’s the most natural thing in the world. With you, every street feels like the way home.',
        photo: 'photos/hands-walk.jpeg',
        caption: 'my hand, where it belongs',
        focus: 'center 70%',
      },
      {
        date: 'A night out',
        title: 'Under the night sky',
        story: 'Palm trees, city lights, and you in that yellow jacket. One of those nights I never wanted to end.',
        photo: 'photos/us-night-1.jpeg',
        caption: 'us, under the stars',
        focus: 'center 62%',
      },
      {
        date: 'One random night',
        title: 'When we couldn’t stop laughing',
        story: 'I don’t even remember what was so funny. I just remember thinking: I could listen to him laugh forever.',
        doodle: 'moon',
      },
      {
        date: 'Late-night drives',
        title: 'You, me & our song',
        story: 'You driving, my hand in yours, our song playing. Honestly, that’s my favourite place in the world.',
        photo: 'photos/hands-car.jpeg',
        caption: 'our song on repeat',
        focus: 'center 60%',
      },
      {
        date: 'Dinner dates',
        title: 'Never letting go',
        story: 'Even across a table, we still find a way to hold hands.',
        photo: 'photos/hands-dinner.jpeg',
        caption: 'always holding on',
        focus: 'center 55%',
      },
      {
        date: 'Car selfies',
        title: `${NICKNAME} & ${HER_NAME}`,
        story: 'Every picture with you looks like happiness to me.',
        photo: 'photos/us-car.jpeg',
        caption: 'my two favourite people: us',
        focus: '55% center',
      },
      {
        date: 'Always',
        title: 'Your messages',
        story: 'The good-morning texts, the voice notes, the “did you eat?” — I’ve saved more of them than I’ll ever admit.',
        doodle: 'sparkle',
        // screenshot: 'photos/our-first-text.png',
      },
      {
        date: 'Celebrating you',
        title: 'That birthday smile',
        story: 'Your smile was brighter than every sparkler on that cake. I want to see it on every birthday of yours.',
        photo: 'photos/birthday-1.jpeg',
        caption: 'that smile ♡',
        focus: 'center 40%',
      },
      {
        date: 'Today',
        title: 'Your birthday',
        story: 'And here we are — another memory, another page. I’m so glad I get to celebrate you.',
        doodle: 'heart',
      },
    ] as Memory[],
  },

  dreams: {
    title: 'Things I want to do with you',
    intro: 'A little list of somedays. Tap one to make it a pinky promise.',
    items: [
      { text: 'Watch the sunrise somewhere new', tag: 'adventure' },
      { text: 'Cook a slightly terrible dinner together and love it anyway', tag: 'date' },
      { text: 'A road trip with no plan — just snacks and our playlist', tag: 'adventure' },
      { text: 'See the city lights from somewhere high', tag: 'place' },
      { text: 'A picnic with way too many snacks', tag: 'date' },
      { text: 'Slow dance in the kitchen to our song', tag: 'little thing' },
      { text: 'Learn something completely new, together', tag: 'dream' },
      { text: 'Stargaze far away from the city', tag: 'adventure' },
      { text: 'Build a home that feels like us', tag: 'dream' },
      { text: 'Keep celebrating your birthdays, every single year', tag: 'forever' },
    ],
  },

  playlist: {
    title: 'A playlist of memories',
    intro: 'Some songs are just songs. Others are whole memories.',
    lyrics: ['عايزك جاني طول العمر يا قمري ❤'],
    /** The song that plays on this page. The main song pauses while it plays and resumes on the next page. */
    song: {
      src: 'music/from-you.mp3',
      words: 'I love to hear from you every day',
    },
  },

  openWhen: {
    title: 'Open when…',
    intro: 'Little letters for the days you need me, even when I’m not right there.',
    greeting: `My ${NICKNAME},`,
    letters: [
      {
        label: 'you miss me',
        paragraphs: [
          'Close your eyes for a second. I’m thinking about you right now — I promise, I always am.',
          'Distance is only temporary. What we have isn’t. Call me, text me, or just reread this and know I miss you too.',
        ],
      },
      {
        label: 'you feel sad',
        paragraphs: [
          'It’s okay not to be okay. You don’t have to be strong every single day.',
          'Be gentle with yourself today. Drink some water, take a breath, and remember that this feeling will pass — and I’m right here while it does.',
        ],
      },
      {
        label: 'you need a hug',
        paragraphs: [
          'Consider this a hug in paper form: the long kind, where neither of us lets go first.',
          'Now come and collect the real one. That’s an order. ♡',
        ],
      },
      {
        label: 'you want to smile',
        paragraphs: [
          'Remember that time we laughed until we couldn’t breathe? I do. I think about it at the most random moments and smile like an idiot.',
          'Also: you are cute. That’s it. That’s the letter.',
        ],
      },
      {
        label: 'you doubt yourself',
        paragraphs: [
          'Listen to me: you are capable, you are enough, and you have already survived every hard day you thought you couldn’t.',
          'I have watched you do brave things. I believe in you even on the days you don’t — especially on those days.',
        ],
      },
    ],
  },

  promises: {
    title: 'Little promises',
    intro: 'Not big words — just things I mean with my whole heart. Tap to seal each one.',
    items: [
      'I promise to keep making you smile.',
      'I promise to celebrate your little wins.',
      'I promise to remind you how special you are.',
      'I promise to make more beautiful memories with you.',
      'I promise to listen, even when it’s hard to say.',
      'I promise to choose you, again and again.',
    ],
  },

  wish: {
    title: 'Make a wish',
    candles: 5,
    cakeName: NICKNAME,
    photo: 'photos/birthday-2.jpeg',
    photoCaption: 'the smile I want to see every year',
    before: 'Tap the candles to blow them out — and don’t forget to make a wish.',
    afterTitle: `Happy Birthday, ${NICKNAME}!`,
    afterText: 'May every single one of your dreams come true. I’ll be right here, cheering the loudest.',
    relight: 'light them again',
  },

  finalPage: {
    title: 'Happy birthday, my love',
    photo: 'photos/us-night-2.jpeg',
    photoCaption: `${NICKNAME} & ${HER_NAME}, always`,
    paragraphs: [
      'Thank you for reading this little book. Every page was written thinking of you, and somehow it still isn’t enough to hold everything I feel.',
      'I hope this year is gentle with you. I hope it’s full of reasons to smile, and that you never forget how loved you are.',
    ],
    closingLine:
      'One more year of you, and I still feel lucky that I get to know you, love you, and make memories with you.',
    surpriseButton: 'One last surprise',
    restartButton: 'close the book',
    surprise: {
      enabled: true,
      greeting: `My dearest ${HIS_NAME}, my ${NICKNAME},`,
      paragraphs: [
        'Before you close this book, I want to tell you something, slowly, so it stays.',
        'Loving you has been the easiest and most meaningful thing I have ever done. You came into my life quietly, and then suddenly you were everywhere — in my songs, in my plans, in the way I see the world.',
        'You make me feel understood. You make ordinary moments feel like scenes I want to remember forever. Even the simple things — a message, a voice note, the way you hum that song — feel like home.',
        'I know life won’t always be easy. But I want you to know that whatever comes, I’m on your side. In the loud days and the quiet ones. In the wins and in the waiting.',
        'So today, on your day, I just want to say thank you. For your heart, for your patience, for every laugh, and for letting me love you.',
      ],
      finalMessage: 'I love you. Today, tomorrow, and in every chapter we haven’t written yet.',
      signature: `— forever yours, ${HER_NAME}`,
    },
  },

  /** Tiny notes hidden behind stars, flowers and doodles on each page. */
  hiddenNotes: {
    enabled: true,
    notes: {
      cover: `Psst… ${NICKNAME}, what you’re about to read is the softest thing I’ve ever written.`,
      letter: 'I rewrote this letter so many times. It still isn’t enough.',
      reasons: 'Reason #13: you found this little flower.',
      memories: 'I wish I had a thousand more pictures of us. Let’s take them this year.',
      dreams: 'Spoiler: the answer to all of these is “yes, with you.”',
      playlist: 'Every love song makes sense since you.',
      openWhen: 'You can open these whenever you want. Even if none of the reasons fit.',
      promises: 'Promises are just love letters that haven’t happened yet.',
      wish: 'I already got my wish. It’s you.',
      final: 'Look up at the stars tonight. I’ll be thinking of you.',
    } as Partial<Record<PageId | 'cover', string>>,
  },

  /** A tiny, almost invisible heart hidden on the promises page. */
  secretHeart: {
    enabled: true,
    title: 'You found my little secret',
    message: `${NICKNAME}, I love you more than this book could ever explain. — ${HER_NAME}`,
  },
};

export const PAGE_TITLES: Record<PageId, string> = {
  letter: BOOK.letter.title,
  reasons: BOOK.reasons.title,
  memories: BOOK.memories.title,
  dreams: BOOK.dreams.title,
  playlist: BOOK.playlist.title,
  openWhen: BOOK.openWhen.title,
  promises: BOOK.promises.title,
  wish: BOOK.wish.title,
  final: BOOK.finalPage.title,
};

const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII'];

export function chapterLabel(id: PageId): string {
  const i = BOOK.pages.indexOf(id);
  return `Chapter ${ROMAN[i] ?? i + 1}`;
}
