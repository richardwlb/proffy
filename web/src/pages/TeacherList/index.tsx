import React, { FormEvent, useState } from 'react';

import PageHeader from '../../components/PageHeader';
import TeacherItem, { Teacher } from '../../components/TeacherItem';
import Input from '../../components/Input';
import Select from '../../components/Select';

import api from '../../services/api';

import './style.css'

function TeacherList(){

    const [teachers, setTeachers] = useState([]);

    const [subject, setSubject] = useState('Matemática');
    const [week_day, setWeek_day] = useState('0');
    const [time, setTime] = useState('');

    const handleSearchTeachers = async (e: FormEvent) => {
        e.preventDefault();

        const response = await api.get('classes', {
            params: { 
                subject,
                week_day,
                time,
            }
        });

        setTeachers(response.data);

    }

    return (
        <div id="page-teacher-list" className="container">
            <PageHeader title="Estes são os proffys disponíveis.">
                <form id="search-teachers" onSubmit={handleSearchTeachers}>
                    <Select 
                        name="subject" 
                        label="Matéria"
                        onChange={ e => setSubject(e.target.value)}
                        options={[
                            { value: 'Matemática', label: 'Matemática'},
                            { value: 'Geografia', label: 'Geografia'},
                            { value: 'Português', label: 'Português'},
                            { value: 'Física', label: 'Física'},
                            { value: 'Informática', label: 'Informática'},
                            { value: 'Artes', label: 'Artes'},
                        ]}
                    />
                    <Select 
                        name="week_day" 
                        label="Dia da semana"
                        onChange={ e => setWeek_day(e.target.value)}
                        options={[
                            { value: '0', label: 'Domingo'},
                            { value: '1', label: 'Segunda-feira'},
                            { value: '2', label: 'Terça-feira'},
                            { value: '3', label: 'Quarta-feira'},
                            { value: '4', label: 'Quinta-feira'},
                            { value: '5', label: 'Sexta-feira'},
                            { value: '6', label: 'Sábado'},
                        ]}
                    />
                    <Input type="time" name="time" label="Hora" onChange={ e => setTime(e.target.value)}/>
                    <button type="submit">Procurar</button>
                </form>
            </PageHeader>
            <main>
                {teachers.map((teacher: Teacher) => {
                    return <TeacherItem key={teacher.id} teacher={teacher} />;
                })}
            </main>
        </div>
    )
}

export default TeacherList;