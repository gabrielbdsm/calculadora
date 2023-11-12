import mongoose from 'mongoose';
import moment from 'moment-timezone';
moment.tz.setDefault('America/Sao_Paulo');

mongoose.set('toObject', { virtuals: true });


const { connection } = mongoose;

const operacaoSchema = new mongoose.Schema({
    equacao: {
      type:  [mongoose.Schema.Types.Mixed], 
      required: true
    },
    resultado: {
      type: Number,
      required: true
    },
    dthora_calculo: {
      type: Date,
      
    }
  });


const modelName = "UserOperacao"
  export default (connection && connection.models[modelName])
  ? connection.models[modelName]
  : mongoose.model(modelName, operacaoSchema);
  