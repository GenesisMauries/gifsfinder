import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root' // servicio este definido a nivel global
})
export class GifsService {
  private _apiKey: string = "CnKxqUhyqoujucouCBApeqhMCAmaSv8I";
  private _historial: string[] = [];
  public resultados: any[] = [];

  get historial() {
    return [...this._historial] // rompemos la referencia con el array original
  }

  constructor(private http: HttpClient) { } // inyectamos http para la peticion

  buscarGifs(query: string) {
    query = query.trim().toLocaleLowerCase(); // ahorramos espacios y convertimos minusculas
    if (!this._historial.includes(query)) {
      this._historial.unshift(query)
      this._historial = this._historial.splice(0, 10) // los 10 primeros
    }

    this.http.get(`https://api.giphy.com/v1/gifs/search?api_key=CnKxqUhyqoujucouCBApeqhMCAmaSv8I&q=${query}&limit=10`)
      .subscribe((resp: any) => this.resultados = resp.data)
  }

}
