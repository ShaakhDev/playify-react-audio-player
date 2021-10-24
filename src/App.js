import React, { lazy, Suspense, useState } from 'react';

// import Header from './components/Header';
const Header = lazy(() => import('./components/Header'))
// import SearchInput from './components/SearchInput';
const SearchInput = lazy(() => import('./components/SearchInput'))
// import SongList from './components/SongList';
const SongList = lazy(() => import('./components/SongList'))
const Player = lazy(() => import('./components/Player'))


function App() {
  const [songs] = useState([
    {
      id: 1,
      title: 'lovely',
      artist: 'Billie Eilish-Khalid',
      img: '../image/song1.webp',
      src: '../songs/billie-eilish-khalid_-_lovely.mp3'
    }, {
      id: 2,
      title: 'Слёза бандита',
      artist: 'Gone Fludd',
      img: '../image/song2.webp',
      src: '../songs/gone-fludd_-_sleza-bandita.mp3'
    }, {
      id: 3,
      title: 'Искал нашел',
      artist: 'Jah Khalib',
      img: '../image/song3.webp',
      src: '../songs/jah-khalib_-_iskal-nashel.mp3'
    }, {
      id: 4,
      title: 'Лиловая',
      artist: 'Jah Khalib',
      img: '../image/song4.webp',
      src: '../songs/jah-khalib_-_lilovaya.mp3'
    }, {
      id: 5,
      title: 'Заплаканная',
      artist: 'Miyagi&Endshpil ',
      img: '../image/song5.webp',
      src: '../songs/miyagi-endshpil_-_zaplakannaya.mp3'
    }, {
      id: 6,
      title: 'Кукушка',
      artist: 'Полина Гагарина',
      img: '../image/song6.webp',
      src: '../songs/polina-gagarina_-_kukushka.mp3'
    }, {
      id: 7,
      title: '6.18.18',
      artist: 'Billie Eilish',
      img: '../image/song5.webp',
      src: '../songs/Billie Eilish - 6.18.18.mp3'
    }, {
      id: 8,
      title: 'Sugar & Brownies',
      artist: 'Dharia',
      img: '../image/song3.webp',
      src: '../songs/Dharia - Sugar & Brownies.mp3'
    }, {
      id: 9,
      title: 'Bad Guy',
      artist: 'Billie Eilish',
      img: '../image/song9.webp',
      src: '../songs/Billie Eilish - Bad Guy.mp3'
    }, {
      id: 10,
      title: 'Arcade',
      artist: 'Duncan Laurence',
      img: '../image/song10.webp',
      src: '../songs/Duncan Laurence - Arcade.mp3'
    }, {
      id: 11,
      title: 'X.O',
      artist: 'The Limba',
      img: '../image/song11.webp',
      src: '../songs/The Limba - X.O.mp3'
    }, {
      id: 12,
      title: 'Cradles',
      artist: 'Sub Urban',
      img: '../image/song12.webp',
      src: '../songs/Sub Urban - Cradles.mp3'
    }, {
      id: 13,
      title: 'Memories',
      artist: 'Xcho',
      img: '../image/song2.webp',
      src: '../songs/Xcho - Memories.mp3'
    },
  ])
  const [currentSongIndex, setCurrentSongIndex] = useState(0)




  return (
    <Suspense fallback={'Loading'}>
      <div className="App">
        <Header />
        <div className="container">
          <div className="content-box">
            <div className="songs-box">
              <SearchInput />
              <SongList
                songs={songs}
                currentSongIndex={currentSongIndex}
                setCurrentSongIndex={setCurrentSongIndex}
              />
            </div>

            <Player

              currentSongIndex={currentSongIndex}
              setCurrentSongIndex={setCurrentSongIndex}
              songs={songs}
            />
          </div>
        </div>
      </div>
    </Suspense>
  );
}

export default React.memo(App, () => true);
