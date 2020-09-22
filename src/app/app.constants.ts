import { Aligns, AlignsType } from "./models/Aligns";
import { ContentsType, Contents } from "./models/Contents";

export class Constants {
  public static SERVER_URL = 'https://opendata.aragon.es';
  public static VISUAL_BACK_SERVER_URL =
    Constants.SERVER_URL + '/apivisualdata';
  public static LIST_ALL_HISTORIES_PATH = '/services/histories';
  public static SEND_MAIL_SAVE_ADMIN_HISTORY_PATH =
    Constants.LIST_ALL_HISTORIES_PATH + '/send_save_admin_mail';
  public static SEND_MAIL_SAVE_USER_HISTORY_PATH =
    Constants.LIST_ALL_HISTORIES_PATH + '/send_save_user_mail';
  public static SEND_MAIL_PUBLIC_USER_HISTORY_PATH =
    Constants.LIST_ALL_HISTORIES_PATH + '/send_public_user_mail';

  public static LIST_ALL_CHARTS_PATH = '/services/charts';
  public static LIST_TYPE_CHARTS_PATH =
  Constants.LIST_ALL_CHARTS_PATH + '/type_chart';
  public static SAVE_CHART_PATH =
    Constants.LIST_ALL_CHARTS_PATH + '/save_chart';
  public static SAVE_PROCESS_PATH =
    Constants.LIST_ALL_CHARTS_PATH + '/save_process';
  public static DOWNLOAD_PROCESS_PATH =
    Constants.LIST_ALL_CHARTS_PATH + '/download_process/';
  public static REMOVE_GRAPH_PATH =
    Constants.LIST_ALL_CHARTS_PATH + '/remove_graph/';
  public static SAVE_GRAPH_TITLE_PATH =
    Constants.LIST_ALL_CHARTS_PATH + '/saveTitle/';
  public static DOWNLOAD_PROCESS_ALL_PATH =
    Constants.LIST_ALL_CHARTS_PATH + '/download_all_process/';
  public static GET_CHART_PATH = Constants.LIST_ALL_CHARTS_PATH + '/';
  public static PATH_MODIFIER = '';

  // URLS FOCUS
  public static FOCUS_URL = 'https://opendata.aragon.es/servicios/focus';

  // URLS GLOBAL
  public static AOD_BASE_URL = 'https://opendata.aragon.es';
  public static PRESUPUESTOS_BASE_URL = 'http://presupuesto.aragon.es';
  public static AOD_ASSETS_BASE_URL = 'https://opendata.aragon.es/static';
  public static AOD_API_WEB_BASE_URL =
    'https://opendata.aragon.es/aod/services/web';
  public static AOD_API_ADMIN_BASE_URL =
    'https://opendata.aragon.es/aod/services/admin';
  public static AOD_API_SECURITY_BASE_URL =
    'https://opendata.aragon.es/aod/services/security';
  public static AOD_API_CKAN_BASE_URL =
    'http://mov-aodfront-01.aragon.local:5000';
  public static AOD_COLLABORATION_URL =
    'https://aragon.uservoice.com/forums/192552-datos-que-me-gustar%C3%ADa-reutilizar'; 
  public static AOD_GITHUB_URL = 'http://github.com/aragonopendata';
  public static USE_CONDITIONS_URL = 'https://opendata.aragon.es/informacion/open-data#terminos-licencias';
  public static VIDEO_TUTORIAL_URL = 'https://youtu.be/AnNnt6weWx4';
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
  public static OPENDATA_DATASET_URL = 'http://opendata.aragon.es/datos/';

  public static SHARE_FACEBOOK = 'https://www.facebook.com/sharer.php?u=';
  public static SHARE_TWITTER = 'https://twitter.com/share?url=';

  public static CAMPUS_CONTENT_PLATFORM_ARAGONOPENDATA = 'Aragón Open Data';
  public static CAMPUS_CONTENT_PLATFORM_BOSTOCKSORG = 'bost.ocks.org';
  public static CAMPUS_CONTENT_PLATFORM_GITHUB = 'GitHub';
  public static CAMPUS_CONTENT_PLATFORM_PODCAST = 'Podcast';
  public static CAMPUS_CONTENT_PLATFORM_SLIDESHARE = 'Slideshare';
  public static CAMPUS_CONTENT_PLATFORM_VIMEO = 'Vimeo';
  public static CAMPUS_CONTENT_PLATFORM_YOUTUBE = 'Youtube';
  public static CAMPUS_CONTENT_PLATFORM_LINK = 'Enlace';
  public static CAMPUS_CURSO_INICIACION = '/public/campus/curso/html/index.html';

  //ERROR CONSTANTS
  public static DATASET_LIST_ERROR_TITLE = 'Se ha producido un error';
  public static DATASET_LIST_ERROR_MESSAGE = 'Se ha producido un error en la carga de datos, vuelva a intentarlo y si el error persiste contacte con el administrador.';
  public static DATASET_LIST_ERROR_IFRAME_MESSAGE = 'Previsualización del conjunto de datos no disponible';
  public static CAMPUS_EVENTS_ERROR_TITLE = 'Se ha producido un error';
  public static CAMPUS_EVENTS_ERROR_MESSAGE = 'Se ha producido un error en la carga de datos, vuelva a intentarlo y si el error persiste contacte con el administrador.';
  public static OPEN_DATA_STATIC_CONTENT_ERROR_TITLE = 'Se ha producido un error';
  public static OPEN_DATA_STATIC_CONTENT_ERROR_MESSAGE = 'Se ha producido un error en la carga de datos, vuelva a intentarlo y si el error persiste contacte con el administrador.';
  public static APPLICATIONS_STATIC_CONTENT_ERROR_TITLE = 'Se ha producido un error';
  public static APPLICATIONS_STATIC_CONTENT_ERROR_MESSAGE = 'Se ha producido un error en la carga de datos, vuelva a intentarlo y si el error persiste contacte con el administrador.';
  public static EVENTS_STATIC_CONTENT_ERROR_TITLE = 'Se ha producido un error';
  public static EVENTS_STATIC_CONTENT_ERROR_MESSAGE = 'Se ha producido un error en la carga de datos, vuelva a intentarlo y si el error persiste contacte con el administrador.';
  public static DEVELOPERS_STATIC_CONTENT_ERROR_TITLE = 'Se ha producido un error';
  public static DEVELOPERS_STATIC_CONTENT_ERROR_MESSAGE = 'Se ha producido un error en la carga de datos, vuelva a intentarlo y si el error persiste contacte con el administrador.';
  public static APIS_STATIC_CONTENT_ERROR_TITLE = 'Se ha producido un error';
  public static APIS_STATIC_CONTENT_ERROR_MESSAGE = 'Se ha producido un error en la carga de datos, vuelva a intentarlo y si el error persiste contacte con el administrador.';
  public static SPARQL_STATIC_CONTENT_ERROR_TITLE = 'Se ha producido un error';
  public static SPARQL_STATIC_CONTENT_ERROR_MESSAGE = 'Se ha producido un error en la carga de datos, vuelva a intentarlo y si el error persiste contacte con el administrador.';

  //COMMON CONSTANTS
  public static DATASET_LIST_ROWS_PER_PAGE = 20;
  public static DATASET_LIST_EMPTY = 'No se han encontrado datos';
  public static DATASET_LIST_SORT_COLUMN_NAME = 'name';
  public static DATASET_LIST_SORT_COLUMN_ACCESS = 'accesos';
  public static DATASET_LIST_SORT_COLUMN_LAST_UPDATE = 'lastUpdate';
  public static DATASET_LIST_HOMER_SORT_COLUMN_NAME = 'name';
  public static DATASET_LIST_HOMER_SORT_COLUMN_LANGUAGE = 'language';
  public static DATASET_LIST_HOMER_SORT_COLUMN_PORTAL = 'portal';
  public static CAMPUS_EVENTS_PER_PAGE = 10;
  public static CAMPUS_EVENTS_TYPES_ALL = 'Todos los tipos';
  public static CAMPUS_EVENTS_EMPTY = 'No se han encontrado datos';

  public static DATA_TOPICS = 'temas';

  public static DATASET_LIST_DROPDOWN_TYPE_ALL = 'Todos los tipos';
  public static DATASET_LIST_DROPDOWN_TYPE_CALENDARIO_LABEL = 'Calendario';
  public static DATASET_LIST_DROPDOWN_TYPE_CALENDARIO_VALUE = 'calendario';
  public static DATASET_LIST_DROPDOWN_TYPE_FOTOS_LABEL = 'Fotos';
  public static DATASET_LIST_DROPDOWN_TYPE_FOTOS_VALUE = 'fotos';
  public static DATASET_LIST_DROPDOWN_TYPE_HOJAS_CALCULO_LABEL = 'Hojas de Calculo';
  public static DATASET_LIST_DROPDOWN_TYPE_HOJAS_CALCULO_VALUE = 'hojas-de-calculo';
  public static DATASET_LIST_DROPDOWN_TYPE_MAPAS_LABEL = 'Mapas';
  public static DATASET_LIST_DROPDOWN_TYPE_MAPAS_VALUE = 'mapas';
  public static DATASET_LIST_DROPDOWN_TYPE_RECURSOS_EDUCATIVOS_LABEL = 'Recursos Educativos';
  public static DATASET_LIST_DROPDOWN_TYPE_RECURSOS_EDUCATIVOS_VALUE = 'recursos-educativos';
  public static DATASET_LIST_DROPDOWN_TYPE_RECURSOS_WEB_LABEL = 'Recursos Web';
  public static DATASET_LIST_DROPDOWN_TYPE_RECURSOS_WEB_VALUE = 'recursos-web';
  public static DATASET_LIST_DROPDOWN_TYPE_RSS_LABEL = 'RSS';
  public static DATASET_LIST_DROPDOWN_TYPE_RSS_VALUE = 'rss';
  public static DATASET_LIST_DROPDOWN_TYPE_TEXTO_PLANO_LABEL = 'Texto plano';
  public static DATASET_LIST_DROPDOWN_TYPE_TEXTO_PLANO_VALUE = 'texto-plano';

