import React, { useState } from 'react'
import api from '../../service/api'
import './styles.css'
import logo from '../../img/logo-netflix-256.png'

function LoginScreen({history}) {
    const [user, setUser] = useState(false);
    const [password, setPassword] = useState(false);
    const [userValue, setUserValue] = useState('');
    const [passwordValue, setPasswordValue] = useState('');
    if (localStorage.getItem('netflix_token'))
    history.push('/main');
    return (
        <div class="fundo">
            <div>
                <div class="cabecalho">
                    <img src={logo} alt="" />
                </div>
            </div>
            <div class="Entrar">
                <form>
                    <h1>Entrar</h1>
                    <input placeholder='Email ou número de telefone' type='email' onChange={e => {
                        setUserValue(e.target.value)
                        if (user)
                            setUser(false);
                    }} />
                    {user && (
                        <p>
                            Informe um email ou número de telefone válido.
                        </p>
                    )}
                    <input placeholder='Senha' type='senha' onChange={e => {
                        setPasswordValue(e.target.value)
                        if (password)
                            setPassword(false);
                    }} />
                    {password && (
                        <p>
                            A senha deve ter entre 4 e 60 caracteres.
                        </p>
                    )}
                    <button onClick={async e => {
                        e.preventDefault();
                        if (!userValue || userValue.length < 3) {
                            setUser(true);
                        }
                        else {
                            setUser(false);
                        }
                        if (!passwordValue || passwordValue.length < 3) {
                            setPassword(true);
                        }
                        else {
                            setPassword(false);
                        }
                        if (!user && !password) {
                            const token = await api.post('/api/login', {
                                email: userValue,
                                password: passwordValue
                            })
                            if (token.data.token) {
                                localStorage.setItem('netflix_token', token.data.token)
                                alert("Login realizado com sucesso!")
                                history.push('/main')
                            }
                        }
                    }} >Entrar</button>

                    <ul>
                        <li>
                            <input type='checkbox' />
                            <p>Lembre-se de mim</p>
                        </li>
                        <li>
                            <a>Precisa de ajuda?</a>
                        </li>
                    </ul>
                    <span>
                        <img src='https://assets.nflxext.com/ffe/siteui/login/images/FB-f-Logo__blue_57.png' alt='facebook' />
                        <p>Conectar com o Facebook</p>
                    </span>
                    <span>
                        <p>Novo por aqui?</p>
                        <a>Assine agora</a>
                    </span>
                    <span>
                        <p>Esta página é protegida pelo Google reCAPTCHA</p>
                    </span>
                    <span>
                        <p>para garantir que você não é um robô.</p>
                        <a className='saiba_mais'>Saiba mais.</a>
                    </span>
                </form>
            </div>
        </div>
    )

}

export default LoginScreen