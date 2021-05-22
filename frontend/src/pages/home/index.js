import React from 'react'
import logo from '../../img/logo-netflix-256.png'
import './homeScreen.css'

export default ({ history }) => {
    if (localStorage.getItem('netflix_token'))
        history.push('/main');
    function handleLogin(e) {
        e.preventDefault()
        history.push('/login');
    }
    return (
        <div className="fundo">
            <div>
                <div className="cabecalho">
                    <img src={logo} alt="" />
                    <div className="cDireita">
                        <div className="select-conteiner">
                            <select>
                                <option value="Portugues">Português</option>
                                <option value="ingles">Inglês</option>
                            </select>
                        </div>
                        <button onClick={handleLogin} className="btnEntrar">Entrar</button>
                    </div>
                </div>

                <div className="corpo">
                    <div>
                        <h1>Filmes, séries e muito mais. Sem limites.</h1>
                        <h2>Assista onde quiser. Cancele quando quiser.</h2>
                        <form>
                            <h3>Pronto para assistir? Informe seu email para criar ou reiniciar sua assinatura.</h3>
                            <div className="formulario">
                                <input type="text" placeholder="Email" />
                                <div className="btnVamos"><a>Vamos lá {'>'}</a></div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}