  public static DATASET_LIST_SEARCH_OPTION_FREE_SEARCH = 'busqueda-libre';
  public static DATASET_LIST_SEARCH_OPTION_TOPICS = 'tema-y-tipo';
  public static DATASET_LIST_SEARCH_OPTION_ORGANIZATIONS = 'organizacion-y-tipo';
  public static DATASET_LIST_SEARCH_OPTION_TAGS = 'etiquetas';
  public static DATASET_LIST_SEARCH_OPTION_STATS = 'informacion-estadistica';
  public static DATASET_LIST_SEARCH_OPTION_HOMER = 'buscador-homer';

  public static DATASET_LIST_DROPDOWN_SEARCH_FREE_SEARCH_VALUE_LABEL = 'Búsqueda libre';
  public static DATASET_LIST_DROPDOWN_SEARCH_TOPICS_LABEL = 'Tema y tipo';
  public static DATASET_LIST_DROPDOWN_SEARCH_ORGANIZATIONS_LABEL = 'Organización y tipo';
  public static DATASET_LIST_DROPDOWN_SEARCH_TAGS_LABEL = 'Etiquetas';
  public static DATASET_LIST_DROPDOWN_SEARCH_STATS_LABEL = 'Información estadística';
  public static DATASET_LIST_DROPDOWN_SEARCH_HOMER_LABEL = 'Buscador Homer';

  public static DATASET_LIST_DROPDOWN_LANG_ALL = 'Todos los idiomas';
  public static DATASET_LIST_DROPDOWN_LANG_ES_LABEL = 'Español';
  public static DATASET_LIST_DROPDOWN_LANG_ES_VALUE = 'es';
  public static DATASET_LIST_DROPDOWN_LANG_EN_LABEL = 'English';
  public static DATASET_LIST_DROPDOWN_LANG_EN_VALUE = 'en';
  public static DATASET_LIST_DROPDOWN_LANG_FR_LABEL = 'Français';
  public static DATASET_LIST_DROPDOWN_LANG_FR_VALUE = 'fr';
  public static DATASET_LIST_DROPDOWN_LANG_IT_LABEL = 'Italiano';
  public static DATASET_LIST_DROPDOWN_LANG_IT_VALUE = 'it';
  public static DATASET_LIST_DROPDOWN_LANG_EL_LABEL = 'ελληνικά';
  public static DATASET_LIST_DROPDOWN_LANG_EL_VALUE = 'el';
  public static DATASET_LIST_DROPDOWN_LANG_SL_LABEL = 'Slovenščina';
  public static DATASET_LIST_DROPDOWN_LANG_SL_VALUE = 'sl';
  public static DATASET_LIST_DROPDOWN_LANG_SR_LABEL = 'Српски';
  public static DATASET_LIST_DROPDOWN_LANG_SR_VALUE = 'sr';

  public static DATASET_LIST_DROPDOWN_GROUPS_ALL = { label: 'Todos los grupos', value: undefined };
  public static DATASET_LIST_DROPDOWN_GROUPS_TERRITORIO = { label: 'Territorio', value: '01' };
  public static DATASET_LIST_DROPDOWN_GROUPS_DEMOGRAFIA = { label: 'Demografía y Población', value: '02' };
  public static DATASET_LIST_DROPDOWN_GROUPS_EDUCACION = { label: 'Educación y Formación', value: '03' };
  public static DATASET_LIST_DROPDOWN_GROUPS_SALUD = { label: 'Salud', value: '04' };
  public static DATASET_LIST_DROPDOWN_GROUPS_NIVELCALIDADVIDA = { label: 'Nivel, Calidad y Condiciones de Vida', value: '05' };
  public static DATASET_LIST_DROPDOWN_GROUPS_ANALISISSOCIALES = { label: 'Análisis Sociales, Justicia, Cultura y Deporte', value: '06' };
  public static DATASET_LIST_DROPDOWN_GROUPS_TRABAJOSALARIOS = { label: 'Trabajo, Salarios y Relaciones Laborales', value: '07' };
  public static DATASET_LIST_DROPDOWN_GROUPS_AGRICULTURA = { label: 'Agricultura, Industria y Construcción', value: '08' };
  public static DATASET_LIST_DROPDOWN_GROUPS_SERVICIOS = { label: 'Servicios, Comercio, Transporte y Turismo', value: '09' };
  public static DATASET_LIST_DROPDOWN_GROUPS_PRECIOS = { label: 'Precios', value: '10' };
  public static DATASET_LIST_DROPDOWN_GROUPS_PIB = { label: 'PIB, Renta, Comercio Exterior y Empresas', value: '11' };
  public static DATASET_LIST_DROPDOWN_GROUPS_FINANCIERAS = { label: 'Financieras. Mercantiles. Tributarias', value: '12' };
  public static DATASET_LIST_DROPDOWN_GROUPS_IDITIC = { label: 'I+D+i y Tecnologías de la Información (TIC)', value: '13' };
  public static DATASET_LIST_DROPDOWN_GROUPS_MEDIOAMBIENTE = { label: 'Medio Ambiente y Energía', value: '14' };
  public static DATASET_LIST_DROPDOWN_GROUPS_SECTORPUBLICO = { label: 'Sector Público. Elecciones', value: '15' };

  public static DATASET_LIST_DROPDOWN_SUBGROUPS_ALL = { label: 'Todos los subgrupos', value: undefined };
  public static DATASET_LIST_DROPDOWN_SUBGROUP_TERRITORIO_ESPACIO_FISICO = { label: 'Espacio físico. Características geográficas', value: '0101' };
  public static DATASET_LIST_DROPDOWN_SUBGROUP_TERRITORIO_USOS_SUELO = { label: 'Usos del suelo', value: '0102' };
  public static DATASET_LIST_DROPDOWN_SUBGROUP_TERRITORIO_NOMENCLATURAS = { label: 'Nomenclaturas territoriales', value: '0103' };
  public static DATASET_LIST_DROPDOWN_SUBGROUP_TERRITORIO_INFRAESTRUCTURAS = { label: 'Infraestructuras', value: '0104' };
  public static DATASET_LIST_DROPDOWN_SUBGROUP_TERRITORIO_MUNICIPIOS = { label: 'Municipios', value: '0105' };
  public static DATASET_LIST_DROPDOWN_SUBGROUP_TERRITORIO_COMARCAS = { label: 'Comarcas', value: '0106' };
  public static DATASET_LIST_DROPDOWN_SUBGROUP_TERRITORIO_ZONAS_SECTORIALES = { label: 'Zonas sectoriales', value: '0107' };

  public static DATASET_LIST_DROPDOWN_SUBGROUP_DEMOGRAFIA_CIFRAS_POBLACION = { label: 'Cifras de población y Censos demográficos', value: '0201' };
  public static DATASET_LIST_DROPDOWN_SUBGROUP_DEMOGRAFIA_INDICADORES_DEMOGRAFICOS = { label: 'Indicadores demográficos', value: '0202' };
  public static DATASET_LIST_DROPDOWN_SUBGROUP_DEMOGRAFIA_ESTUDIOS_DEMOGRAFICOS = { label: 'Estudios demográficos', value: '0203' };
  public static DATASET_LIST_DROPDOWN_SUBGROUP_DEMOGRAFIA_MIGRACIONES = { label: 'Migraciones', value: '0204' };
  public static DATASET_LIST_DROPDOWN_SUBGROUP_DEMOGRAFIA_MOVIMIENTO_NATURAL = { label: 'Movimiento Natural de Población', value: '0205' };

  public static DATASET_LIST_DROPDOWN_SUBGROUP_EDUCACION_ENSENANZA_NO_UNIVERSITARIA = { label: 'Enseñanza no universitaria', value: '0301' };
  public static DATASET_LIST_DROPDOWN_SUBGROUP_EDUCACION_ENSENANZA_UNIVERSITARIA = { label: 'Enseñanza universitaria', value: '0302' };
  public static DATASET_LIST_DROPDOWN_SUBGROUP_EDUCACION_GASTO_PUBLICO = { label: 'Gasto público en educación', value: '0303' };
  public static DATASET_LIST_DROPDOWN_SUBGROUP_EDUCACION_BECAS = { label: 'Becas y ayudas', value: '0304' };
  public static DATASET_LIST_DROPDOWN_SUBGROUP_EDUCACION_TRANSICION = { label: 'Transición Educativa-Laboral', value: '0305' };
  public static DATASET_LIST_DROPDOWN_SUBGROUP_EDUCACION_ENCUESTA = { label: 'Encuesta sobre la participación de la población adulta en las actividades de aprendizaje', value: '0306' };
  public static DATASET_LIST_DROPDOWN_SUBGROUP_EDUCACION_NIVEL = { label: 'Nivel educativo de la población', value: '0307' };

  public static DATASET_LIST_DROPDOWN_SUBGROUP_SALUD_ESPERANZA = { label: 'Esperanza de vida en salud', value: '0401' };
  public static DATASET_LIST_DROPDOWN_SUBGROUP_SALUD_POBLACION = { label: 'Población y pirámides de población por zonas de salud', value: '0402' };
  public static DATASET_LIST_DROPDOWN_SUBGROUP_SALUD_TARJETAS = { label: 'Tarjetas Sanitarias', value: '0403' };
  public static DATASET_LIST_DROPDOWN_SUBGROUP_SALUD_ENCUESTA = { label: 'Encuesta Nacional de Salud', value: '0404' };
  public static DATASET_LIST_DROPDOWN_SUBGROUP_SALUD_SECTORES = { label: 'Sectores sanitarios y zonas de salud', value: '0405' };
  public static DATASET_LIST_DROPDOWN_SUBGROUP_SALUD_INFRAESTRUCTURA = { label: 'Infraestructura sanitaria', value: '0406' };
  public static DATASET_LIST_DROPDOWN_SUBGROUP_SALUD_DOTACION = { label: 'Dotación de personal', value: '0407' };
  public static DATASET_LIST_DROPDOWN_SUBGROUP_SALUD_DISCAPACIDADES = { label: 'Discapacidades y Dependencia', value: '0408' };
  public static DATASET_LIST_DROPDOWN_SUBGROUP_SALUD_MORBILIDAD = { label: 'Morbilidad Hospitalaria', value: '0409' };
  public static DATASET_LIST_DROPDOWN_SUBGROUP_SALUD_DEFUNCIONES = { label: 'Defunciones según la causa de muerte', value: '0410' };
  public static DATASET_LIST_DROPDOWN_SUBGROUP_SALUD_ESTADISTICAS = { label: 'Estadísticas de Donación y Trasplantes', value: '0411' };
  public static DATASET_LIST_DROPDOWN_SUBGROUP_SALUD_INTERRUPCION = { label: 'Interrupción Voluntaria del Embarazo (IVE\'s)', value: '0412' };
  public static DATASET_LIST_DROPDOWN_SUBGROUP_SALUD_OTRAS = { label: 'Otras estadísticas de Salud', value: '0413' };

