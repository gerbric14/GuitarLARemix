import { Link, useLocation } from "@remix-run/react"
import Navegacion from "./navegacion"

function Footer() {
    const location = useLocation();

  return (
    <footer className="footer">
        <div className="contenedor contenido">
            <Navegacion />

            <p className="copyright">Todos los derechos reservados {new Date().getFullYear()}</p>

        </div>

    </footer>
  )
}

export default Footer