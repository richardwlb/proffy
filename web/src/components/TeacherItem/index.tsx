import React from 'react';

import whatsappIcon from '../../assets/images/icons/whatsapp.svg';

import './style.css'
import api from '../../services/api';

export interface Teacher {
    id: number
    avatar: string;
    name: string;
    subject: string;
    whatsapp: number;
    bio: string;
    cost: number;
}

interface TeacherItemProps {
    teacher: Teacher;
}

const TeacherItem: React.FC<TeacherItemProps> = ({ teacher }) => {
    async function createNewConnection(){
        await api.post('connections', {
            user_id: teacher.id
        });
    }

    return (
        <article className="teacher-item">
            <header>
                <img src={teacher.avatar} alt={teacher.name}/>
                <div>
                    <strong>{teacher.name}</strong>
                    <span>{teacher.subject}</span>
                </div>
            </header>
            <p>
                {teacher.bio}
            </p>
            <footer>
                <p>
                    Preço/hora
                <strong>R$ {teacher.cost}</strong>
                </p>
                <a target="_blank" 
                    href={`https://wa.me/${teacher.whatsapp}`} 
                    onClick={createNewConnection} >
                    <img src={whatsappIcon} alt="Whatsapp"/>
                    Entrar em contato
                </a>
            </footer>
        </article>
    )
}

export default TeacherItem;