  public static DATASET_LIST_DROPDOWN_SUBGROUP_NIVELCALIDADVIDA_CONDICIONES = { label: 'Condiciones de vida y pobreza', value: '0501' };
  public static DATASET_LIST_DROPDOWN_SUBGROUP_NIVELCALIDADVIDA_PRESUPUESTOS = { label: 'Presupuestos Familiares, Gastos e Ingresos', value: '0502' };
  public static DATASET_LIST_DROPDOWN_SUBGROUP_NIVELCALIDADVIDA_OTRAS = { label: 'Otras Estadísticas de Hogares', value: '0503' };
  public static DATASET_LIST_DROPDOWN_SUBGROUP_NIVELCALIDADVIDA_INDICE = { label: 'índice de Precios al Consumo', value: '0504' };
  public static DATASET_LIST_DROPDOWN_SUBGROUP_NIVELCALIDADVIDA_PENSIONES = { label: 'Pensiones y Prestaciones Sociales', value: '0505' };
  public static DATASET_LIST_DROPDOWN_SUBGROUP_NIVELCALIDADVIDA_VIVIENDA = { label: 'Vivienda', value: '0506' };

  public static DATASET_LIST_DROPDOWN_SUBGROUP_ANALISISSOCIALES_ANALISIS = { label: 'Análisis sociales', value: '0601' };
  public static DATASET_LIST_DROPDOWN_SUBGROUP_ANALISISSOCIALES_DEPENDENCIA = { label: 'La Dependencia en Aragón', value: '0602' };
  public static DATASET_LIST_DROPDOWN_SUBGROUP_ANALISISSOCIALES_COOPERACION = { label: 'Cooperación para el desarrollo', value: '0603' };
  public static DATASET_LIST_DROPDOWN_SUBGROUP_ANALISISSOCIALES_ENCUESTA = { label: 'Encuesta de Usos lingüísticos', value: '0604' };
  public static DATASET_LIST_DROPDOWN_SUBGROUP_ANALISISSOCIALES_SECTOR = { label: 'Sector no lucrativo', value: '0605' };
  public static DATASET_LIST_DROPDOWN_SUBGROUP_ANALISISSOCIALES_ESTADISTICA = { label: 'Estadísticas de género', value: '0606' };
  public static DATASET_LIST_DROPDOWN_SUBGROUP_ANALISISSOCIALES_JUSTICIA = { label: 'Justicia y Seguridad Ciudadana', value: '0607' };
  public static DATASET_LIST_DROPDOWN_SUBGROUP_ANALISISSOCIALES_CULTURA = { label: 'Cultura', value: '0608' };
  public static DATASET_LIST_DROPDOWN_SUBGROUP_ANALISISSOCIALES_DEPORTE = { label: 'Deporte', value: '0609' };

  public static DATASET_LIST_DROPDOWN_SUBGROUP_TRABAJOSALARIOS_ENCUESTA = { label: 'Encuesta de Población Activa', value: '0701' };
  public static DATASET_LIST_DROPDOWN_SUBGROUP_TRABAJOSALARIOS_PARO = { label: 'Paro registrado', value: '0702' };
  public static DATASET_LIST_DROPDOWN_SUBGROUP_TRABAJOSALARIOS_AFILIADOS = { label: 'Afilados a la Seguridad Social', value: '0703' };
  public static DATASET_LIST_DROPDOWN_SUBGROUP_TRABAJOSALARIOS_MOVIMIENTO = { label: 'Movimiento Laboral Registrado', value: '0704' };
  public static DATASET_LIST_DROPDOWN_SUBGROUP_TRABAJOSALARIOS_RELACIONES = { label: 'Relaciones Laborales', value: '0705' };
  public static DATASET_LIST_DROPDOWN_SUBGROUP_TRABAJOSALARIOS_COSTES = { label: 'Costes Laborales', value: '0706' };
  public static DATASET_LIST_DROPDOWN_SUBGROUP_TRABAJOSALARIOS_SALARIOS = { label: 'Salarios', value: '0707' };
  public static DATASET_LIST_DROPDOWN_SUBGROUP_TRABAJOSALARIOS_PRESTACIONES = { label: 'Prestaciones por desempleo y otras', value: '0708' };
  public static DATASET_LIST_DROPDOWN_SUBGROUP_TRABAJOSALARIOS_ACCIDENTES = { label: 'Accidentes y Enfermedades profesionales', value: '0709' };
  public static DATASET_LIST_DROPDOWN_SUBGROUP_TRABAJOSALARIOS_ACTIVIDAD = { label: 'Actividad laboral según los Censos de Población', value: '0710' };
  public static DATASET_LIST_DROPDOWN_SUBGROUP_TRABAJOSALARIOS_PRINCIPALES = { label: 'Principales Indicadores del mercado laboral', value: '0711' };
  public static DATASET_LIST_DROPDOWN_SUBGROUP_TRABAJOSALARIOS_HERRAMIENTAS = { label: 'Herramientas de apoyo', value: '0712' };

  public static DATASET_LIST_DROPDOWN_SUBGROUP_AGRICULTURA_AGRICULTURA = { label: 'Agricultura, ganadería, selvicultura y pesca', value: '0801' };
  public static DATASET_LIST_DROPDOWN_SUBGROUP_AGRICULTURA_INDUSTRIA = { label: 'Industria manufacturera y extractiva', value: '0802' };
  public static DATASET_LIST_DROPDOWN_SUBGROUP_AGRICULTURA_CONSTRUCCION = { label: 'Construcción', value: '0803' };

  public static DATASET_LIST_DROPDOWN_SUBGROUP_SERVICIOS_ENCUESTAS = { label: 'Encuestas globales del sector servicios', value: '0901' };
  public static DATASET_LIST_DROPDOWN_SUBGROUP_SERVICIOS_COMERCIO = { label: 'Comercio', value: '0902' };
  public static DATASET_LIST_DROPDOWN_SUBGROUP_SERVICIOS_TRANSPORTE = { label: 'Transporte y servicios postales', value: '0903' };
  public static DATASET_LIST_DROPDOWN_SUBGROUP_SERVICIOS_TURISMO = { label: 'Turismo', value: '0904' };
  public static DATASET_LIST_DROPDOWN_SUBGROUP_SERVICIOS_ACTIVIDAD = { label: 'Actividad Inmobiliaria y Vivienda', value: '0905' };

  public static DATASET_LIST_DROPDOWN_SUBGROUP_PRECIOS_INDICE = { label: 'índice de precios de consumo (IPC)', value: '1001' };
  public static DATASET_LIST_DROPDOWN_SUBGROUP_PRECIOS_GASOLINAS = { label: 'Precios de gasolinas y gasóleos', value: '1002' };
  public static DATASET_LIST_DROPDOWN_SUBGROUP_PRECIOS_VIVIENDA = { label: 'Precios de la vivienda', value: '1003' };
  public static DATASET_LIST_DROPDOWN_SUBGROUP_PRECIOS_SUELO_URBANO = { label: 'Precios del suelo urbano', value: '1004' };
  public static DATASET_LIST_DROPDOWN_SUBGROUP_PRECIOS_SUELO_AGRARIO = { label: 'Precios del suelo agrario/de la tierra', value: '1005' };
  public static DATASET_LIST_DROPDOWN_SUBGROUP_PRECIOS_INDUSTRIA = { label: 'Precios de la Industria', value: '1006' };
  public static DATASET_LIST_DROPDOWN_SUBGROUP_PRECIOS_HOSTELEROS = { label: 'Precios hosteleros', value: '1007' };
  public static DATASET_LIST_DROPDOWN_SUBGROUP_PRECIOS_AGRARIOS = { label: 'Precios agrarios', value: '1008' };

  public static DATASET_LIST_DROPDOWN_SUBGROUP_PIB_VALOR = { label: 'PIB, Valor Añadido y Renta', value: '1101' };
  public static DATASET_LIST_DROPDOWN_SUBGROUP_PIB_COMERCIO = { label: 'Comercio exterior', value: '1102' };
  public static DATASET_LIST_DROPDOWN_SUBGROUP_PIB_EMPRESAS = { label: 'Empresas', value: '1103' };

  public static DATASET_LIST_DROPDOWN_SUBGROUP_FINANCIERAS_ENTIDADES = { label: 'Entidades de depósito y crédito', value: '1201' };
  public static DATASET_LIST_DROPDOWN_SUBGROUP_FINANCIERAS_EFECTOS = { label: 'Efectos de comercio devueltos impagados', value: '1202' };
  public static DATASET_LIST_DROPDOWN_SUBGROUP_FINANCIERAS_HIPOTECAS = { label: 'Hipotecas', value: '1203' };
  public static DATASET_LIST_DROPDOWN_SUBGROUP_FINANCIERAS_SOCIEDADES = { label: 'Sociedades mercantiles', value: '1204' };
  public static DATASET_LIST_DROPDOWN_SUBGROUP_FINANCIERAS_ESTADOS = { label: 'Estados contables de las empresas Aragonesas', value: '1205' };
  public static DATASET_LIST_DROPDOWN_SUBGROUP_FINANCIERAS_SUSPENSIONES = { label: 'Suspensiones de pagos y declaraciones de quiebras', value: '1206' };
  public static DATASET_LIST_DROPDOWN_SUBGROUP_FINANCIERAS_ESTADISTICA = { label: 'Estadística de procedimiento concursal', value: '1207' };
  public static DATASET_LIST_DROPDOWN_SUBGROUP_FINANCIERAS_INFORMACION = { label: 'Información tributaria', value: '1208' };

