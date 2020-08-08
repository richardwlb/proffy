  
import express from 'express';
import cors from 'cors'; // Permite que endereços diferentes do server acessem ele.
import routes from './routes';

const app = express();
app.use(cors());
app.use(express.json());

app.use(routes);

app.listen(3333), () => {
    console.log('Server runnin in port 3333...');
};