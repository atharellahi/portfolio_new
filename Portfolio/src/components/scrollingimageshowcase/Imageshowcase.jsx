
import React from 'react'
import { useRef, useState } from 'react'
import styles from './Imageshowcase.module.css'

const ImageShowCase = () => {
    const [focusedSection, setFocusedSection] = useState(null)
    const [focusedURL, setFocusedURL] = useState(null)
    const [dataMouseDownAt, setDataMouseDownAt] = useState(0)
    const [dataPrevPercentage, setDataPrevPercentage] = useState(0)
    const [dataPercentage, setDataPercentage] = useState(0)
    const [allowClick, setAllowClick] = useState(true)

    const imagearray = [
        {
            'section name': 'Stack',
            'url': '/blog/data/effortless elegance choosing the right shawl for every season/intro-image.png'
        },
        {
            'section name': 'Projects',
            'url': '/blog/data/cozy couture embracing the best pashmina shawls for cold weather/intro-image.png'
        },
        {
            'section name': 'Services',
            'url': '/blog/data/crafted in kashmir exploring local craftsmanship in shawls/intro-image.png'
        },
        {
            'section name': 'About Me',
            'url': '/blog/data/chic comfort unveiling the latest shawl trends/intro-image.png'
        },
    ]

    const track = useRef()
    const focusedimage = useRef()

    const handleMouseDown = (e) => {
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        setDataMouseDownAt(clientX)
    }

    const handleMouseMove = (e) => {
        if (dataMouseDownAt === 0) return
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const mouseDelta = parseFloat(dataMouseDownAt) - clientX;
        const maxDelta = window.innerWidth < 600 ? window.innerWidth * 2 : window.innerWidth;
        const percentage = (mouseDelta / maxDelta) * -100,
            nextPercentageUnconstrained = parseFloat(dataPrevPercentage) + percentage,
            nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);

        const images = [...document.querySelectorAll(`.${styles.image}`)]

        images.map((image, index) => {
            // image.style.objectPosition = `${nextPercentage + 100}% 50%`
            image.animate({
                objectPosition: `${nextPercentage + 100}% 50%`
            }, { duration: 1200, fill: "forwards" })
        })

        setDataPercentage(nextPercentage)
        // track.current.style.transform = `translate(${nextPercentage}%,-350px)`
        track.current.animate({
            transform: `translate(${nextPercentage}%, -50%)`
        }, { duration: 1200, fill: "forwards" })
    }

    const handleMouseUp = (e) => {
        setDataMouseDownAt(0)
        if (dataPrevPercentage !== dataPercentage) setAllowClick(false)
        if (dataPrevPercentage === dataPercentage) setAllowClick(true)
        setDataPrevPercentage(dataPercentage ? dataPercentage : 0)
    }

    const handlesectionclick = (url, name) => {
        if (!allowClick) return
        setFocusedURL(url)
        setFocusedSection(name)
        focusedimage.current.style.opacity = `1`
        focusedimage.current.style.width = `100vw`
        focusedimage.current.style.height = `100vh`
        setTimeout(() => {
            focusedimage.current.classList.add(styles.bluredbg)
        }, 500);

    }

    const handlesectionexit = () => {
        focusedimage.current.style.opacity = `0`
        focusedimage.current.style.width = `0px`
        focusedimage.current.style.height = `0px`
        focusedimage.current.classList.remove(styles.bluredbg)
    }

    return (
        <>
            <div className={styles.parent} onMouseDown={(e) => { handleMouseDown(e) }} onMouseMove={(e) => { handleMouseMove(e) }} onMouseUp={(e) => { handleMouseUp(e) }}
                onTouchStart={(e) => { handleMouseDown(e) }} onTouchMove={(e) => { handleMouseMove(e) }} onTouchEnd={(e) => { handleMouseUp(e) }}>
                <div className={`${styles.track}`} ref={track}>
                    {imagearray.map((item, index) => {
                        return (
                            <div className={styles.section} key={index} onClick={() => handlesectionclick(item.url, item['section name'])}>
                                <img className={`${styles.image}`} key={index} src={item.url} draggable={false} alt='gallery images' />
                                <div className={styles.sectionname}>{item['section name']}</div>
                                <div className={styles.shadowbox}></div>
                            </div>

                        )
                    })
                    }
                </div>
                <div className={styles.expandedsection} onClick={(e) => { handlesectionexit(e) }}>
                    <img className={styles.bgimg} src={focusedURL} ref={focusedimage} alt='Background Image' />
                    <div className={styles.expandedcontainer}>
                        {focusedSection === 'Stack' ?
                            <>
                            </>
                            :
                            null
                        }
                        {focusedSection === 'Projects' ?
                            <>
                            </>
                            :
                            null
                        }
                        {focusedSection === 'Services' ?
                            <>
                            </>
                            :
                            null
                        }
                        {focusedSection === 'About Me' ?
                            <>
                            </>
                            :
                            null
                        }
                    </div>
                </div>

            </div>

        </>
    )
}


export default ImageShowCase;