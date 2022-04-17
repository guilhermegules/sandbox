import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  public usefulLinks = [
    {
      name: 'Testing Angular - A guide to Robust Angular Applications',
      link: 'https://testing-angular.com/',
    },
    {
      name: 'Mocking HTTP Calls in Cypress End-to-End Tests',
      link: 'https://blog.bitsrc.io/mocking-http-calls-in-cypress-end-to-end-tests-fa2e6b7caaf7',
    },
  ];
}
