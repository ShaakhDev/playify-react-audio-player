import { useContext, useEffect } from 'react'
import PlayingContext from '../Context'

export default function SongList(props) {
    //context
    const { isPlaying, setIsPlaying, audioRef } = useContext(PlayingContext)


    useEffect(() => {   //====> SAHIFA LOAD BO'LGANDA HAMMA MP3 FAYLLARNING DURATION VAQTINI OLIB BERADI 
        getDurationsOfAudios()
    }, [])




    useEffect(() => {     //====> LISTDAGI QO'SHIQLARDAN BIRINI TANLAGANDA ULARNING STILIGA MANIPULYATSIYA QILISH UCHUN 
        const titleItems = document.querySelectorAll('.song__title')
        titleItems.forEach((item) => {    //BIROR QO'SHIQ TANLANGANDA TITLE NI RANGINI O'ZGARTIRADI
            item.classList.remove('playing-now')
            if (item.id === audioRef?.current?.id) {
                item.classList.add('playing-now')
            }
        })
    }, [audioRef?.current?.id, isPlaying, props.currentSongIndex])




    useEffect(() => {
        const indexItems = document.querySelectorAll('.song__index')
        indexItems.forEach((item) => {    //BIROR QO'SHIQ TANLANGANDA QO'SHIQNING TARTIB RAQAMINI ANIMATSIYAGA YOKI RANGINI O'ZGARTIRADI
            item.classList.remove('playing-now')
            item.innerHTML = item.id;
            if (item.id === audioRef?.current?.id) {
                item.classList.add('playing-now')
                if (isPlaying) {  //AGAR TANLANGAN PAYTDA QO'SHIQ IJRO ETILIB TURGAN BO'LSA ANIMATSIYA CHIQADI
                    item.innerHTML = "<img src='../image/animated-equalizer.gif' />"
                } else {         //AGAR TANLANGAN PAYTDA QO'SHIQ PAUZA BO'LSA TARTIB RAQAMNI KO'RSATADI. 
                    item.innerHTML = item.id
                }
            }
        })
    }, [audioRef?.current?.id, isPlaying, props.currentSongIndex])



    const getDurationsOfAudios = () => { //HAR BIR MP3 NING 'duration' QIYMATINI ANIQLAB APPJS DAGI QO'SHIQ OBYEKTIGA QO'SHIB QO'YADI 
        props.songs.map((song) => {
            const audio = document.createElement('audio');
            audio.src = song.src;
            audio.addEventListener('loadedmetadata', () => {
                let item = calculateTime(audio.duration)
                song.duration = item
            })
        })
    }



    const calculateTime = (secs) => { //YAXLITLANGAN SEKUNDLARNI 'MINUT:SEKUND' KO'RINISHIDA QAYTARADI
        const minutes = Math.floor(secs / 60)
        const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`
        const seconds = Math.floor(secs % 60);
        const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`
        return `${returnedMinutes}:${returnedSeconds}`;
    }



    const chooseSong = (index) => { //RO'YXATDAGI QO'SHIQNI BOSGANDA PLAYERGA SHU QO'SHIQNI UZATADI.
        props.setCurrentSongIndex(index)
        setIsPlaying(true)
        activeBg(index)

    }



    const activeBg = (index) => { //QO'SHIQLAR RO'YXATIDAGI BOSILGAN QO'SHIQNING ORQA FONINI O'ZGARTIRADI
        const songs = document.querySelectorAll('li')
        songs.forEach(song => {
            song.classList.remove('active')
        })
        songs[index].classList.add('active');
    }




    return (
        <ul className="song__list">
            {props.songs.map((item, index) => {
                return (
                    <li key={item.id} className="song" onClick={() => chooseSong(index)}>
                        <span id={item.id} className="song__index">{item.id}</span>
                        <img className="song__poster" src={item.img} width={40} alt="" />
                        <div className="song__title-box">
                            <p id={item.id} className="song__title">{item.title}</p>
                            <span className="song__artist" >{item.artist}</span>
                        </div>
                        <span className="song__duration">{item.duration}</span>
                    </li>
                )
            })}
        </ul>
    )
}