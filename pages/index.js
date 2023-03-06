import Head from 'next/head'
import Image from 'next/image'
import { ImageMap } from '@qiuz/react-image-map';
import { useState, useRef, useEffect } from 'react';
import Loading from '../components/Loading'
import { Container, Row, Col } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


import video1 from '../src/cd8/video-1.mp4'
import video2 from '../src/cd8/video-2.mp4'
import video3 from '../src/cd8/video-3.mp4'
import video4 from '../src/cd8/video-4.mp4'
import video5 from '../src/cd8/video-5.mp4'

import imageVideo1 from '/public/assets/images/imagine-nascosta-1.png'
import imageVideo2 from '/public/assets/images/imagine-nascosta-2.png'

export default function Home() {

    const [loading, setLoading] = useState(true);
    const [videoLoad, setVideoLoad] = useState(0);

    const [statusImage, setStatusImage] = useState(false)
    const [immagineNascosta, setImmagineNascosta] = useState(imageVideo1)
    const [nomePianeta, setNomePianeta] = useState('')

    const [styleVideo1, setStyleVideo1] = useState({
        zIndex: 6
    })
    const [styleVideo2, setStyleVideo2] = useState({
        zIndex: 5
    })
    const [styleVideo3, setStyleVideo3] = useState({
        zIndex: 4
    })
    const [styleVideo4, setStyleVideo4] = useState({
        zIndex: 3
    })
    const [styleVideo5, setStyleVideo5] = useState({
        zIndex: 2
    })

    const colorPianeti = 'rgba(255, 66, 200, .0)'
    const videoTotali = 2; /** Video totali nella pagina */

    const video1Ref = useRef(null);
    const video2Ref = useRef(null);
    const video3Ref = useRef(null);
    const video4Ref = useRef(null);
    const video5Ref = useRef(null);

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
            video1Ref.current.currentTime = 0;
            playVideo(2)
            return
        }
        if (area.target === 'right') {
            nascondiImmagine()
            video2Ref.current.currentTime = 0;
            playVideo(1)
            return
        }
    }

    const playVideo = (step) => {
        setNomePianeta('')
        if (step === 1) {
            setImmagineNascosta(imageVideo1)
            video1Ref.current.play()
            video1Ref.current.addEventListener('ended', function () {
                console.log('video 1 finito')
                setStyleVideo1({ zIndex: 6 })
                setStyleVideo2({ zIndex: 2 })
                setNomePianeta('pianeta 2')
                mostraImmagine()
            })
        }
        else {
            setImmagineNascosta(imageVideo2)
            video2Ref.current.play()
            video2Ref.current.addEventListener('ended', function () {
                console.log('video 2 finito')
                setStyleVideo1({ zIndex: 2 })
                setStyleVideo2({ zIndex: 6 })
                setNomePianeta('pianeta 1')
                mostraImmagine()
            })
        }
    }

    const load = () => {
        setVideoLoad(current => current + 1)
    }

    useEffect(() => {
        setTimeout(function () {
            setLoading(false)
        }, 1680)
    }, []);

    return (

        <>
            <Loading loading={loading} />

            <Container>
                <Row>
                    <Col>
                        <div className={`video-block ${statusImage ? 'showImage' : ''}`}>

                            <div className={`messaggio ${!nomePianeta || 'show-nome-pianeta'}`}>{nomePianeta}</div>


                            { /* <Image src={immagineNascosta} height={1080} width={1920} priority="true" alt="immagine Anteprima" className="image-preview" /> */}

                            <div className="step step-1">

                                <video width="100%" className="video-box" ref={video2Ref} style={styleVideo1} onLoadedData={() => load()}>
                                    <source rel="prefetch" src={video2} type="video/mp4" />
                                    Sorry, your browser doesn&apos;t support embedded videos.
                                </video>

                                <video width="100%" className="video-box" ref={video1Ref} style={styleVideo2} onLoadedData={() => load()}>
                                    <source rel="prefetch" src={video1} type="video/mp4" />
                                    Sorry, your browser doesn&apos;t support embedded videos.
                                </video>

                                <video width="100%" className="video-box" ref={video3Ref} style={styleVideo3} onLoadedData={() => load()}>
                                    <source rel="prefetch" src={video3} type="video/mp4" />
                                    Sorry, your browser doesn&apos;t support embedded videos.
                                </video>

                                <video width="100%" className="video-box" ref={video4Ref} style={styleVideo4} onLoadedData={() => load()}>
                                    <source rel="prefetch" src={video4} type="video/mp4" />
                                    Sorry, your browser doesn&apos;t support embedded videos.
                                </video>

                                <video width="100%" className="video-box" ref={video5Ref} style={styleVideo5} onLoadedData={() => load()}>
                                    <source rel="prefetch" src={video5} type="video/mp4" />
                                    Sorry, your browser doesn&apos;t support embedded videos.
                                </video>

                                <ImageMap
                                    className="usage-map"
                                    src={'../assets/images/maschera.png'}
                                    map={mapArea}
                                    onMapClick={onMapClick}
                                />

                            </div>

                        </div>
                        <h1 style={{ marginTop: 24, textAlign: 'center' }}>Video Caricati: {videoLoad}</h1>
                    </Col>
                </Row>
            </Container>
        </>

    )
}
