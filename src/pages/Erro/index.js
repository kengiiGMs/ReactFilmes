import './erro.css';
import { Link } from 'react-router-dom';

function Erro(){
    return(
        <div className='erro'>
            <h2 className="titulo">Erro</h2>
            <p className="mensagem">Página não encontrada</p> 
            <p className="mensagem">Encontramos as seguintes páginas:</p>
            <Link to="/">Home</Link><br/>
            <Link to="/favoritos">Favoritos</Link>
        </div>
    )
}

export default Erro;