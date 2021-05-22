import React, { useState, useEffect } from 'react'
import '../styles/perfil.css'
import api from '../service/api'
import $ from 'jquery'
import Swal from 'sweetalert2'
import { AccountSVG } from '../img/icons'

export default function Perfil({ history, setLoading, setFoto }) {
    const [content, setContent] = useState('')
    const handleContent = (e) => {
        const file = e.target.files[0]
        if (file && file.size / 1000000 > 50) {
            Swal.fire({
                icon: 'error',
                title: 'Imagem maior do que 50Mb!',
            })
            return
        }
        if (file) {
            saveContent(file)
        }
    }

    const saveContent = (file) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onloadend = async () => {
            const result = await api.post('/public/store', {
                owner: localStorage.getItem('netflix_token'),
                content: reader.result
            })
            setContent(reader.result)
            Swal.fire({
                icon: 'success',
                title: result,
                timer: 1000,
                showConfirmButton: false
            })
        }
        return
    }

    return (
        <div className='timeline'>
            <input
                onChange={handleContent}
                type="file"
                className="content-input"
                accept="image/x-png,image/gif,image/jpeg"
            />
            <img src={content} alt='post' />
        </div>
    )
}