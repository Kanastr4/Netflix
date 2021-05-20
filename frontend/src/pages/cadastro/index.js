import React, { useState } from 'react'
import api from '../../service/api'
import './cadastro.css'
import logo from '../../img/logo-netflix-256.png'
import Swal from 'sweetalert2'

function Cadastro({ history }) {
    const regex = /^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/;
    const regexN = /[0-9]/;
    const [name, setName] = useState(false);
    const [user, setUser] = useState(false);
    const [password, setPassword] = useState(false);
    const [nameValue, setNameValue] = useState('');
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
            <div class="Cadastre-se">
                <form>
                    <h1>Cadastre-se</h1>
                    <input placeholder='Nome' type='nome' onChange={e => {
                        setNameValue(e.target.value)
                        if (name)
                            setName(false);
                    }} />
                    {name && (
                        <p>
                            Informe um nome válido.
                        </p>
                    )}
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
                        if (!userValue || userValue.length < 3 || !regex.test(userValue)) {
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
                        if (!nameValue || nameValue.length < 2 || regexN.test(nameValue)) {
                            setName(true);
                        }
                        else {
                            setName(false);
                        }
                        if (!user && !password && !name) {
                            const token = await api.post('/api/login', {
                                name: nameValue,
                                email: userValue,
                                password: passwordValue
                            })
                            if (token.data.token) {
                                localStorage.setItem('netflix_token', token.data.token)
                                Swal.fire({
                                    icon: 'success',
                                    title: 'Cadastro realizado com sucesso!',
                                })
                                history.push('/main')
                            }
                            else {
                                setUser(true);
                            }
                        }
                    }
                    } >Registre-se</button>
                </form>
            </div>
        </div >
    )

}

export default Cadastro;