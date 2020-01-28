import React from 'react';

const Popup = ({show, spanNumber, closePopup, spanSize, spanColor, addSpan, colors }) => (
    <div 
        className='popup'
        style={{display: `${show ? 'flex' : 'none' }`}}
    >
        <span className='popup__span-number'>
            this span № {spanNumber}
        </span>
        
        <div className='select-wrap'>
            <div>
                Color:
            </div>
            <select ref={spanColor}>
                {colors.map((item, id) => (
                    <option key={id}>
                        {item}
                    </option>
                ))}
            </select>
        </div>
        
        <div className='select-wrap'>
            <div>
                Vertical height
            </div>
            <select ref={spanSize}>
                <option>
                    1
                </option>
                <option>
                    2
                </option>
                <option>
                    3
                </option>
            </select>
        </div>
        
        <button onClick={()=>addSpan(true)}>
            Add span
        </button>
        <button onClick={()=>addSpan(false)}>
            Delete span
        </button>

        <div className='popup__close' onClick={closePopup}>
            x
        </div>
    </div>
)

export default Popup