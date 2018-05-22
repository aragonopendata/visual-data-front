export class Constants {
  // public static VISUAL_BACK_SERVER_URL = 'http://miv-aodfront-01.aragon.local:8090';
  public static VISUAL_BACK_SERVER_URL = 'http://localhost:8080';
  public static LIST_ALL_CHARTS_PATH = '/services/charts';
  public static SAVE_CHART_PATH = Constants.LIST_ALL_CHARTS_PATH + '/save_chart';
  public static SAVE_PROCESS_PATH = Constants.LIST_ALL_CHARTS_PATH + '/save_process';
  public static DOWNLOAD_PROCESS_PATH = Constants.LIST_ALL_CHARTS_PATH + '/download_process/';
  public static GET_CHART_PATH = Constants.LIST_ALL_CHARTS_PATH + '/';
  public static PATH_MODIFIER = '';
  // URLS
  public static AOD_BASE_URL = 'http://miv-aodfront-01.aragon.local:7030';
  public static PRESUPUESTOS_BASE_URL = 'http://miv-aodfront-01.aragon.local:7031';
  public static AOD_API_WEB_BASE_URL = 'http://miv-aodfront-01.aragon.local:4200/aod/services/web';

  public static AOD_GITHUB_URL = 'http://github.com/aragonopendata';
  public static CKAN_URL = 'http://ckan.org/';
  public static MEDIA_WIKI_URL = 'http://mediawiki.org/';
  public static VIRTUOSO_URL = 'http://virtuoso.openlinksw.com/';
  public static ELDA_URL = 'http://epimorphics.github.io/elda/';
  public static SWAGGER_URL = 'http://swagger.io/';
  public static NODE_JS_URL = 'https://nodejs.org/';
  public static ANGULAR_URL = 'https://angular.io/';
  public static KIBANAFOOTER_URL = 'https://www.elastic.co/products/kibana/';
  public static OASI_FACEBOOK_URL = 'https://www.facebook.com/observatorio.aragones';
  public static OASI_TWITTER_URL = 'https://www.twitter.com/oasi';
  public static OASI_YOUTUBE_URL = 'https://www.youtube.com/watch?v=8d409yteTJM&amp;list=PLQ3k0vA0UZvhBVOz_mCq-9Wyn3VCB6QCe';
  public static AOD_MAIL = 'opendata@aragon.es';
  public static ARAGON_PARTICIPA_WEB_URL = 'http://aragonparticipa.aragon.es';
  public static TRANSPARENCIA_WEB_URL = 'http://transparencia.aragon.es/';

  public static DATASET_AUTOCOMPLETE_MIN_CHARS = 3;
  public static DATASET_AUTOCOMPLETE_HEADER_LIMIT_RESULTS = 4;

  // ROUTING
  public static ROUTER_LINK_DATA_CATALOG = 'datos/catalogo';
  public static ROUTER_LINK_DATA_CATALOG_DATASET = 'datos/catalogo/dataset';
  public static ROUTER_LINK_DATA_TOPICS = 'datos/temas';
  public static ROUTER_LINK_DATA_ORGANIZATIONS = 'datos/publicadores';
  public static ROUTER_LINK_INFORMATION = 'informacion';
  public static ROUTER_LINK_INFORMATION_OPEN_DATA = 'informacion/open-data';
  public static ROUTER_LINK_INFORMATION_TERMS = 'terminos';
  public static ROUTER_LINK_INFORMATION_APPS = 'informacion/aplicaciones';
  public static ROUTER_LINK_INFORMATION_EVENTS = 'informacion/eventos';
  public static ROUTER_LINK_INFORMATION_COLLABORATION = 'informacion/colabora';
  public static ROUTER_LINK_TOOLS_DEVELOPERS = 'herramientas/desarrolladores';
  public static ROUTER_LINK_TOOLS_CAMPUS = 'herramientas/campus';
  public static ROUTER_LINK_TOOLS_CAMPUS_CONTENT = 'herramientas/campus/content';
  public static ROUTER_LINK_TOOLS_APIS = 'herramientas/apis';
  public static ROUTER_LINK_TOOLS_SPARQL = 'herramientas/sparql';
  public static ROUTER_LINK_LOGIN = 'login';
  public static ROUTER_LINK_SERVICES_ARAGOPEDIA = 'servicios/aragopedia';
  public static ROUTER_LINK_SERVICES_CRAS = 'servicios/cras';
  public static ROUTER_LINK_SERVICES_SOCIAL_DATA = 'servicios/open-social-data';
  public static ROUTER_LINK_SERVICES_ANALYTICS = 'servicios/analytics';

  // SERVER API URLS
  public static SERVER_API_LINK_DATASETS = '/datasets';
  public static SERVER_API_LINK_DATASETS_TOPIC = '/datasets/topic';
  public static SERVER_API_LINK_DATASETS_ORGANIZATION = '/datasets/organization';
  public static SERVER_API_LINK_DATASETS_AUTOCOMPLETE = '/datasets/autocomplete';
  public static SERVER_API_LINK_DATASETS_TAGS = '/datasets/tags';
  public static SERVER_API_LINK_DATASETS_NEWEST = '/datasets/newest';
  public static SERVER_API_LINK_DATASETS_DOWNLOADED = '/datasets/downloaded';
  public static SERVER_API_LINK_DATASETS_COUNT = '/datasets/countDatasets';
  public static SERVER_API_LINK_RESOURCES_COUNT = '/datasets/countResources';
  public static SERVER_API_LINK_DATASETS_RDF = '/datasets/rdf';
  public static SERVER_API_LINK_DATASETS_STATS_SEARCH = '/datasets/stats';
  public static SERVER_API_URL_DATASETS_RESOURCE_VIEW = '/resourceView';
  public static SERVER_API_LINK_DATASETS_HOMER = '/homer';
  public static SERVER_API_LINK_TAGS = '/tags';

  public static SERVER_API_LINK_PARAM_SORT = 'sort';
  public static SERVER_API_LINK_PARAM_PAGE = 'page';
  public static SERVER_API_LINK_PARAM_ROWS = 'rows';
  public static SERVER_API_LINK_PARAM_TYPE = 'type';
  public static SERVER_API_LINK_PARAM_TAGS = 'tags';
  public static SERVER_API_LINK_PARAM_TEXT = 'text';
  public static SERVER_API_LINK_PARAM_LANG = 'lang';
  public static SERVER_API_LINK_PARAM_LIMIT = 'limit';
  public static SERVER_API_LINK_PARAM_RESOURCE_ID = 'resId';
}
