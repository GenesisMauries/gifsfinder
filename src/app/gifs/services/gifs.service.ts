import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchGifsInterface, Gif } from '../interface/gifs.interface';

// Vuelve GLOBAL nuestro servicio
@Injectable({
  providedIn: 'root',
})
export class GifsService {
  private api_key: string = 'CnKxqUhyqoujucouCBApeqhMCAmaSv8I';
  private serviceURL: string = 'https://api.giphy.com/v1/gifs';
  private _record: string[] = [];
  public results: Gif[] = [];

  get record() {
    return [...this._record]; // Rompemos la referencia para no modificar el array original
  }
  // El constructor solo se ejecuta la primera y unica vez que el servicio es llamado
  constructor(private http: HttpClient) {
    this._record = JSON.parse(localStorage.getItem('record')!) || [];
    this.results = JSON.parse(localStorage.getItem('results')!) || [];
  }

  searchGifs(query: string) {
    query = query.trim().toLocaleLowerCase();
    if (!this._record.includes(query)) {
      this._record.unshift(query);
      // Grabamos en localStorage las ultimas busquedad
      localStorage.setItem('record', JSON.stringify(this._record));

      this._record = this._record.splice(0, 9);
    }
    // Permite la construccion de parametros para la URL
    const params = new HttpParams()
      .set('api_key', this.api_key)
      .set('limit', '10')
      .set('q', query);
    //console.log(params.toString()); QUERY PARAMS
    // Observable es mas poderoso que las promesas
    // Las perticiones retornan obsevables
    this.http
      .get<SearchGifsInterface>(`${this.serviceURL}/search`, { params })
      .subscribe((response) => {
        this.results = response.data;
        localStorage.setItem('results', JSON.stringify(this.results));
      });
  }
}
