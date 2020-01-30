import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tarea } from '../tareas/modelo/Tarea';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

    private BASE_URL = 'http://localhost:8080/api';

    public ALL_TASKS_URL = `${this.BASE_URL}/tareas/all`;

    private DELETE_TASK_URL = `${this.BASE_URL}/tareas/`;

    private TASKS_BY__URL = `${this.BASE_URL}/tareas/byDate/`;

    private SEND_TASK_URL = `${this.BASE_URL}/tareas`;

    private LOGIN_URL = `${this.BASE_URL}/login`;

    private LOGOUT_URL = `${this.BASE_URL}/logout`;

    private SEND_FILE_URL = `${this.BASE_URL}/tareas/archivo`;

    constructor(private http: HttpClient) { }

    sendFile(): Observable<any> {
        return this.http.post(this.SEND_FILE_URL, null);
    }

    sendLogout(): Observable<any> {
        return this.http.post(this.LOGOUT_URL, null);
    }

    isLogged(): Observable<boolean> {
        return this.http.get<boolean>(this.BASE_URL);
    }

    sendLoginWrapper<T>(data: any): Observable<T> {
        const options = {headers: {'Content-Type': 'application/json'}};
        return this.http.post<T>(this.LOGIN_URL,  JSON.stringify(data), options);
    }
    getAllTasks(): Observable<Tarea[]> {
        return this.http.get<Tarea[]>(this.ALL_TASKS_URL);
    }

    deleteTask(numero: string): Observable<any> {
        return this.http.delete(this.DELETE_TASK_URL + numero);
    }

    getTasksBy(taskDate: Date): Observable<Tarea[]> {
        return this.http.get<Tarea[]>(this.TASKS_BY__URL + taskDate);
    }

    postTask(tarea: Tarea): Observable<Tarea> {
        return this.http.post<Tarea>(this.SEND_TASK_URL, tarea);
    }

}
