import {Component, OnInit} from '@angular/core';
import Swal from 'sweetalert2';
import {FormBuilder, FormGroup} from '@angular/forms';
import {RazaService} from '../../services/raza.service';

@Component({
  selector: 'app-animal',
  templateUrl: './animal.component.html',
  styleUrls: ['./animal.component.css']
})
export class AnimalComponent implements OnInit {


  constructor(){
  }

  ngOnInit(): void {

  }

}
