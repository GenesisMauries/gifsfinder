import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchGifsResponse, Gif } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root' // servicio este definido a nivel global
})
export class GifsService {
  private _apiKey: string = "CnKxqUhyqoujucouCBApeqhMCAmaSv8I";
  private _historial: string[] = [];
  public resultados: Gif[] = [];

  get historial() {
    return [...this._historial] // rompemos la referencia con el array original
  }

  constructor(private http: HttpClient) { // inyectamos http para la peticion
    // Traemos del localStorage el historial
    this._historial = JSON.parse(localStorage.getItem("historial")!) || []
    this.resultados = JSON.parse(localStorage.getItem("resultados")!) || []
  }

  buscarGifs(query: string) {
    query = query.trim().toLocaleLowerCase(); // ahorramos espacios y convertimos minusculas
    if (!this._historial.includes(query)) {
      this._historial.unshift(query)
      this._historial = this._historial.splice(0, 10) // los 10 primeros
      localStorage.setItem('historial', JSON.stringify(this._historial))
    }
    // <SearchGifsResponse> indica el tipo de la respuesta
    this.http.get<SearchGifsResponse>(`https://api.giphy.com/v1/gifs/search?api_key=${this._apiKey}&q=${query}&limit=10`)
      .subscribe((resp) => {
        this.resultados = resp.data
        // Guardamos resultados en localStorage
        localStorage.setItem('resultados', JSON.stringify(this.resultados))
      })
  }

}
