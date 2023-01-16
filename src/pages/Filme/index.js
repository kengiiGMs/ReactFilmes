import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from '../../services/api';
import './filme.css';
function Filme(){
    const { id } = useParams();
    const [filme, setFilme] = useState([]);
    const [loading,setLoading] = useState(true);

    useEffect(()=>{
        async function loadFilme(){
            await api.get(`/movie/${id}`,{
                params:{
                    api_key: process.env.REACT_APP_KEY_API,
                    language: "pt-BR",
                }
            })
            .then((response)=>{
                setFilme(response.data);
                setLoading(false);
            })
            .catch(()=>{
                console.log("Filme não encontrado");
            })
        }
        loadFilme();
    }, [])

    if(loading){
        return(
            <div className='filme-info'>
                <h3>Carregando Detalhes do Filmes... </h3>
            </div>
        )
    }
    return(
        <div className='filme-info'>
            <h1>{filme.title}</h1>
            <img src={`https://image.tmdb.org/t/p/original/${filme.backdrop_path}`} alt={filme.title}></img>
            <h3>Sinopse</h3>
            <span>{filme.overview}</span>
            <strog>Avaliação: {filme.vote_average} / 10</strog>

            <div className="area-buttons">
            <button>Salvar</button>
                <button>
                    <a href="#">Trailer</a>
                </button>
            </div>
        </div>
    )
}

export default Filme;