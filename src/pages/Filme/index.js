import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from '../../services/api';
import './filme.css';
function Filme(){
    const { id } = useParams();
    const navigate = useNavigate();
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
                alert("Filme não encontrado");
                navigate ("/", {replace: true});
            })
        }
        loadFilme();
    }, [navigate, id])

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
            <strong>Avaliação: {filme.vote_average} / 10</strong>

            <div className="area-buttons">
            <button>Salvar</button>
                <button>
                    <a target="_blank" rel="external" href={`https://youtube.com/results?search_query=${filme.title} Trailer`}>Trailer</a>
                </button>
            </div>
        </div>
    )
}

export default Filme;