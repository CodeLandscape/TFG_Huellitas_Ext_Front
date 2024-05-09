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
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
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
                                            'data-bs-target="#components-links-module-AppModule-466955709fa2fb044b7e66e2ebdb2210d631f7fd9d5c57db126a4c99f396afe317656651ffa2028714aef963ba2f315094cd1ba8dc728c8e0e203350b9ad444a"' : 'data-bs-target="#xs-components-links-module-AppModule-466955709fa2fb044b7e66e2ebdb2210d631f7fd9d5c57db126a4c99f396afe317656651ffa2028714aef963ba2f315094cd1ba8dc728c8e0e203350b9ad444a"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-466955709fa2fb044b7e66e2ebdb2210d631f7fd9d5c57db126a4c99f396afe317656651ffa2028714aef963ba2f315094cd1ba8dc728c8e0e203350b9ad444a"' :
                                            'id="xs-components-links-module-AppModule-466955709fa2fb044b7e66e2ebdb2210d631f7fd9d5c57db126a4c99f396afe317656651ffa2028714aef963ba2f315094cd1ba8dc728c8e0e203350b9ad444a"' }>
                                            <li class="link">
                                                <a href="components/AnimalComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AnimalComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AppComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FormCrearAnimalComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FormCrearAnimalComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FormEditarAnimalComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FormEditarAnimalComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FormPerfilAsociacionComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FormPerfilAsociacionComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/FormPerfilPersonaComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >FormPerfilPersonaComponent</a>
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
                                                <a href="components/TipoAnimalComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TipoAnimalComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                        'data-bs-target="#injectables-links-module-AppModule-466955709fa2fb044b7e66e2ebdb2210d631f7fd9d5c57db126a4c99f396afe317656651ffa2028714aef963ba2f315094cd1ba8dc728c8e0e203350b9ad444a"' : 'data-bs-target="#xs-injectables-links-module-AppModule-466955709fa2fb044b7e66e2ebdb2210d631f7fd9d5c57db126a4c99f396afe317656651ffa2028714aef963ba2f315094cd1ba8dc728c8e0e203350b9ad444a"' }>
                                        <span class="icon ion-md-arrow-round-down"></span>
                                        <span>Injectables</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="injectables-links-module-AppModule-466955709fa2fb044b7e66e2ebdb2210d631f7fd9d5c57db126a4c99f396afe317656651ffa2028714aef963ba2f315094cd1ba8dc728c8e0e203350b9ad444a"' :
                                        'id="xs-injectables-links-module-AppModule-466955709fa2fb044b7e66e2ebdb2210d631f7fd9d5c57db126a4c99f396afe317656651ffa2028714aef963ba2f315094cd1ba8dc728c8e0e203350b9ad444a"' }>
                                        <li class="link">
                                            <a href="injectables/ConfigService.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ConfigService</a>
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
                                <a href="classes/Asociacion.html" data-type="entity-link" >Asociacion</a>
                            </li>
                            <li class="link">
                                <a href="classes/imagenAnimal.html" data-type="entity-link" >imagenAnimal</a>
                            </li>
                            <li class="link">
                                <a href="classes/Page.html" data-type="entity-link" >Page</a>
                            </li>
                            <li class="link">
                                <a href="classes/Persona.html" data-type="entity-link" >Persona</a>
                            </li>
                            <li class="link">
                                <a href="classes/Provincia.html" data-type="entity-link" >Provincia</a>
                            </li>
                            <li class="link">
                                <a href="classes/Raza.html" data-type="entity-link" >Raza</a>
                            </li>
                            <li class="link">
                                <a href="classes/Rol.html" data-type="entity-link" >Rol</a>
                            </li>
                            <li class="link">
                                <a href="classes/TipoAnimal.html" data-type="entity-link" >TipoAnimal</a>
                            </li>
                            <li class="link">
                                <a href="classes/Usuario.html" data-type="entity-link" >Usuario</a>
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
                                    <a href="injectables/AnimalService.html" data-type="entity-link" >AnimalService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AsociacionService.html" data-type="entity-link" >AsociacionService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/AuthService.html" data-type="entity-link" >AuthService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/ConfigService.html" data-type="entity-link" >ConfigService</a>
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
                                    <a href="injectables/UsuariosServicesService.html" data-type="entity-link" >UsuariosServicesService</a>
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