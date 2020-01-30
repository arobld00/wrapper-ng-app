import { Component, OnInit } from '@angular/core';
import { Tarea } from '../tareas/modelo/Tarea';
import { ApiService } from '../shared/api.service';

@Component({
  selector: 'app-tareas',
  templateUrl: './tareas.component.html',
  styleUrls: ['./tareas.component.css']
})
export class TareasComponent implements OnInit {

    tareas: Tarea[] = [];

    model: Tarea = {
        numero: '',
        nombre: '',
        descripcion: '',
        fecha: new Date(),
    };

    constructor(private apiService: ApiService) { }

    ngOnInit() {
    }

   public getLengthTasks(): number {
        return this.tareas.length;
    }

    getAllTasks() {
        this.apiService.getAllTasks().subscribe(
            res => {
                this.tareas = res;
            },
            err => {
                alert('Acaba de ocurrir un error!');
            }
        );
    }

    deleteTask(tarea: Tarea) {
        if (confirm('Deseas borrar la tarea?')) {
            this.apiService.deleteTask(tarea.numero).subscribe(
                res => {
                    const indexOfTarea = this.tareas.indexOf(tarea);
                    this.tareas.splice(indexOfTarea, 1);
                },
                err => { alert('No se ha podido borrar la tarea'); }
            );
        }
    }
    sendTarea() {
        this.apiService.postTask(this.model).subscribe(
            res => {
                this.tareas.push(res);
            },
            err => { alert('Ocurrio un error al enviar la tarea!'); }
        );
    }

    sendFile() {
        if (confirm('Deseas crear un fichero?')) {
            this.apiService.sendFile().subscribe(
                res => {},
                err => { alert('Ocurrio un error al crear el fichero!'); }
            );
        }
    }

    sendLogout() {
        this.apiService.sendLogout().subscribe(
            res => {
            },
            err => { alert('Ocurrio un error al cerrar sesion!'); }
        );
    }
}