  public static DATASET_LIST_DROPDOWN_SUBGROUP_IDITIC_INVESTIGACION = { label: 'Investigación y Desarrollo (I+D) e Innovación', value: '1301' };
  public static DATASET_LIST_DROPDOWN_SUBGROUP_IDITIC_TECNOLOGIAS = { label: 'Tecnologías de la Información y Comunicación', value: '1302' };

  public static DATASET_LIST_DROPDOWN_SUBGROUP_MEDIOAMBIENTE_SECTORES = { label: 'Sectores Productivos y Medio ambiente', value: '14' };
  public static DATASET_LIST_DROPDOWN_SUBGROUP_MEDIOAMBIENTE_AGUA = { label: 'Agua', value: '1401' };
  public static DATASET_LIST_DROPDOWN_SUBGROUP_MEDIOAMBIENTE_CALIDAD_AIRE = { label: 'Calidad del aire / Contaminación atmosférica', value: '1402' };
  public static DATASET_LIST_DROPDOWN_SUBGROUP_MEDIOAMBIENTE_CAMBIO_CLIMATICO = { label: 'Cambio climático / Emisiones a la atmósfera', value: '1403' };
  public static DATASET_LIST_DROPDOWN_SUBGROUP_MEDIOAMBIENTE_CLIMA = { label: 'Clima / Datos climatológicos', value: '1404' };
  public static DATASET_LIST_DROPDOWN_SUBGROUP_MEDIOAMBIENTE_GASTO = { label: 'Gasto en Medio Ambiente y Cuentas Ambientales', value: '1405' };
  public static DATASET_LIST_DROPDOWN_SUBGROUP_MEDIOAMBIENTE_HOGARES = { label: 'Hogares y Medio Ambiente', value: '1406' };
  public static DATASET_LIST_DROPDOWN_SUBGROUP_MEDIOAMBIENTE_MEDIO_AMBIENTE = { label: 'Medio ambiente urbano', value: '1407' };
  public static DATASET_LIST_DROPDOWN_SUBGROUP_MEDIOAMBIENTE_NATURALEZA = { label: 'Naturaleza y biodiversidad', value: '1408' };
  public static DATASET_LIST_DROPDOWN_SUBGROUP_MEDIOAMBIENTE_PREVENCION = { label: 'Prevención ambiental', value: '1409' };
  public static DATASET_LIST_DROPDOWN_SUBGROUP_MEDIOAMBIENTE_RESIDUOS = { label: 'Residuos', value: '1410' };
  public static DATASET_LIST_DROPDOWN_SUBGROUP_MEDIOAMBIENTE_RIESGOS = { label: 'Riesgos naturales y tecnológicos', value: '1411' };
  public static DATASET_LIST_DROPDOWN_SUBGROUP_MEDIOAMBIENTE_SUELOS = { label: 'Suelos y Usos del suelo', value: '1412' };
  public static DATASET_LIST_DROPDOWN_SUBGROUP_MEDIOAMBIENTE_TRIBUTOS = { label: 'Tributos ambientales', value: '1413' };
  public static DATASET_LIST_DROPDOWN_SUBGROUP_MEDIOAMBIENTE_UTILIZACION = { label: 'Utilización de recursos naturales', value: '1414' };
  public static DATASET_LIST_DROPDOWN_SUBGROUP_MEDIOAMBIENTE_DESARROLLO = { label: 'Medio ambiente y desarrollo sostenible', value: '1415' };
  public static DATASET_LIST_DROPDOWN_SUBGROUP_MEDIOAMBIENTE_DICCIONARIO = { label: 'Diccionario de términos medioambientales', value: '1416' };
  public static DATASET_LIST_DROPDOWN_SUBGROUP_MEDIOAMBIENTE_ENERGIA = { label: 'Energía', value: '1417' };

  public static DATASET_LIST_DROPDOWN_SUBGROUP_SECTORPUBLICO_EMPLEO = { label: 'Empleo Público', value: '1501' };
  public static DATASET_LIST_DROPDOWN_SUBGROUP_SECTORPUBLICO_PRESUPUESTOS = { label: 'Presupuestos de la Administración Pública', value: '1502' };
  public static DATASET_LIST_DROPDOWN_SUBGROUP_SECTORPUBLICO_ACTIVIDADES = { label: 'Actividades del Sector Público', value: '1503' };
  public static DATASET_LIST_DROPDOWN_SUBGROUP_SECTORPUBLICO_ELECCIONES = { label: 'Elecciones', value: '1504' };

  public static DATASET_HIGLIGHT_OCURRENCES = '10';
  public static DATASET_HIGLIGHT_DAYS = '14';
  public static DATASET_AUTOCOMPLETE_DEBOUNCE_TIME = 50;
  public static DATASET_AUTOCOMPLETE_MIN_CHARS = 3;
  public static DATASET_AUTOCOMPLETE_LIMIT_RESULTS = 8;
  public static DATASET_AUTOCOMPLETE_HEADER_LIMIT_RESULTS = 4;
  public static ORGANIZATION_COMBO_VIEWS_LIST_OPTION = 'Ver como lista';
  public static ORGANIZATION_COMBO_VIEWS_CARD_OPTION = 'Ver como ficha';
  public static ORGANIZATION_DATASET_LIST_ROWS_PER_PAGE = 20;
  public static ORGANIZATION_EXTRA_WEBPAGE = 'webpage';
  public static ORGANIZATION_EXTRA_ADDRESS = 'address';
  public static ORGANIZATION_EXTRA_PERSON = 'person';
  public static DATASET_EXTRA_DATA_DICTIONARY = 'Data Dictionary';
  public static DATASET_EXTRA_DATA_DICTIONARY_DEFAULT = 'El diccionario del dato se encuentra en la siguiente url';
  public static DATASET_EXTRA_DATA_DICTIONARY_URL = 'Data Dictionary URL';
  public static DATASET_EXTRA_DATA_QUALITY = 'Data Quality';
  public static DATASET_EXTRA_DATA_QUALITY_DEFAULT = 'La calidad del dato se encuentra en la siguiente url';
  public static DATASET_EXTRA_DATA_QUALITY_URL = 'Data Quality URL';
  public static DATASET_EXTRA_FREQUENCY = 'Frequency';
  public static DATASET_EXTRA_GRANULARITY = 'Granularity';
  public static DATASET_EXTRA_TEMPORAL_FROM = 'TemporalFrom';
  public static DATASET_EXTRA_TEMPORAL_UNTIL = 'TemporalUntil';
  public static DATASET_EXTRA_NAME_ARAGOPEDIA = 'nameAragopedia';
  public static DATASET_EXTRA_SHORT_URI_ARAGOPEDIA = 'shortUriAragopedia';
  public static DATASET_EXTRA_TYPE_ARAGOPEDIA = 'typeAragopedia';
  public static DATASET_EXTRA_URI_ARAGOPEDIA = 'uriAragopedia';
  public static DATASET_EXTRA_SPATIAL = 'Spatial';
  public static DATASET_EXTRA_LANG_ES= 'langES';
  public static DATASET_EXTRA_LANG_EN= 'langEN';
  public static DATASET_EXTRA_LANG_FR= 'langFR';
  public static DATASET_EXTRA_LANG_ARG= 'langARG';
  public static DATASET_EXTRA_LANG_OTHER= 'langOtherValue';
  public static DATASET_DETAIL_CKAN_PREVIEW_URL_PARAM_DATASET= '/dataset/';
  public static DATASET_DETAIL_CKAN_PREVIEW_URL_PARAM_RESOURCE= '/resource/';
  public static DATASET_DETAIL_CKAN_PREVIEW_URL_PARAM_VIEW= '/view/';

  public static DATASET_EXTRA_IAEST_TEMA_ESTADISTICO = '01_IAEST_Tema estadístico';
  public static DATASET_EXTRA_IAEST_UNIDAD_ESTADISTICA = '02_IAEST_Unidad Estadística';
  public static DATASET_EXTRA_IAEST_POBLACION_ESTADISTICA = '03_IAEST_Población estadística';
  public static DATASET_EXTRA_IAEST_UNIDAD_MEDIDA = '04_IAEST_Unidad de medida';
  public static DATASET_EXTRA_IAEST_TIPO_OPERACION = '07_IAEST_Tipo de operación';
  public static DATASET_EXTRA_IAEST_TIPOLOGIA_DATOS_ORIGEN = '08_IAEST_Tipología de datos de origen';
  public static DATASET_EXTRA_IAEST_FUENTE = '09_IAEST_Fuente';
  public static DATASET_EXTRA_IAEST_TRATAMIENTO_ESTADISTICO = '11_IAEST_Tratamiento estadístico';
  public static DATASET_EXTRA_IAEST_LEGISLACION_UE = '15_IAEST_Legislación UE';

  public static DATASET_RDF_FORMAT_OPTIONS_RDF = 'application/rdf+xml;charset=utf-8;'
  public static DATASET_RDF_FILE_EXTENSION_RDF = '.rdf'

