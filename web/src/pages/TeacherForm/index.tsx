import React, { useState, FormEvent } from 'react';
import { useHistory } from 'react-router-dom';

import PageHeader from '../../components/PageHeader';
import Input from '../../components/Input';
import TextArea from '../../components/TextArea';
import Select from '../../components/Select';

import api from '../../services/api';

import warningIcon from '../../assets/images/icons/warning.svg';

import './style.css';



const TeacherForm = () => {
    const history = useHistory();

    const [name, setName] = useState('');
    const [avatar, setAvatar] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [bio, setBio] = useState('');

    const [subject, setSubject] = useState('Matemática');
    const [cost, setCost] = useState('');

    const [scheduleItems, setScheduleItems] = useState([
        { week_day: 0, from: '', to: '' }
    ]);

    function addScheduleItem(){
        setScheduleItems([
            ...scheduleItems, 
            { week_day: 0, from: '', to: '' }
        ]);
    }

    function handleCreateClass(e: FormEvent) {
        e.preventDefault();

        api.post('classes', {
            name,
            avatar,
            whatsapp,
            bio,
            subject,
            cost: Number(cost),
            schedule: scheduleItems
        }).then(() => {
            alert('Cadastro efetuado com sucesso!');
            history.push('/');
        }).catch((err) =>{
            alert(`Não foi possível efetuar o cadastro ${err}`);
        })
    }

    function setScheduleItemValue(position: number, fieldName: string, value:string){
        const newScheduleItems = scheduleItems.map( (scheduleItem, index) => {
            // Se o index for igual altera o valor, senão apenas continua retornando vazio.
            if( position === index){
                return { ...scheduleItem, [fieldName]: value} 
                //Aqui esta sendo usado o colchetes para que o fieldname 
                // seja uma variavale, senao seria um valor fieldname
            }

            return scheduleItem;

        });

        setScheduleItems(newScheduleItems);

    }
 

    return(
        
        <div id="page-teacher-form" className="container">
            <PageHeader 
                title="Que incrível que você quer dar aulas." 
                description="O primeiro passo é preencher esse formulário de inscrição"
        />

            <main>
                <form onSubmit={handleCreateClass}>
                    <fieldset>
                        <legend>Seus dados</legend>
                            <Input name="name"  label="Nome completo"  value={name} onChange={ (e) => {  setName(e.target.value) }} />
                            <Input name="avatar" label="Avatar" value={avatar} onChange={ (e) => {  setAvatar(e.target.value) }}/>
                            <Input name="whatsapp" label="Whatsapp" value={whatsapp} onChange={ (e) => {  setWhatsapp(e.target.value) }}/>
                            <TextArea name="bio" label="Biografia" value={bio} onChange={ (e) => {  setBio(e.target.value) }}/>
                    </fieldset>


                    <fieldset>
                        <legend>Sobre a aula</legend>
                            <Select 
                                name="subject" 
                                label="Matéria"
                                value={subject}
                                onChange={(e) => {
                                    setSubject(e.target.value)
                                }}
                                options={[
                                    { value: 'Matemática', label: 'Matemática'},
                                    { value: 'Geografia', label: 'Geografia'},
                                    { value: 'Português', label: 'Português'},
                                    { value: 'Física', label: 'Física'},
                                    { value: 'Informática', label: 'Informática'},
                                    { value: 'Artes', label: 'Artes'},
                                ]}
                            />
                            <Input name="cost" label="Custo da sua hora por aula" value={cost} onChange={(e) => { setCost(e.target.value)}} /> 
                    </fieldset>

                    <fieldset>
                        <legend>
                            Horários disponíveis
                            <button type="button" onClick={addScheduleItem} >
                                + Novo horário
                            </button>
                        </legend>

                            {scheduleItems.map( (scheduleItem, index) => {
                                return(
                                    <div key={scheduleItem.week_day} className="schedule-item">
                                        <Select 
                                            name="week-day" 
                                            label="Dia da semana"
                                            value={scheduleItem.week_day}
                                            onChange={ e => setScheduleItemValue(index, 'week_day', e.target.value) }
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
                                        <Input 
                                            type="time" 
                                            name="from" 
                                            label="Das"  
                                            value={scheduleItem.from}
                                            onChange={ e => setScheduleItemValue(index, 'from', e.target.value) }
                                        />
                                        <Input 
                                            type="time" 
                                            name="to" 
                                            label="Até" 
                                            value={scheduleItem.to}
                                            onChange={ e => setScheduleItemValue(index, 'to', e.target.value) }
                                        />
                                    </div>
                                );
                            })}
                            
                    </fieldset>

                    <footer>
                        <p>
                            <img src={warningIcon} alt="Aviso importante"/>
                            Importante!<br />
                            Preencha todos os dados
                        </p>
                        <button type="submit" >
                            Salvar cadastro
                        </button>
                    </footer>
                </form>
            </main>
        </div>
    );
};

export default TeacherForm;