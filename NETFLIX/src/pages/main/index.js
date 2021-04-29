import React, { useState } from 'react'
import Result from '../../Components/Result';
import logo from '../../img/logo-netflix-256.png'
import swapi from '../../service/swapi'
import './main.css'


export default ({ history }) => {

    const [searchText, setSearchText] = useState('');
    const [result, setResult] = useState(null);

    if (!localStorage.getItem('netflix_token'))
        history.push('/');
    function handleLogin(e) {
        e.preventDefault()
        localStorage.setItem('netflix_token', '')
        history.push('/');
    }

    return (
        <div class="fundo">
            <div>
                <div class="cabecalho">
                    <img src={logo} alt="" />
                    <div class="cDireita">
                        <button onClick={handleLogin} class="btnEntrar">Sair</button>
                    </div>
                </div>
            </div>
            <div className="container searchApp">
                <h2 className="busca">
                    Busque personagens de Star Wars pelo ID
                </h2>
                <input onChange={e => { setSearchText(e.target.value) }}></input>
                <button type="submit" onClick={async () => {
                    setResult(null)
                    const promise = swapi.get('/people/' + searchText)
                    const aux = await Promise.all([promise])
                    setResult(aux[0].data)
                }}>Buscar</button>
            <Result data={result} />
        </div>
        </div >
    )
}