  public static STATIC_INFO_OPEN_DATA_SECTION_OPEN_DATA = 'open-data';
  public static STATIC_INFO_OPEN_DATA_SECTION_REUTILIZATION = 'reutilizacion';
  public static STATIC_INFO_OPEN_DATA_SECTION_GOOD_PRACTICES = 'buenas-practicas';
  public static STATIC_INFO_OPEN_DATA_SECTION_LEGAL = 'marco-legal';
  public static STATIC_INFO_OPEN_DATA_SECTION_EXPERIENCIES = 'experiencias';
  public static STATIC_INFO_OPEN_DATA_SECTION_ARAGON_OPEN_DATA = 'aragon-open-data';
  public static STATIC_INFO_OPEN_DATA_SECTION_OBJECTIVES = 'objetivos';
  public static STATIC_INFO_OPEN_DATA_SECTION_PARTICIPATION = 'participacion';
  public static STATIC_INFO_OPEN_DATA_SECTION_ARAGON_SERVICES = 'servicios-aragon-open-data';
  public static STATIC_INFO_OPEN_DATA_SECTION_DOCUMENTATION = 'documentacion';
  public static STATIC_INFO_OPEN_DATA_SECTION_TERMS = 'terminos-licencias'; 
  public static STATIC_INFO_OPEN_DATA_SECTION_CONDITIONS = 'condiciones-social-data';
  public static STATIC_INFO_EVENTS_SECTION_JACATHON = 'jacathon';
  public static STATIC_INFO_DEVELOPERS_SECTION_INTEROPERABILITY = 'interoperabilidad';
  public static STATIC_INFO_DEVELOPERS_SECTION_TECHNOLOGY = 'tecnologia-utilizada';
  public static STATIC_INFO_DEVELOPERS_SECTION_DIRECT_DOWNLOAD = 'descarga-directa';
  public static STATIC_INFO_DEVELOPERS_SECTION_METADATES = 'metadatos'; 
  public static STATIC_INFO_DEVELOPERS_SECTION_TOOLS = 'herramientas';
  public static STATIC_INFO_APIS_SECTION_CKAN = 'api-ckan';
  public static STATIC_INFO_APIS_SECTION_SOCIAL_DATA = 'api-social-data';
  public static STATIC_INFO_APIS_SECTION_ARAGOPEDIA = 'api-aragopedia'; 
  public static STATIC_INFO_APIS_SECTION_ARAGODBPEDIA_1 = 'api-aragodbpedia-1';
  public static STATIC_INFO_APIS_SECTION_ARAGODBPEDIA_2 = 'api-aragodbpedia-2';
  public static STATIC_INFO_APIS_SECTION_GA_OD_CORE = 'api-ga-od-core';
  public static STATIC_INFO_SPARQL_SECTION_CONTENT = 'contenidoSparql';

  public static UNDEFINED = "undefined";

  //OPEN DATA ADMIN
  public static ADMIN_USERS_LIST_ROWS_PER_PAGE = 10;
  public static ADMIN_USERS_LIST_SORT_COLUMN_NAME = 'name';
  public static ADMIN_USERS_LIST_SORT_COLUMN_EMAIL = 'email';
  public static ADMIN_USERS_LIST_SORT_COLUMN_ROLE = 'role';
  public static ADMIN_USERS_LIST_SORT_COLUMN_SIGNUP_DATE = 'creation_date';
  public static ADMIN_USERS_LIST_SORT_COLUMN_ACTIVE = 'active';

  public static DATASET_RECOMMENDED_IMAGE_URL = 'public/ckan/temas/';

  //ADMIN COMMON PARAMS
  public static DATASET_ADMIN_LIST_ROWS_PER_PAGE = 20;
  public static ADMIN_SERVER_API_LINK_PARAM_SORT_DEFAULT_VALUE = 'relevance,-metadata_modified';
  public static ADMIN_DATASET_EDIT_LICENSE_ID_DEFAULT = 'CC-BY-4.0';
  public static ADMIN_DATASET_EDIT_LICENSE_TITLE_DEFAULT = 'Creative Commons Attribution 4.0';
  public static ADMIN_DATASET_EDIT_LICENSE_URL_DEFAULT = 'https://creativecommons.org/licenses/by/4.0/';

  //ADMIN DROPDOWNS
  public static ADMIN_DATASET_EDIT_DROPDOWN_RESOURCE_ACCESS_TYPES_URL_PUBLIC_FILE = { label: 'Enlace a archivo público', value: 'urlPublicFile' };
  public static ADMIN_DATASET_EDIT_DROPDOWN_RESOURCE_ACCESS_TYPES_DATABASE_VIEW = { label: 'Vista de base de datos', value: 'databaseView' };
  public static ADMIN_DATASET_EDIT_DROPDOWN_RESOURCE_ACCESS_TYPES_FILE = { label: 'Fichero', value: 'file' };

  public static ADMIN_DATASET_EDIT_DROPDOWN_FREQUENCY_ANUAL = { label: 'Anual', value: 'Anual' };
  public static ADMIN_DATASET_EDIT_DROPDOWN_FREQUENCY_SEMESTRAL = { label: 'Semestral', value: 'Semestral' };
  public static ADMIN_DATASET_EDIT_DROPDOWN_FREQUENCY_CUATRIMESTRAL = { label: 'Cuatrimestral', value: 'Cuatrimestral' };
  public static ADMIN_DATASET_EDIT_DROPDOWN_FREQUENCY_TRIMESTRAL = { label: 'Trimestral', value: 'Trimestral' };
  public static ADMIN_DATASET_EDIT_DROPDOWN_FREQUENCY_MENSUAL = { label: 'Mensual', value: 'Mensual' };
  public static ADMIN_DATASET_EDIT_DROPDOWN_FREQUENCY_DIARIA = { label: 'Diaria', value: 'Diaria' };
  public static ADMIN_DATASET_EDIT_DROPDOWN_FREQUENCY_INSTANTANEA = { label: 'Instantánea', value: 'Instantánea' };

  public static ADMIN_DATASET_EDIT_DROPDOWN_LANG_ES = 'Español';
  public static ADMIN_DATASET_EDIT_DROPDOWN_LANG_EN = 'Inglés';
  public static ADMIN_DATASET_EDIT_DROPDOWN_LANG_FR = 'Francés';
  public static ADMIN_DATASET_EDIT_DROPDOWN_LANG_ARG_LNG = 'Lenguas aragonesas';
  public static ADMIN_DATASET_EDIT_DROPDOWN_LANG_OTHER = 'Otro';

  public static ADMIN_DATASET_EDIT_DROPDOWN_RESOURCE_ACCESS_LINK = { label: 'Enlace a un archivo público', value: '0' };
  public static ADMIN_DATASET_EDIT_DROPDOWN_RESOURCE_ACCESS_DB_VIEW = { label: 'Vista de basede datos', value: '1' };
  public static ADMIN_DATASET_EDIT_DROPDOWN_RESOURCE_ACCESS_FILE = { label: 'Sube fichero a AOD', value: '2' };

