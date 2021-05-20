import React from 'react'
import './result.css'

export default ({ data }) => {
    return (
        <>
            {data && (
                <div className="result">
                    <h4>Nome: {data.name}</h4>
                    <span>Altura: {data.height} cm</span>
                    <span>Peso: {data.mass} kg</span>
                    <span>Cor de cabelo: {data.hair_color}</span>
                    <span>Cor de pele: {data.skin_color}</span>
                    <span>Cor dos olhos: {data.eye_color}</span>
                    <span>Ano de nascimento: {data.birth_year}</span>
                    <span>Genero: {data.gender}</span>
                </div>
            )}
        </>
    );
}