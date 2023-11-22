import { Exame } from "./exame";
import { Medicamento } from "./medicamento";
import { Medico } from "./medico";
import { Paciente } from "./paciente";

export interface Atendimento {
    id?: any;
    medico: Medico;
    paciente: Paciente;
    receituario: string;
    exames: Exame[];
    medicamentos: Medicamento[];
    dataAtendimento: string;
}