import {
    Meta,
    Links,
    Outlet,
    Scripts,
    LiveReload, 
    Link,
    useRouteError,
    isRouteErrorResponse,
    ScrollRestoration
} from '@remix-run/react'

import styles from '~/styles/index.css'
import Header from '~/components/header';
import Footer from '~/components/footer';
import { useEffect, useState } from 'react';


export function meta() {
    return [
      { charset: "utf-8" },
      { title: "GuitarLA - Remix" },
      { name: "viewport", content: "width=device-width,initial-scale=1" },
    ];
  }


  export function links(){
    return[

        {
            rel: 'stylesheet',
            href: 'https://necolas.github.io/normalize.css/8.0.1/normalize.css'
        },
        {
            rel: 'preconnect',
            href: 'https://fonts.googleapis.com'
        },
        {
            rel: 'preconnect',
            href: 'https://fonts.gstatic.com',
            crossOrigin: "true"
        },
        {
            rel: 'stylesheet',
            href: 'https://fonts.googleapis.com/css2?family=Outfit:wght@400;700;900&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,700&display=swap'
        },
        {
            rel: 'stylesheet',
            href: styles
        }

    ]
  }

export default  function App(){
    const carritoLs = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('carrito')) ?? [] : []
    const [carrito, setCarrito] = useState(carritoLs);

    useEffect(() => {
        localStorage.setItem('carrito', JSON.stringify(carrito))
    }, [carrito])

    const agregarCarrito = guitarra => {
        if(carrito.some(guitarraState => guitarraState.id === guitarra.id)){
            //Iterar sobre el primer arreglo, e identificar el elemento duplicado
            const carritoActualizado = carrito.map(guitarraState => {
                if(guitarraState.id === guitarra.id){
                    //Reescribir la cantidad
                    guitarraState.cantidad = guitarra.cantidad;
                }
                return guitarraState;
            })
            //Agregar al carrito
            setCarrito(carritoActualizado);
        }else{
            //Nuevo Registro, agregar al carrito
            setCarrito([...carrito, guitarra]);
        }
    }

    const actualizarCantidad = guitarra => {
        const carritoActualizado = carrito.map(guitarraState => {
            if(guitarraState.id === guitarra.id){
                guitarraState.cantidad = guitarra.cantidad
            }
            return guitarraState;
        })
        setCarrito(carritoActualizado);
    }

    const eliminarGuitarra = id => {
        const carritoActualizado = carrito.filter( guitarraState => guitarraState.id !== id)
        setCarrito(carritoActualizado);
    }

    return(
        <Document>
            <Outlet context={{
                    agregarCarrito, 
                    carrito, 
                    actualizarCantidad,
                    eliminarGuitarra
                }} 
            />
        </Document>
    )
}

function Document({children}) {
    return(
        <html lang="es">
            <head>
                <Meta />
                <Links />
            </head>
            <body>
                <Header/>
                {children}
                <Footer/>
                <ScrollRestoration/>
                <Scripts />
                <LiveReload/>
            </body>

        </html>
    )
}

// Manejo de errores
export function ErrorBoundary(){

    const error = useRouteError();

    if(isRouteErrorResponse(error)){
        return(
            <Document>
                <p className='error'>{error.status} {error.statusText}</p>
                <Link className='error-enlace' to="/">Volver a página princial</Link>
            </Document> 
        )
    }

}