  public static ADMIN_DATASET_EDIT_DROPDOWN_VIEWS_ELECCIONES = { label: 'Elecciones', value: '0' };
  public static ADMIN_DATASET_EDIT_DROPDOWN_VIEWS_SIMBOLOS = { label: 'Símbolos', value: '1' };
  public static ADMIN_DATASET_EDIT_DROPDOWN_VIEWS_PLENO_MUNICIPIO = { label: 'Pleno municipio', value: '2' };

  
  public static ADMIN_DATASET_EDIT_DROPDOWN_FORMATS_CSV = { label: 'CSV', value: '1' };
  public static ADMIN_DATASET_EDIT_DROPDOWN_FORMATS_DGN = { label: 'DGN', value: '2' };
  public static ADMIN_DATASET_EDIT_DROPDOWN_FORMATS_DWG = { label: 'DWG', value: '3' };
  public static ADMIN_DATASET_EDIT_DROPDOWN_FORMATS_DXF = { label: 'DXF', value: '4' };
  public static ADMIN_DATASET_EDIT_DROPDOWN_FORMATS_ELP = { label: 'ELP', value: '5' };
  public static ADMIN_DATASET_EDIT_DROPDOWN_FORMATS_GEOJSON = { label: 'GEOJSON', value: '6' };
  public static ADMIN_DATASET_EDIT_DROPDOWN_FORMATS_GML = { label: 'GML', value: '7' };
  public static ADMIN_DATASET_EDIT_DROPDOWN_FORMATS_HTML = { label: 'HTML', value: '8' };
  public static ADMIN_DATASET_EDIT_DROPDOWN_FORMATS_ICS = { label: 'ICS', value: '9' };
  public static ADMIN_DATASET_EDIT_DROPDOWN_FORMATS_JPG = { label: 'JPG', value: '10' };
  public static ADMIN_DATASET_EDIT_DROPDOWN_FORMATS_JSON = { label: 'JSON', value: '11' };
  public static ADMIN_DATASET_EDIT_DROPDOWN_FORMATS_KMZ = { label: 'KMZ', value: '12' };
  public static ADMIN_DATASET_EDIT_DROPDOWN_FORMATS_ODS = { label: 'ODS', value: '13' };
  public static ADMIN_DATASET_EDIT_DROPDOWN_FORMATS_PNG = { label: 'PNG', value: '14' };
  public static ADMIN_DATASET_EDIT_DROPDOWN_FORMATS_PS = { label: 'PS', value: '15' };
  public static ADMIN_DATASET_EDIT_DROPDOWN_FORMATS_RDF = { label: 'RDF', value: '16' };
  public static ADMIN_DATASET_EDIT_DROPDOWN_FORMATS_RSS = { label: 'RSS', value: '17' };
  public static ADMIN_DATASET_EDIT_DROPDOWN_FORMATS_SCORM = { label: 'SCORM', value: '18' };
  public static ADMIN_DATASET_EDIT_DROPDOWN_FORMATS_SHP = { label: 'SHP', value: '19' };
  public static ADMIN_DATASET_EDIT_DROPDOWN_FORMATS_SIG = { label: 'SIG', value: '20' };
  public static ADMIN_DATASET_EDIT_DROPDOWN_FORMATS_TXT = { label: 'TXT', value: '21' };
  public static ADMIN_DATASET_EDIT_DROPDOWN_FORMATS_URL = { label: 'URL', value: '22' };
  public static ADMIN_DATASET_EDIT_DROPDOWN_FORMATS_XLS = { label: 'XLS', value: '23' };
  public static ADMIN_DATASET_EDIT_DROPDOWN_FORMATS_XLSX = { label: 'XLSX', value: '24' };
  public static ADMIN_DATASET_EDIT_DROPDOWN_FORMATS_XML = { label: 'XML', value: '25' };
  public static ADMIN_DATASET_EDIT_DROPDOWN_FORMATS_ZIP = { label: 'ZIP', value: '26' };
  
  
  public static ADMIN_DATASET_EDIT_DROPDOWN_ACCESS_MODES_CSV = { label: 'CSV', value: '1' };
  public static ADMIN_DATASET_EDIT_DROPDOWN_ACCESS_MODES_DGN = { label: 'DGN', value: '2' };
  public static ADMIN_DATASET_EDIT_DROPDOWN_ACCESS_MODES_DWG = { label: 'DWG', value: '3' };
  public static ADMIN_DATASET_EDIT_DROPDOWN_ACCESS_MODES_DXF = { label: 'DXF', value: '4' };
  public static ADMIN_DATASET_EDIT_DROPDOWN_ACCESS_MODES_ELP = { label: 'ELP', value: '5' };
  public static ADMIN_DATASET_EDIT_DROPDOWN_ACCESS_MODES_GEOJSON = { label: 'GEOJSON', value: '6' };
  public static ADMIN_DATASET_EDIT_DROPDOWN_ACCESS_MODES_GML = { label: 'GML', value: '7' };
  public static ADMIN_DATASET_EDIT_DROPDOWN_ACCESS_MODES_HTML = { label: 'HTML', value: '8' };
  public static ADMIN_DATASET_EDIT_DROPDOWN_ACCESS_MODES_ICS = { label: 'ICS', value: '9' };
  public static ADMIN_DATASET_EDIT_DROPDOWN_ACCESS_MODES_JPG = { label: 'JPG', value: '10' };
  public static ADMIN_DATASET_EDIT_DROPDOWN_ACCESS_MODES_JSON = { label: 'JSON', value: '11' };
  public static ADMIN_DATASET_EDIT_DROPDOWN_ACCESS_MODES_KMZ = { label: 'KMZ', value: '12' };
  public static ADMIN_DATASET_EDIT_DROPDOWN_ACCESS_MODES_ODS = { label: 'ODS', value: '13' };
  public static ADMIN_DATASET_EDIT_DROPDOWN_ACCESS_MODES_PNG = { label: 'PNG', value: '14' };
  public static ADMIN_DATASET_EDIT_DROPDOWN_ACCESS_MODES_PS = { label: 'PS', value: '15' };
  public static ADMIN_DATASET_EDIT_DROPDOWN_ACCESS_MODES_RDF = { label: 'RDF', value: '16' };
  public static ADMIN_DATASET_EDIT_DROPDOWN_ACCESS_MODES_RSS = { label: 'RSS', value: '17' };
  public static ADMIN_DATASET_EDIT_DROPDOWN_ACCESS_MODES_SCORM = { label: 'SCORM', value: '18' };
  public static ADMIN_DATASET_EDIT_DROPDOWN_ACCESS_MODES_SHP = { label: 'SHP', value: '19' };
  public static ADMIN_DATASET_EDIT_DROPDOWN_ACCESS_MODES_SIG = { label: 'SIG', value: '20' };
  public static ADMIN_DATASET_EDIT_DROPDOWN_ACCESS_MODES_TXT = { label: 'TXT', value: '21' };
  public static ADMIN_DATASET_EDIT_DROPDOWN_ACCESS_MODES_URL = { label: 'URL', value: '22' };
  public static ADMIN_DATASET_EDIT_DROPDOWN_ACCESS_MODES_XLS = { label: 'XLS', value: '23' };
  public static ADMIN_DATASET_EDIT_DROPDOWN_ACCESS_MODES_XLSX = { label: 'XLSX', value: '24' };
  public static ADMIN_DATASET_EDIT_DROPDOWN_ACCESS_MODES_XML = { label: 'XML', value: '25' };
  public static ADMIN_DATASET_EDIT_DROPDOWN_ACCESS_MODES_ZIP = { label: 'ZIP', value: '26' };

  public static ADMIN_DATASET_ERR_LOAD_DATASET = '200 - undefined';
  
  //ADMIN USER
  public static ADMIN_USER_ROL_GLOBAL_ADMIN = 'global_adm';
  public static ADMIN_USER_ROL_ORGANIZATION_ADMIN = 'org_adm';
  public static ADMIN_USER_ROL_ORGANIZATION_EDITOR = 'org_editor';
  public static ADMIN_USER_ROL_ORGANIZATION_MEMBER = 'org_member'; 

  //ADMIN ORGANIZATION
  public static GROWL_SEVERITY_SUCCESS = 'success';
  public static GROWL_SEVERITY_INFO = 'info';
  public static GROWL_SEVERITY_ERROR = 'error';
  public static GROWL_DELETE_ORGANIZATION_SUMMARY = 'Borrado de organización';
  public static GROWL_CREATE_ORGANIZATION_SUMMARY = 'Alta de organización';
  public static GROWL_UPDATE_ORGANIZATION_SUMMARY = 'Edición de organización';
  public static GROWL_CREATE_ORGANIZATION_SUCCESS_DETAIL = 'Organización insertada correctamente';
  public static GROWL_DELETE_ORGANIZATION_SUCCESS_DETAIL = 'Organización borrada correctamente';
  public static GROWL_ORGANIZATION_EMPTY_NAME_DETAIL = 'Nombre de organización vacío';
  public static CONFIRMDIALOG_HEADER = 'Confirmación';
  public static CONFIRMDIALOG_MESSAGE_START = '¿Estás seguro de que deseas borrar ';
  public static CONFIRMDIALOG_MESSAGE_END = '?';
  public static ERROR_ORGANIZATION_GET_ORGS_BY_USER = 'Error: getOrgsByUser() - organizations-list.component.ts';
  public static ERROR_ORGANIZATION_GET_EMAIL = 'Error: getEmail() - organizations-admin-edit.component.ts';
  public static ERROR_ORGANIZATION_GET_ORG = 'Error: loadOrganization() - organizations-admin-edit.component.ts';

  //ADMIN LOGIN
  public static LOGIN_DATA_PARAM_TYPE_ORGANIZATION = 'org';
  public static LOGIN_DATA_PARAM_TYPE_DATASET = 'dataset'; 


