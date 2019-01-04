import { Component, OnInit } from '@angular/core';
import { Constants } from '../../../app.constants';
import { UtilsService } from '../../exportedFunctions/utils.service';

@Component({
	selector: 'app-footer',
	templateUrl: './footer.component.html',
	styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

	openedMenu: boolean;

	aodBaseUrl: String
	//Dynamic URL build parameters
	routerLinkInfoOpenData: string;
	routerLinkInfoTerms: string;
	routerLinkDataCatalog: string;
	routerLinkDatosEnlazados: string;
	routerLinkServicesAragopedia: string;
	routerLinkServicesSocialData: string;
	routerLinkInfoCollaboration: string;
	routerLinkInfoApplications: string;
	routerLinkInfoConocimiento: string;
	
	ckanUrl: string;
	mediaWikiUrl: string;
	virtuosoUrl: string;
	eldaUrl: string;
	swaggerUrl: string;
	nodeJsUrl: string;
	angularUrl: string;
	kibanaUrl: string;
	oasiFacebookUrl: string;
	oasiTwitterUrl: string;
	oasiYoutubeUrl: string;
	aodMail: string;

	constructor(private constants: Constants, private utilsService: UtilsService) { 
		this.aodBaseUrl = Constants.AOD_BASE_URL;
		this.routerLinkInfoOpenData = Constants.ROUTER_LINK_INFORMATION_OPEN_DATA;
		this.routerLinkDataCatalog = Constants.ROUTER_LINK_DATA_CATALOG;
		this.routerLinkDatosEnlazados = Constants.ROUTER_LINK_DATOS_ENLAZADOS;
		this.routerLinkServicesAragopedia = Constants.ROUTER_LINK_SERVICES_ARAGOPEDIA;
		this.routerLinkServicesSocialData = Constants.ROUTER_LINK_SERVICES_SOCIAL_DATA;
		this.routerLinkInfoCollaboration = Constants.ROUTER_LINK_INFORMATION_COLLABORATION;
		this.routerLinkInfoApplications = Constants.ROUTER_LINK_INFORMATION_APPS;
		this.routerLinkInfoTerms = Constants.ROUTER_LINK_INFORMATION_TERMS;
		this.routerLinkInfoConocimiento = Constants.ROUTER_LINK_INFORMATION_CONOCIMIENTO;
		this.ckanUrl = Constants.CKAN_URL;
		this.mediaWikiUrl = Constants.MEDIA_WIKI_URL;
		this.virtuosoUrl = Constants.VIRTUOSO_URL;
		this.eldaUrl = Constants.ELDA_URL;
		this.swaggerUrl = Constants.SWAGGER_URL;
		this.nodeJsUrl = Constants.NODE_JS_URL;
		this.angularUrl = Constants.ANGULAR_URL;
		this.kibanaUrl = Constants.KIBANAFOOTER_URL;
		this.oasiFacebookUrl = Constants.OASI_FACEBOOK_URL;
		this.oasiTwitterUrl = Constants.OASI_TWITTER_URL;
		this.oasiYoutubeUrl = Constants.OASI_YOUTUBE_URL;
		this.aodMail = Constants.AOD_MAIL;

		this.getOpenedMenu();
	}

	ngOnInit() {
	}

    getOpenedMenu(){
        this.utilsService.openedMenuChange.subscribe(value => {
			this.openedMenu = value;
		});
    }

}
