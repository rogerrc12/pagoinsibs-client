import React from 'react';
import ChatBot from 'react-simple-chatbot';
import { ThemeProvider } from 'styled-components';
import { Link } from 'react-router-dom';

const config = { width: '300px', height: '400px', floating: true };
const steps = [
  {
    id: 'Greet',
    message: 'Hola! ¿cual es tu nombre?',
    trigger: 'User Name',
  },
  {
    id: 'User Name',
    user: true,
    trigger: 'ayuda',
  },
  {
    id: 'ayuda',
    message: '{previousValue}, ¿en que podemos ayudarte?',
    trigger: 'Support',
  },
  {
    id: 'Support',
    options: [
      { value: 'preguntas', label: 'Preguntas frecuentes', trigger: 'done-message-1' },
      { value: 'llamar', label: 'Hablar con un asesor', trigger: 'done-message-2' },
    ],
  },
  {
    id: 'done-message-1',
    component: (<span>
      Visita nuestras
      <Link to="/ayuda">preguntas frecuentes</Link>
                </span>),
    end: true,
  },
  {
    id: 'done-message-2',
    message: 'Habla con un asesor llamando al 0500 467 4270. Nuestro horario de atención es de L a V de 8 am a 5 pm.',
    end: true,
  },
];
const theme = {
  background: '#f5f8fb',
  fontFamily: 'Nunito, sans-serif',
  headerBgColor: '#259659',
  headerFontColor: '#fff',
  headerFontSize: '15px',
  botBubbleColor: '#259659',
  botFontColor: '#fff',
  userBubbleColor: '#F4F4F4',
  userFontColor: '#444',
};

const Chat = () => (
  <ThemeProvider theme={theme}>
    <ChatBot steps={steps} {...config} />
  </ThemeProvider>
);

export default Chat;
