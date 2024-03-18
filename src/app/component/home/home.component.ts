import { Component, OnInit } from '@angular/core';
import {KeycloakService} from 'keycloak-angular';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  token = '';
  constructor(private keycloakService: KeycloakService) { }

  ngOnInit(): void {
    this.keycloakService.getToken().then((res) => {
      this.token = res;
    });
  }

  public username(): string{
    return this.keycloakService.getUsername();
  }
  public logout() {
    this.keycloakService.logout();
  }
}
