import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root' // servicio este definido a nivel global
})
export class GifsService {
  private _apiKey : string = "CnKxqUhyqoujucouCBApeqhMCAmaSv8I";
  private _historial: string[] = [];

  get historial() {

    return [...this._historial] // rompemos la referencia con el array original
  }

  buscarGifs(query: string) {
    query = query.trim().toLocaleLowerCase(); // ahorramos espacios y convertimos minusculas
    if (!this._historial.includes(query)) {
      this._historial.unshift(query)
      this._historial = this._historial.splice(0, 10) // los 10 primeros
    }

    fetch("https://api.giphy.com/v1/gifs/search?api_key=CnKxqUhyqoujucouCBApeqhMCAmaSv8I&q=melendi")
    .then(response => response.json())
    .then(data=>console.log(data))
    .catch((err)=>{console.error(err.message)})
  }

}
