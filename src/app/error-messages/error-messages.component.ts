import { Component, OnInit } from '@angular/core';
import { ErrorsService } from '../services/errors.service';
import { ErrorInterceptor } from '../helpers/error-interceptor';

@Component({
  selector: 'app-error-messages',
  templateUrl: './error-messages.component.html',
  styleUrls: ['./error-messages.component.css']
})
export class ErrorMessagesComponent {

  constructor( public errorsService:ErrorsService) { }

}
