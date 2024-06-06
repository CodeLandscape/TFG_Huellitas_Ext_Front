'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">huellitas-extremenas documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-AppModule-e8b6c50f9bc5062210b27e8ad585f0b07eefa469beaa2da3a16251379cc670a42a021f3ff4b64c7473b13574d91a7cc3a4d824dfe0c8e6c94b793c2efb34940b"' : 'data-bs-target="#xs-components-links-module-AppModule-e8b6c50f9bc5062210b27e8ad585f0b07eefa469beaa2da3a16251379cc670a42a021f3ff4b64c7473b13574d91a7cc3a4d824dfe0c8e6c94b793c2efb34940b"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-e8b6c50f9bc5062210b27e8ad585f0b07eefa469beaa2da3a16251379cc670a42a021f3ff4b64c7473b13574d91a7cc3a4d824dfe0c8e6c94b793c2efb34940b"' :
                                            'id="xs-components-links-module-AppModule-e8b6c50f9bc5062210b27e8ad585f0b07eefa469beaa2da3a16251379cc670a42a021f3ff4b64c7473b13574d91a7cc3a4d824dfe0c8e6c94b793c2efb34940b"' }>
                                            <li class="link">
                                                <a href="components/AnimalComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AnimalComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AnimalesAsociacionComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AnimalesAsociacionComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AppComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ArchivosAsociacionComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ArchivosAsociacionComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/CookiesComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >CookiesComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/DocumentosAnimalComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >DocumentosAnimalComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/Error404Component.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >Error404Component</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FooterComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FooterComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FormCrearAnimalComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FormCrearAnimalComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FormEditarAnimalComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FormEditarAnimalComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FormEditarArchivoAsocComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FormEditarArchivoAsocComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FormEditarDocumentoAnimalComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FormEditarDocumentoAnimalComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FormPerfilAsociacionComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FormPerfilAsociacionComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FormPerfilPersonaComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FormPerfilPersonaComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FormSubirArchivoAsocComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FormSubirArchivoAsocComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FormSubirDocumentoAnimalComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FormSubirDocumentoAnimalComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LandingPageComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LandingPageComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ListAssociationsComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ListAssociationsComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LoginComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LoginComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NavbarComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NavbarComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PaginacionComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PaginacionComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PerfilAnimalComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PerfilAnimalComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/PerfilComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >PerfilComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/RazaComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RazaComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/RegisterAssociationComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RegisterAssociationComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/RegisterUserComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RegisterUserComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SolicitudesAdminComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SolicitudesAdminComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SolicitudesAnimalComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SolicitudesAnimalComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SolicitudesAsociacionComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SolicitudesAsociacionComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SolicitudesUsuarioComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SolicitudesUsuarioComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TipoAnimalComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TipoAnimalComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AppModule-e8b6c50f9bc5062210b27e8ad585f0b07eefa469beaa2da3a16251379cc670a42a021f3ff4b64c7473b13574d91a7cc3a4d824dfe0c8e6c94b793c2efb34940b"' : 'data-bs-target="#xs-injectables-links-module-AppModule-e8b6c50f9bc5062210b27e8ad585f0b07eefa469beaa2da3a16251379cc670a42a021f3ff4b64c7473b13574d91a7cc3a4d824dfe0c8e6c94b793c2efb34940b"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-e8b6c50f9bc5062210b27e8ad585f0b07eefa469beaa2da3a16251379cc670a42a021f3ff4b64c7473b13574d91a7cc3a4d824dfe0c8e6c94b793c2efb34940b"' :
                                        'id="xs-injectables-links-module-AppModule-e8b6c50f9bc5062210b27e8ad585f0b07eefa469beaa2da3a16251379cc670a42a021f3ff4b64c7473b13574d91a7cc3a4d824dfe0c8e6c94b793c2efb34940b"' }>
                                        <li class="link">
                                            <a href="injectables/AuthTokenService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AuthTokenService</a>
                                        </li>
                                        <li class="link">
                                            <a href="injectables/ComunService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ComunService</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link" >AppRoutingModule</a>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/Animal.html" data-type="entity-link" >Animal</a>
                            </li>
                            <li class="link">
                                <a href="classes/Animal-1.html" data-type="entity-link" >Animal</a>
                            </li>
                            <li class="link">
                                <a href="classes/AnimalPersona.html" data-type="entity-link" >AnimalPersona</a>
                            </li>
                            <li class="link">
                                <a href="classes/ArchivoAnimal.html" data-type="entity-link" >ArchivoAnimal</a>
                            </li>
                            <li class="link">
                                <a href="classes/ArchivoAsociacion.html" data-type="entity-link" >ArchivoAsociacion</a>
                            </li>
                            <li class="link">
                                <a href="classes/Asociacion.html" data-type="entity-link" >Asociacion</a>
                            </li>
                            <li class="link">
                                <a href="classes/Asociacion-1.html" data-type="entity-link" >Asociacion</a>
                            </li>
                            <li class="link">
                                <a href="classes/Id.html" data-type="entity-link" >Id</a>
                            </li>
                            <li class="link">
                                <a href="classes/imagenAnimal.html" data-type="entity-link" >imagenAnimal</a>
                            </li>
                            <li class="link">
                                <a href="classes/JwtDTO.html" data-type="entity-link" >JwtDTO</a>
                            </li>
                            <li class="link">
                                <a href="classes/Load.html" data-type="entity-link" >Load</a>
                            </li>
                            <li class="link">
                                <a href="classes/LoginUsuario.html" data-type="entity-link" >LoginUsuario</a>
                            </li>
                            <li class="link">
                                <a href="classes/Page.html" data-type="entity-link" >Page</a>
                            </li>
                            <li class="link">
                                <a href="classes/Persona.html" data-type="entity-link" >Persona</a>
                            </li>
                            <li class="link">
                                <a href="classes/Persona-1.html" data-type="entity-link" >Persona</a>
                            </li>
                            <li class="link">
                                <a href="classes/Provincia.html" data-type="entity-link" >Provincia</a>
                            </li>
                            <li class="link">
                                <a href="classes/Provincia-1.html" data-type="entity-link" >Provincia</a>
                            </li>
                            <li class="link">
                                <a href="classes/Raza.html" data-type="entity-link" >Raza</a>
                            </li>
                            <li class="link">
                                <a href="classes/Raza-1.html" data-type="entity-link" >Raza</a>
                            </li>
                            <li class="link">
                                <a href="classes/Rol.html" data-type="entity-link" >Rol</a>
                            </li>
                            <li class="link">
                                <a href="classes/Rol-1.html" data-type="entity-link" >Rol</a>
                            </li>
                            <li class="link">
                                <a href="classes/TipoAnimal.html" data-type="entity-link" >TipoAnimal</a>
                            </li>
                            <li class="link">
                                <a href="classes/Usuario.html" data-type="entity-link" >Usuario</a>
                            </li>
                            <li class="link">
                                <a href="classes/Usuario-1.html" data-type="entity-link" >Usuario</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/AnimalPersonaServiceService.html" data-type="entity-link" >AnimalPersonaServiceService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AnimalService.html" data-type="entity-link" >AnimalService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ArchivosAnimalService.html" data-type="entity-link" >ArchivosAnimalService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ArchivosAsociacionService.html" data-type="entity-link" >ArchivosAsociacionService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AsociacionService.html" data-type="entity-link" >AsociacionService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AuthService.html" data-type="entity-link" >AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AuthTokenService.html" data-type="entity-link" >AuthTokenService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ComunService.html" data-type="entity-link" >ComunService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/NavbarService.html" data-type="entity-link" >NavbarService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/PersonaService.html" data-type="entity-link" >PersonaService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ProvinciaService.html" data-type="entity-link" >ProvinciaService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/RazaService.html" data-type="entity-link" >RazaService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TipoAnimalServiceService.html" data-type="entity-link" >TipoAnimalServiceService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TipoService.html" data-type="entity-link" >TipoService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TokenService.html" data-type="entity-link" >TokenService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UsuariosServicesService.html" data-type="entity-link" >UsuariosServicesService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interceptors-links"' :
                            'data-bs-target="#xs-interceptors-links"' }>
                            <span class="icon ion-ios-swap"></span>
                            <span>Interceptors</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="interceptors-links"' : 'id="xs-interceptors-links"' }>
                            <li class="link">
                                <a href="interceptors/ProdInterceptorService.html" data-type="entity-link" >ProdInterceptorService</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#guards-links"' :
                            'data-bs-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/AuthGuard.html" data-type="entity-link" >AuthGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/NoAdminGuard.html" data-type="entity-link" >NoAdminGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/NoAsociacionGuard.html" data-type="entity-link" >NoAsociacionGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/NoAuthGuard.html" data-type="entity-link" >NoAuthGuard</a>
                            </li>
                            <li class="link">
                                <a href="guards/NoUsuarioGuard.html" data-type="entity-link" >NoUsuarioGuard</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interfaces-links"' :
                            'data-bs-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/Asociacion.html" data-type="entity-link" >Asociacion</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/AssociationRegister.html" data-type="entity-link" >AssociationRegister</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Provincia.html" data-type="entity-link" >Provincia</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Rol.html" data-type="entity-link" >Rol</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UserRegister.html" data-type="entity-link" >UserRegister</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Usuario.html" data-type="entity-link" >Usuario</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});