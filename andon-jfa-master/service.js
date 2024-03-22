import "dotenv/config";
import { Service } from 'node-windows';

const svc = new Service({
  name: 'agent name',
  description: 'Agente que envia dados para a aplicação online',
  script: 'C:\\andon-jfa-project-finish\\andon-jfa-master\\dist\\andon',
  env: [
    {
      name: "DATA_BASE_CLIENT",
      value: process.env.DATA_BASE_CLIENT
    },
    {
      name: "DATA_BASE_HOST",
      value: process.env.DATA_BASE_HOST
    },
    {
      name: "DATA_BASE_NAME",
      value: process.env.DATA_BASE_NAME
    }
  ]
});

svc.on('install', () => {
  svc.start();
});

svc.install();