  //ROUTING
  public static ROUTER_LINK_DATA = 'datos';
  public static ROUTER_LINK_DATA_CATALOG_OLD = 'catalogo';
  public static ROUTER_LINK_DATA_CATALOG = 'datos/catalogo';
  public static ROUTER_LINK_DATA_CATALOG_TOPICS = 'datos/catalogo/temas';
  public static ROUTER_LINK_DATA_CATALOG_ORGANIZATIONS = 'datos/catalogo/publicadores';
  public static ROUTER_LINK_DATA_CATALOG_SEARCH = 'datos/catalogo/busqueda';
  public static ROUTER_LINK_DATA_CATALOG_TAGS = 'datos/catalogo/etiquetas';
  public static ROUTER_LINK_DATA_CATALOG_STATS = 'datos/catalogo/estadisticas';
  public static ROUTER_LINK_DATA_CATALOG_HOMER = 'datos/catalogo/homer';
  public static ROUTER_LINK_DATA_CATALOG_HOMER_DATASET = 'datos/catalogo/homer/dataset';
  public static ROUTER_LINK_DATA_CATALOG_DATASET = 'datos/catalogo/dataset';
  public static ROUTER_LINK_DATA_TOPICS = 'datos/temas';
  public static ROUTER_LINK_DATA_ORGANIZATIONS = 'datos/publicadores';
  public static ROUTER_LINK_INFORMATION = 'informacion';
  public static ROUTER_LINK_INFORMATION_OPEN_DATA = 'informacion/open-data';
  public static ROUTER_LINK_INFORMATION_TERMS = 'terminos';
  public static ROUTER_LINK_INFORMATION_APPS = 'informacion/aplicaciones';
  public static ROUTER_LINK_INFORMATION_EVENTS = 'informacion/eventos';
  public static ROUTER_LINK_INFORMATION_COLLABORATION = 'informacion/colabora';
  public static ROUTER_LINK_INFORMATION_CONOCIMIENTO = 'informacion/conocimiento';
  public static ROUTER_LINK_DATOS_ENLAZADOS = 'pool';
  public static ROUTER_LINK_TOOLS = 'herramientas';
  public static ROUTER_LINK_TOOLS_DEVELOPERS = 'herramientas/desarrolladores';
  public static ROUTER_LINK_TOOLS_CAMPUS = 'herramientas/campus';
  public static ROUTER_LINK_TOOLS_CAMPUS_CONTENT = 'herramientas/campus/content';
  public static ROUTER_LINK_TOOLS_APIS = 'herramientas/apis';
  public static ROUTER_LINK_TOOLS_SPARQL = 'sparql';
  public static ROUTER_LINK_TOOLS_SPARQL_CLIENT = 'herramientas/sparql/client';
  public static ROUTER_LINK_TOOLS_DEFAULT_SPARQL_CLIENT = 'portal/cliente-sparql';
  public static ROUTER_LINK_LOGIN = 'login';
  public static ROUTER_LINK_LOGIN_FORGOT_PASSWORD = 'login/forgot-password';
  public static ROUTER_LINK_LOGIN_RESTORE_PASSWORD = 'login/restore-password';
  public static ROUTER_LINK_ADMIN = 'admin';
  public static ROUTER_LINK_GLOBAL = 'global';
  public static ROUTER_LINK_ADMIN_GLOBAL = 'admin/global';
  public static ROUTER_LINK_DASHBOARD = 'dashboard';
  public static ROUTER_LINK_ADMIN_GLOBAL_DASHBOARD = 'admin/global/dashboard';
  public static ROUTER_LINK_USERS = 'users';
  public static ROUTER_LINK_ADMIN_GLOBAL_USERS = 'admin/global/users';
  public static ROUTER_LINK_ROLES = 'roles';
  public static ROUTER_LINK_ADMIN_GLOBAL_ROLES = 'admin/global/roles';
  public static ROUTER_LINK_CONTENT = 'content';
  public static ROUTER_LINK_ADMIN_GLOBAL_CONTENT = 'admin/global/content';
  public static ROUTER_LINK_INFO = 'info';
  public static ROUTER_LINK_ADMIN_GLOBAL_CONTENT_INFO = 'admin/global/info';
  public static ROUTER_LINK_APPS = 'apps';
  public static ROUTER_LINK_ADMIN_GLOBAL_CONTENT_APPS = 'admin/global/apps';
  public static ROUTER_LINK_EVENTS = 'events';
  public static ROUTER_LINK_ADMIN_GLOBAL_CONTENT_EVENTS = 'admin/global/events';
  public static ROUTER_LINK_COLLABORATION = 'collaboration';
  public static ROUTER_LINK_ADMIN_GLOBAL_CONTENT_COLLABORATION = 'admin/global/collaboration';
  public static ROUTER_LINK_DEVELOPERS = 'developers';
  public static ROUTER_LINK_ADMIN_GLOBAL_CONTENT_DEVELOPERS = 'admin/global/developers';
  public static ROUTER_LINK_APIS = 'apis';
  public static ROUTER_LINK_ADMIN_GLOBAL_CONTENT_APIS = 'admin/global/apis';
  public static ROUTER_LINK_SPARQL = 'sparql';
  public static ROUTER_LINK_ADMIN_GLOBAL_CONTENT_SPARQL = 'admin/global/sparql';
  public static ROUTER_LINK_DATACENTER = 'datacenter';
  public static ROUTER_LINK_ADMIN_DATACENTER = 'admin/datacenter';
  public static ROUTER_LINK_ADMIN_DATACENTER_DASHBOARD = 'admin/datacenter/dashboard';
  public static ROUTER_LINK_DATASETS = 'datasets';
  public static ROUTER_LINK_ADMIN_DATACENTER_DATASETS = 'admin/datacenter/datasets';
  public static ROUTER_LINK_DATASETS_LIST = 'list';
  public static ROUTER_LINK_ADMIN_DATACENTER_DATASETS_LIST = 'admin/datacenter/datasets/list';
  public static ROUTER_LINK_DATASETS_SHOW = 'show';
  public static ROUTER_LINK_ADMIN_DATACENTER_DATASETS_SHOW = 'admin/datacenter/datasets/show';
  public static ROUTER_LINK_DATASETS_EDIT = 'edit';
  public static ROUTER_LINK_ADMIN_DATACENTER_DATASETS_EDIT = 'admin/datacenter/datasets/edit';
  public static ROUTER_LINK_ORGANIZATIONS = 'organizations';
  public static ROUTER_LINK_ADMIN_DATACENTER_ORGANIZATIONS = 'admin/datacenter/organizations';
  public static ROUTER_LINK_ORGANIZATIONS_LIST = 'list';
  public static ROUTER_LINK_ADMIN_DATACENTER_ORGANIZATIONS_LIST = 'admin/datacenter/organizations/list';
  public static ROUTER_LINK_ORGANIZATIONS_SHOW = 'show';
  public static ROUTER_LINK_ADMIN_DATACENTER_ORGANIZATIONS_SHOW = 'admin/datacenter/organizations/show';
  public static ROUTER_LINK_ORGANIZATIONS_EDIT = 'edit';
  public static ROUTER_LINK_ADMIN_DATACENTER_ORGANIZATIONS_EDIT = 'admin/datacenter/organizations/edit';
  public static ROUTER_LINK_CAMPUS = 'campus';
  public static ROUTER_LINK_ADMIN_DATACENTER_CAMPUS = 'admin/campus';
  public static ROUTER_LINK_LOGSTASH = 'logstash';
  public static ROUTER_LINK_ADMIN_LOGSTASH = 'admin/logstash';
  public static ROUTER_LINK_404 = 'pagenotfound';
  public static ROUTER_LINK_SERVICES_ARAGOPEDIA = 'servicios/aragopedia';
  public static ROUTER_LINK_SERVICES_PRESUPUESTOS = 'servicios/presupuestos';
  public static ROUTER_LINK_SERVICES_CRAS = 'servicios/cras';
  public static ROUTER_LINK_SERVICES_SOCIAL_DATA = 'servicios/open-social-data';
  public static ROUTER_LINK_SERVICES_ANALYTICS = 'servicios/analytics';
  public static ROUTER_LINK_SERVICES_VISUAL_DATA = 'servicios/visualdata';
  public static ROUTER_LINK_SERVICES_FOCUS = '/servicios/focus';
  public static ROUTER_LINK_DATA_PARAM_DATASET_NAME = 'datasetName';
  public static ROUTER_LINK_DATA_PARAM_DATASET_HOMER_NAME = 'datasetHomerName';
  public static ROUTER_LINK_DATA_PARAM_TOPIC_NAME = 'topicName';
  public static ROUTER_LINK_DATA_PARAM_ORGANIZATION_NAME = 'organizationName';
  public static ROUTER_LINK_DATA_PARAM_TEXT = 'texto';
  public static ROUTER_LINK_DATA_PARAM_TYPE = 'tipo';
  public static ROUTER_LINK_DATA_PARAM_TAG = 'etq';
  public static ROUTER_LINK_DATA_PARAM_STATS_GROUP = 'group';
  public static ROUTER_LINK_DATA_PARAM_LANG = 'lang';
  public static ROUTER_LINK_DATA_PARAM_TEXT_HOMER = 'text';
  public static ROUTER_LINK_DATA_CAMPUS_PARAM_TYPE = 'type';
  public static ROUTER_LINK_DATA_CAMPUS_PARAM_TEXT = 'text';
  public static ROUTER_LINK_TOOLS_CAMPUS_EVENT_NAME = 'eventName';
  public static ROUTER_LINK_DATA_PARAM_DATA_LOGIN = 'data';
  public static ROUTER_LINK_DATA_PARAM_EDIT_DATA = 'dataName'; 
  public static ROUTER_LINK_STATIC_CONTENT_OPEN_DATA_SECTION_REDIRECT = '/informacion/open-data#';
  public static ROUTER_LINK_STATIC_CONTENT_EVENTS_SECTION_REDIRECT = '/informacion/eventos#';
  public static ROUTER_LINK_STATIC_CONTENT_DEVELOPERS_SECTION_REDIRECT = '/herramientas/desarrolladores#';
  public static ROUTER_LINK_STATIC_CONTENT_APIS_SECTION_REDIRECT = '/herramientas/apis#';
  public static ROUTER_LINK_STATIC_CONTENT_SPARQL_SECTION_REDIRECT = '/herramientas/sparql#';

  //SERVER API URLS
  public static SERVER_API_LINK_AUTHENTICATE = '/authenticate';
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
  public static SERVER_API_LINK_TOPICS = '/topics';
  public static SERVER_API_LINK_TAGS = '/tags';
  public static SERVER_API_LINK_ORGANIZATIONS = '/organizations';
  public static SERVER_API_LINK_ORGANIZATION = '/organization'; 
  public static SERVER_API_LINK_STATIC_CONTENT_INFO = '/static-content/info';
  public static SERVER_API_LINK_STATIC_CONTENT_INFO_OPEN_DATA = '/open-data';
  public static SERVER_API_LINK_STATIC_CONTENT_INFO_APPLICATIONS = '/applications';
  public static SERVER_API_LINK_STATIC_CONTENT_INFO_EVENTS = '/events';
  public static SERVER_API_LINK_STATIC_CONTENT_TOOLS = '/static-content/tools';
  public static SERVER_API_LINK_STATIC_CONTENT_TOOLS_DEVELOPERS = '/developers';
  public static SERVER_API_LINK_STATIC_CONTENT_TOOLS_APIS = '/apis';
  public static SERVER_API_LINK_STATIC_CONTENT_TOOLS_SPARQL = '/sparql';
  public static SERVER_API_LINK_STATIC_CONTENT_TOOLS_SPARQL_CLIENT = '/sparql-client';
  public static SERVER_API_LINK_STATIC_CONTENT_TOOLS_SPARQL_GRAPHS = '/sparql-client/graphs';
  public static SERVER_API_LINK_CAMPUS = '/campus';
  public static SERVER_API_LINK_CAMPUS_EVENTS = '/campus/events';
  public static SERVER_API_LINK_CAMPUS_EVENT = '/campus/event';
  public static SERVER_API_LINK_CAMPUS_CONTENTS = '/campus/contents';
  public static SERVER_API_URL_CAMPUS_CONTENT= '/campus/content';
  public static SERVER_API_LINK_CAMPUS_TYPES = '/campus/types';
  public static SERVER_API_LINK_CAMPUS_SPEAKERS = '/campus/speakers';
  public static SERVER_API_LINK_CAMPUS_TOPICS = '/campus/topics';
  public static SERVER_API_LINK_WEB_ANALYTICS = '/analytics/files';
  public static SERVER_API_LINK_ADMIN_USERS = '/users';
  public static SERVER_API_LINK_ADMIN_ROLES_LIST = '/roles';
  public static SERVER_API_LINK_ADMIN_GET_ROLE = '/role';
  public static SERVER_API_LINK_ADMIN_LOGSTASH_FILES = '/logstash/files';
  public static SERVER_API_LINK_ADMIN_LOGSTASH_INSERT = '/logstash/insert';
  public static SERVER_API_LINK_ADMIN_LOGSTASH_DELETE = '/logstash/delete';
  public static SERVER_API_LINK_ADMIN_LOGSTASH_RELOAD = '/logstash/reload';
  public static SERVER_API_LINK_ADMIN_USER_CUD_OPERATIONS = '/users';
  public static SERVER_API_LINK_ADMIN_USER_ORGANIZATIONS = '/organizations';
  public static SERVER_API_LINK_ADMIN_ORGANIZATION_CUD_OPERATIONS = '/organization';
  public static SERVER_API_LINK_ADMIN_DATASET_CUD_OPERATIONS = '/dataset';
  public static SERVER_API_LINK_ADMIN_DATASET_CUD_OPERATIONS_UPDATE = '/dataset_update';
  public static SERVER_API_LINK_ADMIN_RESOURCE_CUD_OPERATIONS = '/resource';
  public static SERVER_API_LINK_GA_OD_CORE = '/core';
  public static SERVER_API_LINK_GA_OD_CORE_VIEWS = '/views';
  public static SERVER_API_LINK_PARAM_SORT = 'sort';
  public static SERVER_API_LINK_PARAM_PAGE = 'page';
  public static SERVER_API_LINK_PARAM_ROWS = 'rows';
  public static SERVER_API_LINK_PARAM_TYPE = 'type';
  public static SERVER_API_LINK_PARAM_TAGS = 'tags';
  public static SERVER_API_LINK_PARAM_TEXT = 'text';
  public static SERVER_API_LINK_PARAM_LANG = 'lang';
  public static SERVER_API_LINK_PARAM_LIMIT = 'limit';
  public static SERVER_API_LINK_PARAM_ORGS = 'orgs';
  public static SERVER_API_LINK_PARAM_RESOURCE_ID = 'resId';
  public static SERVER_API_LINK_PARAM_SORT_DEFAULT_VALUE = 'relevance,-metadata_modified';
  public static SERVER_API_LINK_PARAM_SORT_HOMER_DEFAULT_VALUE = 'title';
  public static SERVER_API_LINK_PARAM_SORT_TITLE_STRING = 'title_string';
  public static SERVER_API_LINK_PARAM_SORT_VIEWS_TOTAL = 'views_total';
  public static SERVER_API_LINK_PARAM_SORT_METADATA_MODIFIED = 'metadata_modified';
  public static SERVER_API_LINK_PARAM_SORT_HOMER_NAME = 'title';
  public static SERVER_API_LINK_PARAM_SORT_HOMER_PORTAL = 'portal';
  public static SERVER_API_LINK_PARAM_SORT_HOMER_LANGUAGE = 'language';

