import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.css'
})
export class ModalComponent {
  @Input() visible = false;
  titulo: string = '';
  contenido: string = '';

  abrirModalComponent(titulo: string, contenido: string) {
    this.titulo = titulo;
    this.contenido = contenido;
    this.visible = true;
  }

  cerrarModal() {
    this.visible = false;
  }
}

