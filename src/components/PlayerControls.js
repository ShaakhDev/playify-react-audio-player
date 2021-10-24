import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faPause, faStepForward, faStepBackward } from '@fortawesome/free-solid-svg-icons'
function PlayerControls(props) {
    return (
        <div className="player__controls">
            <button className="skip-btn btn">
                <FontAwesomeIcon icon={faStepBackward} onClick={() => props.SkipSong(false)} />
            </button>
            <button className="play-btn btn" onClick={() => props.setIsPlaying(!props.isPlaying)}>
                <FontAwesomeIcon icon={props.isPlaying ? faPause : faPlay} />
            </button>
            <button className="skip-btn btn">
                <FontAwesomeIcon icon={faStepForward} onClick={() => props.SkipSong()} />
            </button>

        </div>
    )
}


export default PlayerControls