  public static SERVER_API_LINK_SPARQL_CLIENT_PARAM_GRAPH = 'graph';
  public static SERVER_API_LINK_SPARQL_CLIENT_PARAM_QUERY = 'query';
  public static SERVER_API_LINK_SPARQL_CLIENT_PARAM_FORMAT = 'format';
  public static SERVER_API_LINK_SPARQL_CLIENT_PARAM_TIMEOUT = 'timeout';
  public static SERVER_API_LINK_SPARQL_CLIENT_PARAM_DEBUG = 'debug';

  public static SPARQL_CLIENT_DEFAULT_GRAPH = 'http://opendata.aragon.es/graph/Aragopedia/latest';
  public static SPARQL_CLIENT_DEFAULT_QUERY = 'select distinct ?Concept where {[] a ?Concept} LIMIT 100';
  public static SPARQL_CLIENT_DEFAULT_FORMAT = 'text/html';
  public static SPARQL_CLIENT_DEFAULT_TIMEOUT = 0;
  public static SPARQL_CLIENT_DEFAULT_DEBUG = true;

  public static SPARQL_CLIENT_FORMAT_OPTIONS_AUTO = 'auto';
  public static SPARQL_CLIENT_FORMAT_OPTIONS_HTML = 'text/html';
  public static SPARQL_CLIENT_FORMAT_OPTIONS_EXCEL = 'application/vnd.ms-excel';
  public static SPARQL_CLIENT_FORMAT_OPTIONS_XML = 'application/sparql-results+xml';
  public static SPARQL_CLIENT_FORMAT_OPTIONS_JSON = 'application/sparql-results+json';
  public static SPARQL_CLIENT_FORMAT_OPTIONS_JAVASCRIPT = 'application/javascript';
  public static SPARQL_CLIENT_FORMAT_OPTIONS_PLAIN_TEXT = 'text/plain';
  public static SPARQL_CLIENT_FORMAT_OPTIONS_RDF_XML = 'application/rdf+xml';
  public static SPARQL_CLIENT_FORMAT_OPTIONS_CSV = 'text/csv';

  public static SPARQL_CLIENT_FILE_NAME = 'Sparql';
  public static SPARQL_CLIENT_FORMAT_FILE_EXTENSION_XML = '.xml';
  public static SPARQL_CLIENT_FORMAT_FILE_EXTENSION_XLS = '.xls';
  public static SPARQL_CLIENT_FORMAT_FILE_EXTENSION_SRX = '.srx';
  public static SPARQL_CLIENT_FORMAT_FILE_EXTENSION_JSON = '.json';
  public static SPARQL_CLIENT_FORMAT_FILE_EXTENSION_JS = '.js';
  public static SPARQL_CLIENT_FORMAT_FILE_EXTENSION_TXT = '.txt';
  public static SPARQL_CLIENT_FORMAT_FILE_EXTENSION_RDF = '.rdf';
  public static SPARQL_CLIENT_FORMAT_FILE_EXTENSION_CSV = '.csv';

  public static KIBANA_URL = Constants.AOD_BASE_URL + "/elastic/app/kibana#/dashboard/e6433860-d68c-11e7-a49d-f956d0989e2c";
  public static KIBANA_URL_SEVEN = Constants.AOD_BASE_URL + "/elastic/app/kibana#/dashboard/6b50d7f0-e589-11e7-bac3-69701294f3ab";

  public static ELASTIC_BROWSERS = Constants.AOD_BASE_URL + "/gapi/get_browsers_elastic";
  public static ELASTIC_FILES = Constants.AOD_BASE_URL + "/gapi/get_files_elastic";
  public static ELASTIC_PAGES = Constants.AOD_BASE_URL + "/gapi/get_pages_elastic";
  public static ELASTIC_COUNTRIES = Constants.AOD_BASE_URL + "/gapi/get_countries_elastic";




  public static SERVER_API_LINK_GA_OD_CORE_PUBLIC = '/GA_OD_Core';
  public static SERVER_API_LINK_GA_OD_CORE_PUBLIC_VIEWS = '/views';
  public static SERVER_API_LINK_GA_OD_CORE_PUBLIC_PREVIEW = '/preview';
  public static SERVER_API_LINK_GA_OD_CORE_PUBLIC_NAME_CATEGORIES='NOMBRE'
  public static SERVER_API_LINK_GA_OD_CORE_PUBLIC_VIEW_ID = 'view_id';
  public static SERVER_API_LINK_GA_OD_CORE_PUBLIC_VIEW_ID_NUMBER_TOPICS = '161';
  public static SERVER_API_LINK_GA_OD_CORE_PUBLIC_FILTER_SQL = 'filter_sql';
  public static SERVER_API_LINK_GA_OD_CORE_PUBLIC_SQL_NIVEL_1 = 'NIVEL=1';




  public static ROUTER_LINK_ADD_HISTORY='/add/history';
  public static ROUTER_LINK_EDIT_HISTORY='/editHistory';
  public static ROUTER_LINK_PREVIEW_HISTORY='previewHistory';


  public static ROUTER_LINK_ADD_CONTENT='add/content';
  public static ROUTER_LINK_VIEW_HISTORY='/history';

  public static LOCALSTORAGE_KEY_MAIL='email';
  public static LOCALSTORAGE_KEY_HISTORY='previewHistoryLS';
  public static ROUTER_LINK_SERVICES_ADMIN='/services/admin';
  public static ROUTER_LINK_FOCUS='/focus';
  public static ROUTER_LINK_ENTIRE_HISTORY='/history';
  public static ROUTER_LINK_ENTIRE_HISTORY_BY_URL='/history/url';
  public static ROUTER_LINK_ENTIRE_HISTORY_AND_EMAIL='/history/mail';
  public static ROUTER_LINK_ENTIRE_HISTORY_BY_TOKEN='/history/token';
  public static ROUTER_LINK_ALL_HISTORIES='/histories';
  public static ROUTER_LINK_TOKEN_STATE='/token/state';
  public static ROUTER_LINK_IMAGE_CATEGORY='/imageCategory';




  public static PREVIEW_HISTORY="PREVIEW"
  public static SAVE_HISTORY="SAVE"
  public static UPDATE_HISTORY="UPDATE"
  public static POST_HISTORY_ADMIN="UPDATE_ADMIN"


  public static ALIGN_LEFT_TEXT="Descripción a la derecha, fuente de datos a la izquierda"
  public static ALIGN_LEFT = new AlignsType(Constants.ALIGN_LEFT_TEXT, Aligns.left)
  public static ALIGN_RIGHT_TEXT="Descripción a la izquierda, fuente de datos a la derecha"
  public static ALIGN_RIGHT = new AlignsType(Constants.ALIGN_RIGHT_TEXT, Aligns.right)
  public static ALIGNS_TYPES =[Constants.ALIGN_LEFT, Constants.ALIGN_RIGHT]

  public static CONTENT_GRAPH_TEXT="Gráficos con datos de Aragón Open Data"
  public static CONTENT_GRAPH = new ContentsType(Constants.CONTENT_GRAPH_TEXT, Contents.graph)
  public static CONTENT_YOUTUBE_TEXT="Vídeo de YouTube"
  public static CONTENT_YOUTUBE = new ContentsType(Constants.CONTENT_YOUTUBE_TEXT, Contents.youtube)
  public static CONTENT_SHARESLIDES_TEXT="Presentación de Slideshare"
  public static CONTENT_SHARESLIDES = new ContentsType(Constants.CONTENT_SHARESLIDES_TEXT, Contents.shareSlides)
  public static CONTENT_URL_IMG_TEXT="Imagen desde URL"
  public static CONTENT_URL_IMG = new ContentsType(Constants.CONTENT_URL_IMG_TEXT, Contents.img)
  public static CONTENTS_TYPES =[Constants.CONTENT_GRAPH, Constants.CONTENT_YOUTUBE, Constants.CONTENT_SHARESLIDES,Constants.CONTENT_URL_IMG]

  public static API_SLIDESHARE_CONVERT_URL_TO_EMBED = "https://www.slideshare.net/api/oembed/2"

  public static INFO_TITLE_OBJECT_FAILURE = "Se ha producido un error"
  public static INFO_BODY_HSITORY_FAILURE = "Se ha producido un error al cargar la historia, vuelva a intentarlo y si el error persiste contacte con el administrador."



}

