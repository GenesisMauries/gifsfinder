import { Component} from '@angular/core';
import { GifsService } from 'src/app/gifs/services/gifs.service';

@Component({
  selector: 'app-sidebard',
  templateUrl: './sidebard.component.html',
  styleUrls: ['./sidebard.component.css']
})
export class SidebardComponent{

  constructor(private gifsService: GifsService) { } //Inyecta el servicio
  
  // Traemos el arreglo con los items de busqueda
  get historial() {
  console.log(this.gifsService.historial)
    return this.gifsService.historial
  }
  
}
