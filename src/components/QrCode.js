import React from 'react';
import { useQRCode } from 'next-qrcode';import Card from "./Card";

function QrCode(props) {
    const { Canvas } = useQRCode();
    return(
        <Canvas
            text={props.qrCode}
            options={{
                type: 'image/jpeg',
                quality: 1,
                level: 'H',
                margin: 4,
                scale: 4,
                width: 400,
                color: {
                    dark: '#000000ff',
                    light: '#ffffffff',
                },
            }}
        />
    );
}

export default QrCode
