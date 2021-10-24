import { useState } from 'react'
import { Search, Cross } from 'akar-icons'

export default function SearchInput() {
    const [inputShown, setInputShown] = useState(false);

    const ShowInputOnClick = () => {
        setInputShown(true)
        document.querySelector('.search__cross-icon').style.display = "inline"
        document.querySelector('.search__icon').classList.add('maximize')
    }
    const HideInputOnClick = () => {
        setInputShown(false)
        document.querySelector('.search__icon').classList.remove('maximize')
        document.querySelector('.search__cross-icon').style.display = "none"
    }
    return (
        <div className="search">
            <Search onClick={() => ShowInputOnClick()} className="search__icon" strokeWidth={1} />
            {inputShown && (<input type="text" id="search" placeholder="Artists,songs..." />)}
            <Cross onClick={() => HideInputOnClick()} strokeWidth={1} className="search__cross-icon" />
        </div>
    )
}
