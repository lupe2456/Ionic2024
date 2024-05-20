export interface Tasks{
    id: string,
    title: string,
    description: string,
    all_day: string,
    start_date: string,
    start_time: string,
    end_date: string,
    end_time: string,
    color: string,
    url: string,
    notes: string
}

// Define la interfaz para las fechas destacadas
export interface HighlightedDate {
    date: string;
    textColor: string;
    backgroundColor: string;
    isFirebase: boolean; // Nueva propiedad para marcar las fechas de Firebase
}

// Definición del objeto de mapeo de colores a mensajes
export const colorMessages: { [key: string]: string } = {
    '#2ecc71': 'Reunión',
    '#ff9f43': 'Exámenes',
    '#9b59b6': 'Entregas finales',
    '#f1c40f': 'Suspensión',
    '#ff6b81': 'Visitas industriales',
    '#00b894': 'Eventos deportivos',
    '#3BF62C': 'Reinscripciones',
    '#14830B': 'Inicio de clases',
    '#EF1919': 'Reinscripciones tardías',
    '#780C0C': 'Bajas de materias',
    '#8B8585': 'Suspensión, día inhábil',
    '#0D0C0C': 'Vacaciones',
    '#FFC300': 'Ceremonia de Egresados',
    '#900C3F': 'Fin de clases',
    '#EE5916': 'Cursos de verano'
};

export interface Notes{
    id: string,
    content: string
}