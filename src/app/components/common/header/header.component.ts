import * as $ from 'jquery';
import { Component, OnInit } from '@angular/core';
import { AppComponent } from '../../../app.component';
import { Constants } from '../../../app.constants';
import { debounceTime } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  menuActive = false;
  srcMenu: String = '/static/public/header/images/Boton-Menu-Responsive-OFF.png';
  srcLogin: String = '/static/public/header/images/Boton-Acceso-Usuarios-OFF.png';
  private resultsLimit: number;
  // Dynamic URL build parameters
  routerLinkLogin: string;
  routerLinkPageNotFound: string;
  routerLinkDataCatalog: string;
  routerLinkDataCatalogDataset: string;
  routerLinkDataTopics: string;
  routerLinkDataOrganizations: string;
  routerLinkServicesAragopedia: string;
  routerLinkServicesPresupuestos: string;
  routerLinkServicesCras: string;
  routerLinkServicesSocialData: string;
  routerLinkServicesAnalytics: string;
  routerLinkInfoOpenData: string;
  routerLinkInfoApplications: string;
  routerLinkInfoEventos: string;
  routerLinkInfoCollaboration: string;
  routerLinkToolsCampus: string;
  routerLinkToolsDevelopers: string;
  routerLinkToolsApis: string;
  routerLinkToolsSparql: string;
  routerLinkToolsGithub: string;
  aodBaseUrl: string;
  presupuestosBaseUrl: string;
  transparenciaWebUrl: string;
  aragonParticipaWebUrl: string;

  constructor(
    private locale: AppComponent,
    private constants: Constants,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.aodBaseUrl = Constants.AOD_BASE_URL;
    this.presupuestosBaseUrl = Constants.PRESUPUESTOS_BASE_URL;
    this.transparenciaWebUrl = Constants.TRANSPARENCIA_WEB_URL;
    this.aragonParticipaWebUrl = Constants.ARAGON_PARTICIPA_WEB_URL;
    this.resultsLimit = Constants.DATASET_AUTOCOMPLETE_HEADER_LIMIT_RESULTS;
    this.routerLinkLogin = Constants.ROUTER_LINK_LOGIN;
    this.routerLinkDataCatalog = Constants.ROUTER_LINK_DATA_CATALOG;
    this.routerLinkDataCatalogDataset =
      Constants.ROUTER_LINK_DATA_CATALOG_DATASET;
    this.routerLinkDataTopics = Constants.ROUTER_LINK_DATA_TOPICS;
    this.routerLinkDataOrganizations = Constants.ROUTER_LINK_DATA_ORGANIZATIONS;
    this.routerLinkServicesAragopedia =
      Constants.ROUTER_LINK_SERVICES_ARAGOPEDIA;
    this.routerLinkServicesCras = Constants.ROUTER_LINK_SERVICES_CRAS;
    this.routerLinkServicesSocialData =
      Constants.ROUTER_LINK_SERVICES_SOCIAL_DATA;
    this.routerLinkServicesAnalytics = Constants.ROUTER_LINK_SERVICES_ANALYTICS;
    this.routerLinkInfoOpenData = Constants.ROUTER_LINK_INFORMATION_OPEN_DATA;
    this.routerLinkInfoApplications = Constants.ROUTER_LINK_INFORMATION_APPS;
    this.routerLinkInfoEventos = Constants.ROUTER_LINK_INFORMATION_EVENTS;
    this.routerLinkInfoCollaboration =
      Constants.ROUTER_LINK_INFORMATION_COLLABORATION;
    this.routerLinkToolsCampus = Constants.ROUTER_LINK_TOOLS_CAMPUS;
    this.routerLinkToolsDevelopers = Constants.ROUTER_LINK_TOOLS_DEVELOPERS;
    this.routerLinkToolsApis = Constants.ROUTER_LINK_TOOLS_APIS;
    this.routerLinkToolsSparql = Constants.ROUTER_LINK_TOOLS_SPARQL;
    this.routerLinkToolsGithub = Constants.AOD_GITHUB_URL;
  }

  openNav() {
    if (!this.menuActive) {
      $('.overlay').css('top', $('#header').height());
      $('#myNav').height($(window).height() - $('#header').height());
      $('#logo').attr(
        'src',
        '/static/public/header/images/AOD-Logo-Responsive.png'
      );
      this.menuActive = !this.menuActive;
      $('#nav').attr('class', 'navbar navbar-toggleable-md bg-inverse');
      $('#nav').css('background-color', 'rgba(0,0,0, 0.82)');
      this.srcLogin =
        '/static/public/header/images/Boton-Acceso-Usuarios-gris.png';
      this.srcMenu =
        '/static/public/header/images/Boton-Salir-Menu-Responsive-OFF.png';
    } else {
      $('body,html').css('overflow-y', 'auto');
      $('#myNav').height('0%');
      $('#nav').attr('class', 'navbar navbar-toggleable-md bg-light');
      $('#logo').attr('src', '/static/public/header/images/AOD-Logo.png');
      $('#searchBox').val('');
      this.menuActive = !this.menuActive;
      this.srcLogin =
        '/static/public/header/images/Boton-Acceso-Usuarios-OFF.png';
      this.srcMenu =
        '/static/public/header/images/Boton-Menu-Responsive-OFF.png';
    }
  }

  hover(id) {
    if (this.menuActive) {
      if (id === '#login') {
        this.srcLogin =
          '/static/public/header/images/Boton-Acceso-Usuarios-blanco.png';
      } else if (id === '#menu') {
        this.srcMenu =
          '/static/public/header/images/Boton-Salir-Menu-Responsive-ON.png';
      }
    } else {
      if (id === '#login') {
        this.srcLogin =
          '/static/public/header/images/Boton-Acceso-Usuarios-ON.png';
      } else if (id === '#menu') {
        this.srcMenu =
          '/static/public/header/images/Boton-Menu-Responsive-ON.jpg';
      }
    }
  }

  unhover(id) {
    if (this.menuActive) {
      if (id === '#login') {
        this.srcLogin =
          '/static/public/header/images/Boton-Acceso-Usuarios-gris.png';
      } else if (id === '#menu') {
        this.srcMenu =
          '/static/public/header/images/Boton-Salir-Menu-Responsive-OFF.png';
      }
    } else {
      if (id === '#login') {
        this.srcLogin =
          '/static/public/header/images/Boton-Acceso-Usuarios-OFF.png';
      } else if (id === '#menu') {
        this.srcMenu =
          '/static/public/header/images/Boton-Menu-Responsive-OFF.png';
      }
    }
  }

  search(title: string): void {
    // Lectura cuando hay al menos 3 caracteres, (3 espacios produce error).
    if (title.length >= Constants.DATASET_AUTOCOMPLETE_MIN_CHARS) {
    } else {
    }
  }

  getAutocomplete(): void {
    // Funciona la busqueda, falla al poner un caracter especial
  }

  focusUserName() {
    document.getElementById('loginLink').blur();
  }

  searchDatasetsByText(text: string) {
    this.router.navigate(['/' + this.routerLinkDataCatalog], {
      queryParams: { texto: text }
    });
  }

  onResize(event) {
    $('.overlay').css('top', $('#header').height());
    if (this.menuActive === true) {
      $('#myNav').height($(window).height() - $('#header').height());
    }
  }

  navigate(name: string) {
  }

  ngOnInit() {
    this.getAutocomplete();
  }
}
