import React, { useState, useEffect } from 'react'
import '../styles/perfil.css'
import api from '../service/api'
import $ from 'jquery'
import Swal from 'sweetalert2'
import { AccountSVG } from '../img/icons'

export default function Perfil({ history, setLoading, setFoto }) {
    const [photo, setPhoto] = useState(localStorage.getItem('photo'))
    const [editar, setEditar] = useState(true)
    const [user, setUser] = useState(localStorage.getItem('username'))
    const [email, setEmail] = useState(localStorage.getItem('email'))
    const emailValidator = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/

    function handleSave(e){
        e.preventDefault()
        Swal.fire({
            title: 'Tem certeza que deseja salvar as alterações?',
            icon: 'warning',
            showConfirmButton: true,
            showLoaderOnConfirm: true,
            showDenyButton: true,
            confirmButtonColor: 'green',
            confirmButtonText: `Confirmar`,
            denyButtonText: `Cancelar`,
            denyButtonColor: 'red'
          }).then(async (result) => {
            if (result.isConfirmed) {
                setLoading(true)
                const aux = await api.put('/user/update', {
                    usuario: user,
                    email: email,
                    foto: photo
                })
                setLoading(false)
                if(aux.data != 1) {
                    localStorage.setItem('photo', aux.data.foto.url)
                    localStorage.setItem('email', aux.data.email)
                    setFoto(aux.data.foto.url)
                    await Swal.fire({
                        position: 'center',
                        icon: 'success',
                        title: 'Alterações realizadas com sucesso!',
                        showConfirmButton: false,
                        timer: 1500
                    })
                }  
            }
            return
        }) 
    }

    function handleDelete(e){
        e.preventDefault()

        Swal.fire({
            title: 'Tem certeza que deseja excluir sua conta?',
            icon: 'warning',
            showConfirmButton: true,
            showDenyButton: true,
            confirmButtonColor: 'green',
            confirmButtonText: `Confirmar`,
            denyButtonText: `Cancelar`,
            denyButtonColor: 'red'
          }).then(async (result) => {
            if (result.isConfirmed) {
                setLoading(true)
                await api.post('/user/delete', {
                    usuario: user
                })
                setLoading(false)
                localStorage.setItem('token', '')
                localStorage.setItem('username', '')
                localStorage.setItem('photo', '')
                localStorage.setItem('photo_id', '')
                localStorage.setItem('email', '')
                localStorage.setItem('admin', '')
                localStorage.setItem('selected', 'perfil')
                history.push('/')
            }
            return
        }) 
    }

    const handlePhoto = (e) => {
        const file = e.target.files[0]
        if(file && file.size/1000000 > 50) {
            Swal.fire({
                icon: 'error',
                title: 'Imagem maior do que 50Mb!',
            })
            return
        }
        if(file) {
            showPhoto(file)
            $('#profile').css('opacity', 1)

            if(file != '') {
                $('#profile').css('opacity', 0)
                $('.profilePicture').css('opacity', 1)
            } else {
                $('#profile').css('opacity', 1)
                $('.profilePicture').css('opacity', 0)
            }
        }
    }

    const showPhoto = async (file) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onloadend = () => {
            setPhoto(reader.result)
        }
        return
    }

    return (
        <div className="perfil-container">
            <ol className="data">
                <div className="photo-container">
                    {photo ? (
                        <div className="profile-photo-controller">
                            <img src={photo} alt='Foto de perfil' className="profile-photo"/>
                        </div>
                    ) : (
                        <AccountSVG id="profile"a
                            style={{
                                width: 165,
                                height: 165,
                                color: 'rgb(48, 44, 71)',
                                cursor: 'pointer'
                            }}
                        />
                    )}
                        <input
                            onChange={handlePhoto}
                            type="file"
                            className="photo-input"
                            accept="image/x-png,image/gif,image/jpeg"
                            onMouseEnter={() => {
                                if(!photo)
                                    $('#profile').css('opacity', 0.6)
                            }}
                            onMouseOut={() => {
                                if(!photo)
                                    $('#profile').css('opacity', 1)
                            }}
                        />
                    <p id="alterar">Alterar foto de perfil</p>
                    <input
                        onChange={handlePhoto}
                        type="file"
                        className="editPhoto"
                        accept="image/x-png,image/gif,image/jpeg"
                        onMouseEnter={() => {
                            $('#alterar').css('color', '#0099ff')
                        }}
                        onMouseOut={() => {
                            $('#alterar').css('color', 'rgb(0, 116, 194)')
                        }}
                    />
                </div>       
            </ol>
            
        </div>
    )
}