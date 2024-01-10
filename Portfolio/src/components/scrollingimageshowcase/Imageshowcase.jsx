
import { useRef, useState } from 'react'
import styles from './Imageshowcase.module.css'

const ImageShowCase = () => {

    const [focusedSection, setFocusedSection] = useState(false)
    const [focusedURL, setFocusedURL] = useState(null)
    const [bgImgCords, setbgImgCords] = useState([0, 0])

    const imagearray = [
        '/blog/data/chic comfort unveiling the latest shawl trends/intro-image.png',
        '/blog/data/cozy couture embracing the best pashmina shawls for cold weather/intro-image.png',
        '/blog/data/crafted in kashmir exploring local craftsmanship in shawls/intro-image.png',
        '/blog/data/effortless elegance choosing the right shawl for every season/intro-image.png',
        '/blog/data/elegance personified the perfect pashmina shawl for your stylish wardrobe/intro-image.png',
        '/blog/data/empowering elegance why women deserve the luxury of premium threads/intro-image.png',
        '/blog/data/shawl statements how to make a fashion impact with your look/intro-image.png',
        '/blog/data/the art of layering elevate your look with trendy shawls/intro-image.png',
        "/blog/data/threads of strength and grace celebrating women's elegance with premium weaves/intro-image.png",
        '/blog/data/versatile elegance the global appeal of shawls in fashion/intro-image.png'
    ]

    const track = useRef()
    const focusedimage = useRef()
    const handleMouseDown = (e) => {
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        track.current.dataset.mouseDownAt = clientX;
    }

    const handleMouseMove = (e) => {
        if (track.current.dataset.mouseDownAt === '0') return
        const clientX = e.touches ? e.touches[0].clientX : e.clientX;
        const mouseDelta = parseFloat(track.current.dataset.mouseDownAt) - clientX;
        const maxDelta = window.innerWidth;
        const percentage = (mouseDelta / maxDelta) * -100,
            nextPercentageUnconstrained = parseFloat(track.current.dataset.prevPercentage) + percentage,
            nextPercentage = Math.max(Math.min(nextPercentageUnconstrained, 0), -100);

        const images = [...track.current.childNodes]

        images.map((image, index) => {
            // image.style.objectPosition = `${nextPercentage + 100}% 50%`
            image.animate({
                objectPosition: `${nextPercentage + 100}% 50%`
            }, { duration: 1200, fill: "forwards" })
        })

        track.current.dataset.percentage = nextPercentage;
        // track.current.style.transform = `translate(${nextPercentage}%,-350px)`
        track.current.animate({
            transform: `translate(${nextPercentage}%, -50%)`
        }, { duration: 1200, fill: "forwards" })
    }

    const handleMouseUp = (e) => {
        track.current.dataset.mouseDownAt = '0'
        track.current.dataset.prevPercentage = track.current.dataset.percentage
    }

    const handlesectionclick = (e, url) => {
        focusedimage.current.style.opacity = `1`
        focusedimage.current.style.width = `100vw`
        focusedimage.current.style.height = `100vh`
        setFocusedURL(url)
    }

    const handlesectionexit = () => {
        focusedimage.current.style.opacity = `0`
        focusedimage.current.style.width = `0px`
        focusedimage.current.style.height = `0px`
    }

    return (
        <>
            <div className={styles.parent} onMouseDown={(e) => { handleMouseDown(e) }} onMouseMove={(e) => { handleMouseMove(e) }} onMouseUp={(e) => { handleMouseUp(e) }}
                onTouchStart={(e) => { handleMouseDown(e) }} onTouchMove={(e) => { handleMouseMove(e) }} onTouchEnd={(e) => { handleMouseUp(e) }}>
                <div className={`${styles.track} ${focusedSection ? styles.trackfocused : ''}`} ref={track} data-mouse-down-at='0' data-prev-percentage='0'>
                    {imagearray.map((url, index) => {
                        return (
                            <img key={index} className={`${styles.image}`} src={url} draggable={false}
                                onClick={(e) => handlesectionclick(e, url)} alt='gallery images' />
                        )
                    })
                    }
                </div>
                <img className={styles.bgimg} src={focusedURL} ref={focusedimage} alt='Background Image' onClick={(e) => { handlesectionexit(e) }} />
            </div>

        </>
    )
}


export default ImageShowCase;