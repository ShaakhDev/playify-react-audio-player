import React, { useState, useRef, useEffect, useContext } from 'react'
import { SoundOff, SoundOn, ChevronDown, ChevronUp } from 'akar-icons'
import { useMediaQuery } from 'react-responsive';
import PlayerDetails from './PlayerDetails'
import PlayerControls from './PlayerControls'
import PlayingContext from '../Context'



function Player(props) {
    //context
    const { isPlaying, setIsPlaying, audioRef } = useContext(PlayingContext)
    //refrence
    const progressBar = useRef()   //refrence for progressbar
    const animationRef = useRef()  //refrence for animation
    const volumeProgressRef = useRef()  //refrence for volume control
    //states
    const [duration, setDuration] = useState(0);
    const [currentTime, setCurrentTime] = useState(0)
    const [isMute, setIsMute] = useState(false)
    const [clickCollapseBtn, setClickCollapseBtn] = useState(false)
    const isMobile = useMediaQuery({ query: '(max-width:520px)' })




    useEffect(() => {//AUDIONING UMUMIY DAVOMIYLIGINI YAXLITLAB 'duration' GA UZATADI  
        setTimeout(() => {
            const seconds = Math.floor(audioRef.current.duration)
            setDuration(seconds)
            progressBar.current.max = seconds;
        }, 1200)

    }, [audioRef, audioRef?.current?.loadedmetadata, audioRef?.current?.readyState, props.currentSongIndex])




    useEffect(() => {

        if (isPlaying) {
            audioRef.current.play();
            audioRef.current.volume = volumeProgressRef.current.value / 100;  //DEFAULT HOLATDA AUDIO OVOZI 50%
            animationRef.current = requestAnimationFrame(whilePlaying)

            //PLAY BOSILGANDA PLAYERDAGI RASMNI AYLANTIRADI
            document.querySelector('.details-img').classList.add("rotate")
        } else {
            audioRef.current.pause();
            cancelAnimationFrame(animationRef.current)
            //PAUZA BOSILGANDA RASMNI AYLANISHDAN TO'XTATADI
            document.querySelector('.details-img').classList.remove("rotate")

        }
    })


    const calculateTime = (secs) => { //YAXLITLANGAN SEKUNDLARNI 'MINUT:SEKUND' KO'RINISHIDA QAYTARADI
        const minutes = Math.floor(secs / 60)
        const returnedMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`
        const seconds = Math.floor(secs % 60);
        const returnedSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`
        return `${returnedMinutes}:${returnedSeconds}`;
    }


    const changeRange = () => { //QO'SHIQNI ISTALGAN JOYIDAN IJRO QILISH.
        audioRef.current.currentTime = progressBar.current.value;
        changePlayerCurrentTime()
    }


    const whilePlaying = () => {
        progressBar.current.value = audioRef?.current?.currentTime;
        changePlayerCurrentTime()
        animationRef.current = requestAnimationFrame(whilePlaying)
        if (audioRef.current.currentTime === audioRef.current.duration) {  //BITTA QO'SHIQ TUGAGACH AVTOMATIK RAVISHDA KEYINGI QO'SHIQQA O'TISH
            SkipSong()
        }
    }


    const changePlayerCurrentTime = () => {
        progressBar.current.style.setProperty('--seek-before-width', `${progressBar.current.value / duration * 100}%`)
        setCurrentTime(progressBar.current.value)
    }

    const changeVolumeRange = () => { //OVOZ BALANDLIGINI SOZLASH
        audioRef.current.volume = volumeProgressRef.current.value / 100
        volumeProgressRef.current.style.setProperty('--volume-before-width', `${volumeProgressRef.current.value}%`)
        audioRef.current.volume === 0 ? setIsMute(true) : setIsMute(false);
    }


    //NEXT YOKI PREV TUGMALARI BOSILGANDA KEYINGISIGA YOKI OLDINGISIGA O'TKAZADI
    const SkipSong = (forwards = true) => {
        if (forwards) {
            props.setCurrentSongIndex(() => {
                let temp = props.currentSongIndex;
                temp++;
                if (temp > props.songs.length - 1) {
                    temp = 0;
                }
                return temp;
            })
        } else {
            props.setCurrentSongIndex(() => {
                let temp = props.currentSongIndex;
                temp--;
                if (temp < 0) {
                    temp = props.songs.length - 1;
                }
                return temp;
            })
        }
        //NEXT YOKI PREV TUGMALARI BOSILGANDA RO'YXATDAGI AKTIV TURGAN QO'SHIQNING ORQA FONINI OLIB TASHLAYDI
        document.querySelectorAll('.song').forEach(song => song.classList.remove('active'))
    }

    const handleCollapseBtnClick = () => {
        setClickCollapseBtn(!clickCollapseBtn);
        showAndHideMobilePlayer()
    }

    const showAndHideMobilePlayer = () => {
        document.querySelector('.player').classList.toggle('show-mobile-player')
    }

    return (
        <div className="player" >
            {/* player collapse button for mobile */}
            {isMobile && (
                <button className="btn collapse-btn">
                    {clickCollapseBtn ? <ChevronDown onClick={handleCollapseBtnClick} /> : <ChevronUp onClick={handleCollapseBtnClick} />}

                    {/* <ChevronDown/> */}
                </button>
            )}
            <audio autoPlay id={props.songs[props.currentSongIndex].id} src={props.songs[props.currentSongIndex].src} ref={audioRef} ></audio>
            <PlayerDetails
                song={props.songs[props.currentSongIndex]}
            />
            <PlayerControls
                isPlaying={isPlaying}
                setIsPlaying={setIsPlaying}
                SkipSong={SkipSong}

            />
            <div className="player__progressbar">
                {/* current time */}
                <span className='time current'>{calculateTime(currentTime)}</span>
                {/* range player*/}
                <input ref={progressBar} defaultValue={0} max={100} onChange={changeRange} type="range" className="progressbar" />
                {/* duration time */}
                <span className='time duration' >{(duration && !isNaN(duration)) && calculateTime(duration)}</span>
                {/* volume icon  */}
                {isMute ? (<SoundOff className="volume-icon" strokeWidth={1} />) : (<SoundOn className="volume-icon" strokeWidth={1} />)}
                {/* volume progressbar */}
                <div className="volume">
                    <input ref={volumeProgressRef} onChange={changeVolumeRange} type="range" defaultValue={50} max={100} className="progressbar volume-progressbar" />
                </div>
            </div>
        </div>
    )
}

export default Player
