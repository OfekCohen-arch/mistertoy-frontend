const API = 'AIzaSyC4CjJVEH9xfcb6ntduGdYC4wSZLaRlxBU'
import { useState } from "react"
import { AdvancedMarker, APIProvider, InfoWindow, Map, Pin, useAdvancedMarkerRef } from "@vis.gl/react-google-maps"
export function GoogleMap() {
    const [telAvivRef, telAvivMarker] = useAdvancedMarkerRef()
    const [eilatRef, eilatMarker] = useAdvancedMarkerRef()
    const [haderaRef, haderaMarker] = useAdvancedMarkerRef()

    const zoom = 8
    return (
        <section className="google-map">
            <APIProvider apiKey={API} >
                <Map
                    mapId={'bf51a910020fa25a'}
                    defaultZoom={zoom}
                    defaultCenter={{ lat: 32.0853, lng: 34.7818 }}
                    disableDefaultUI={false}
                >
                    <AdvancedMarker
                        position={{ lat: 32.0853, lng: 34.7818 }}
                        ref={telAvivRef}
                    >
                        <Pin background={'dodgerblue'} glyphColor={'hotpink'} borderColor={'black'} />
                        <InfoWindow anchor={telAvivMarker}>
                            <h3>Tel Aviv</h3>
                        </InfoWindow>

                    </AdvancedMarker>
                    <AdvancedMarker
                        position={{ lat: 32.4340, lng: 34.9197 }
                        }
                        ref={haderaRef}
                    >
                        <Pin background={'dodgerblue'} glyphColor={'hotpink'} borderColor={'black'} />
                        <InfoWindow anchor={haderaMarker}>
                            <h3>Chadera</h3>
                        </InfoWindow>

                    </AdvancedMarker>
                    <AdvancedMarker
                        position={{ lat: 29.5577, lng: 34.9519 }}
                        ref={eilatRef}
                    >
                        <Pin background={'dodgerblue'} glyphColor={'hotpink'} borderColor={'black'} />
                        <InfoWindow anchor={eilatMarker}>
                            <h3>Eilat</h3>
                        </InfoWindow>

                    </AdvancedMarker>
                </Map>
            </APIProvider>
        </section>
    )
}