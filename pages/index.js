import Head from 'next/head'
import Image from 'next/image'
import { ImageMap } from '@qiuz/react-image-map';
import { useState, useRef, useEffect } from 'react';
import Loading from '../components/Loading'

export default function Home() {

    const [loading, setLoading] = useState(true);
    const [videoLoad, setVideoLoad] = useState(0);

    const [statusImage, setStatusImage] = useState(false)
    const [immagineNascosta, setImmagineNascosta] = useState(1)
    const [nomePianeta, setNomePianeta] = useState('')

    const [styleVideo1, setStyleVideo1] = useState({
        zIndex: 6
    })
    const [styleVideo2, setStyleVideo2] = useState({
        zIndex: 4
    })
    const [styleVideo3, setStyleVideo3] = useState({
        zIndex: 2
    })

    const colorPianeti = 'rgba(255, 66, 200, .0)'
    const videoTotali = 2; /** Video totali nella pagina */

    const video1 = useRef(null);
    const video2 = useRef(null);
    const video3 = useRef(null);

    const mapArea = [
        {
            name: 'Pianeta Destra',
            target: 'right',
            width: '11%',
            height: '19%',
            left: '63.5%',
            top: '36.8%',
            style: {
                background: colorPianeti, borderRadius: '50%',
            },
            render: (area, index) => (<></>),
            //onMouseOver: () => console.log('map onMouseOver'),
            //onMapClick: () => console.log('Hai cliccato il pianeta viola')
        },
        {
            name: 'Pianeta Sinistra',
            target: 'left',
            width: '12%',
            height: '20%',
            left: '22.1%',
            top: '37%',
            style: {
                background: colorPianeti, borderRadius: '50%',
            },
            render: (area, index) => (<></>),
            //onMouseOver: () => console.log('map onMouseOver'),
            //onMapClick: () => console.log('Hai cliccato il pianeta arancio')
        },
        {
            name: 'Pianeta Centrale',
            target: null,
            width: '27%',
            height: '48%',
            left: '35%',
            top: '44%',
            style: {
                background: colorPianeti, borderRadius: '50%'
            },
            render: (area, index) => (<></>),
            // onMouseOver: () => console.log('map onMouseOver'),
            // onMapClick: () => console.log('Hai cliccato il pianeta blu')
        }
    ];

    const nascondiImmagine = () => {
        setStatusImage(true)
    }
    const mostraImmagine = () => {
        setStatusImage(false)
    }

    const onMapClick = (area, index) => {
        /* 
            // const tip = `click map${index + 1}`;
            // console.log(tip, area);
            // console.log(tip);
            // console.log(area.target)
        */
        if (area.target === 'left') {
            nascondiImmagine()
            video1.current.currentTime = 0;
            playVideo(2)
            return
        }
        if (area.target === 'right') {
            nascondiImmagine()
            video2.current.currentTime = 0;
            playVideo(1)
            return
        }
    }

    const playVideo = (step) => {
        setNomePianeta('')
        if (step === 1) {
            setImmagineNascosta(1)
            video1.current.play()
            video1.current.addEventListener('ended', function () {
                console.log('video 1 finito')
                setStyleVideo1({ zIndex: 6 })
                setStyleVideo2({ zIndex: 2 })
                setNomePianeta('pianeta 1')
                mostraImmagine()
            })
        }
        else {
            setImmagineNascosta(2)
            video2.current.play()
            video2.current.addEventListener('ended', function () {
                console.log('video 2 finito')
                setStyleVideo1({ zIndex: 2 })
                setStyleVideo2({ zIndex: 6 })
                setNomePianeta('pianeta 2')
                mostraImmagine()
            })
        }
    }

    const load = () => {
        setVideoLoad(current => current + 1)
    }

    useEffect(() => {
        if (videoLoad >= videoTotali) {
            setLoading(false)
        }
    }, [videoLoad]);

    useEffect(() => {
        setLoading(false)
    }, []);

    return (

        <>
            {loading && <Loading />}

            <div className={`video-block ${statusImage ? 'showImage' : ''}`}>

                <div className={`messaggio ${!nomePianeta || 'show-nome-pianeta'}`}>{nomePianeta}</div>

                <div className="step step-1">

                    <video width="100%" className="video-box" ref={video2} style={styleVideo1} onLoadedData={() => load()}>
                        <source src={'src/cd8/video-2.mp4'} type="video/mp4" />
                        Sorry, your browser doesn&apos;t support embedded videos.
                    </video>

                    <video width="100%" className="video-box" ref={video1} style={styleVideo2} onLoadedData={() => load()}>
                        <source src={'src/cd8/video-1.mp4'} type="video/mp4" />
                        Sorry, your browser doesn&apos;t support embedded videos.
                    </video>

                    <ImageMap
                        className="usage-map"
                        src={`src/Immagini/imagine-nascosta-${immagineNascosta}.png`}
                        map={mapArea}
                        onMapClick={onMapClick}
                    />

                </div>

            </div>
            <h1 style={{ textAlign: 'center' }}>Video Caricati: {videoLoad}</h1>
        </>

    )
}
