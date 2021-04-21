import React from 'react'
import logo from '../../img/logo-netflix-256.png'


export default ({ history }) => {
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
        </div>
    )
}