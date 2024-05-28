'use strict';

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _wrapNativeSuper(t) { var r = "function" == typeof Map ? new Map() : void 0; return _wrapNativeSuper = function _wrapNativeSuper(t) { if (null === t || !_isNativeFunction(t)) return t; if ("function" != typeof t) throw new TypeError("Super expression must either be null or a function"); if (void 0 !== r) { if (r.has(t)) return r.get(t); r.set(t, Wrapper); } function Wrapper() { return _construct(t, arguments, _getPrototypeOf(this).constructor); } return Wrapper.prototype = Object.create(t.prototype, { constructor: { value: Wrapper, enumerable: !1, writable: !0, configurable: !0 } }), _setPrototypeOf(Wrapper, t); }, _wrapNativeSuper(t); }
function _construct(t, e, r) { if (_isNativeReflectConstruct()) return Reflect.construct.apply(null, arguments); var o = [null]; o.push.apply(o, e); var p = new (t.bind.apply(t, o))(); return r && _setPrototypeOf(p, r.prototype), p; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _isNativeFunction(t) { try { return -1 !== Function.toString.call(t).indexOf("[native code]"); } catch (n) { return "function" == typeof t; } }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
customElements.define('compodoc-menu', /*#__PURE__*/function (_HTMLElement) {
  function _class() {
    var _this;
    _classCallCheck(this, _class);
    _this = _callSuper(this, _class);
    _this.isNormalMode = _this.getAttribute('mode') === 'normal';
    return _this;
  }
  _inherits(_class, _HTMLElement);
  return _createClass(_class, [{
    key: "connectedCallback",
    value: function connectedCallback() {
      this.render(this.isNormalMode);
    }
  }, {
    key: "render",
    value: function render(isNormalMode) {
      var tp = lithtml.html("\n        <nav>\n            <ul class=\"list\">\n                <li class=\"title\">\n                    <a href=\"index.html\" data-type=\"index-link\">huellitas-extremenas documentation</a>\n                </li>\n\n                <li class=\"divider\"></li>\n                ".concat(isNormalMode ? "<div id=\"book-search-input\" role=\"search\"><input type=\"text\" placeholder=\"Type to search\"></div>" : '', "\n                <li class=\"chapter\">\n                    <a data-type=\"chapter-link\" href=\"index.html\"><span class=\"icon ion-ios-home\"></span>Getting started</a>\n                    <ul class=\"links\">\n                        <li class=\"link\">\n                            <a href=\"index.html\" data-type=\"chapter-link\">\n                                <span class=\"icon ion-ios-keypad\"></span>Overview\n                            </a>\n                        </li>\n                                <li class=\"link\">\n                                    <a href=\"dependencies.html\" data-type=\"chapter-link\">\n                                        <span class=\"icon ion-ios-list\"></span>Dependencies\n                                    </a>\n                                </li>\n                                <li class=\"link\">\n                                    <a href=\"properties.html\" data-type=\"chapter-link\">\n                                        <span class=\"icon ion-ios-apps\"></span>Properties\n                                    </a>\n                                </li>\n                    </ul>\n                </li>\n                    <li class=\"chapter modules\">\n                        <a data-type=\"chapter-link\" href=\"modules.html\">\n                            <div class=\"menu-toggler linked\" data-bs-toggle=\"collapse\" ").concat(isNormalMode ? 'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"', ">\n                                <span class=\"icon ion-ios-archive\"></span>\n                                <span class=\"link-name\">Modules</span>\n                                <span class=\"icon ion-ios-arrow-down\"></span>\n                            </div>\n                        </a>\n                        <ul class=\"links collapse \" ").concat(isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"', ">\n                            <li class=\"link\">\n                                <a href=\"modules/AppModule.html\" data-type=\"entity-link\" >AppModule</a>\n                                    <li class=\"chapter inner\">\n                                        <div class=\"simple menu-toggler\" data-bs-toggle=\"collapse\" ").concat(isNormalMode ? 'data-bs-target="#components-links-module-AppModule-e1366c18d8bd9d0b5472cf126671f09818179bf2ca260f7c0b0dbe2fdc27cadeadaa1b993262201f7835e622c4303a3e8465e0da9970b24fb7963bd72845f1b7"' : 'data-bs-target="#xs-components-links-module-AppModule-e1366c18d8bd9d0b5472cf126671f09818179bf2ca260f7c0b0dbe2fdc27cadeadaa1b993262201f7835e622c4303a3e8465e0da9970b24fb7963bd72845f1b7"', ">\n                                            <span class=\"icon ion-md-cog\"></span>\n                                            <span>Components</span>\n                                            <span class=\"icon ion-ios-arrow-down\"></span>\n                                        </div>\n                                        <ul class=\"links collapse\" ").concat(isNormalMode ? 'id="components-links-module-AppModule-e1366c18d8bd9d0b5472cf126671f09818179bf2ca260f7c0b0dbe2fdc27cadeadaa1b993262201f7835e622c4303a3e8465e0da9970b24fb7963bd72845f1b7"' : 'id="xs-components-links-module-AppModule-e1366c18d8bd9d0b5472cf126671f09818179bf2ca260f7c0b0dbe2fdc27cadeadaa1b993262201f7835e622c4303a3e8465e0da9970b24fb7963bd72845f1b7"', ">\n                                            <li class=\"link\">\n                                                <a href=\"components/AnimalComponent.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >AnimalComponent</a>\n                                            </li>\n                                            <li class=\"link\">\n                                                <a href=\"components/AnimalesAsociacionComponent.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >AnimalesAsociacionComponent</a>\n                                            </li>\n                                            <li class=\"link\">\n                                                <a href=\"components/AppComponent.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >AppComponent</a>\n                                            </li>\n                                            <li class=\"link\">\n                                                <a href=\"components/ArchivosAsociacionComponent.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >ArchivosAsociacionComponent</a>\n                                            </li>\n                                            <li class=\"link\">\n                                                <a href=\"components/DocumentosAnimalComponent.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >DocumentosAnimalComponent</a>\n                                            </li>\n                                            <li class=\"link\">\n                                                <a href=\"components/FooterComponent.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >FooterComponent</a>\n                                            </li>\n                                            <li class=\"link\">\n                                                <a href=\"components/FormCrearAnimalComponent.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >FormCrearAnimalComponent</a>\n                                            </li>\n                                            <li class=\"link\">\n                                                <a href=\"components/FormEditarAnimalComponent.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >FormEditarAnimalComponent</a>\n                                            </li>\n                                            <li class=\"link\">\n                                                <a href=\"components/FormEditarArchivoAsocComponent.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >FormEditarArchivoAsocComponent</a>\n                                            </li>\n                                            <li class=\"link\">\n                                                <a href=\"components/FormEditarDocumentoAnimalComponent.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >FormEditarDocumentoAnimalComponent</a>\n                                            </li>\n                                            <li class=\"link\">\n                                                <a href=\"components/FormPerfilAsociacionComponent.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >FormPerfilAsociacionComponent</a>\n                                            </li>\n                                            <li class=\"link\">\n                                                <a href=\"components/FormPerfilPersonaComponent.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >FormPerfilPersonaComponent</a>\n                                            </li>\n                                            <li class=\"link\">\n                                                <a href=\"components/FormSubirArchivoAsocComponent.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >FormSubirArchivoAsocComponent</a>\n                                            </li>\n                                            <li class=\"link\">\n                                                <a href=\"components/FormSubirDocumentoAnimalComponent.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >FormSubirDocumentoAnimalComponent</a>\n                                            </li>\n                                            <li class=\"link\">\n                                                <a href=\"components/ListAssociationsComponent.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >ListAssociationsComponent</a>\n                                            </li>\n                                            <li class=\"link\">\n                                                <a href=\"components/LoginComponent.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >LoginComponent</a>\n                                            </li>\n                                            <li class=\"link\">\n                                                <a href=\"components/NavbarComponent.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >NavbarComponent</a>\n                                            </li>\n                                            <li class=\"link\">\n                                                <a href=\"components/PaginacionComponent.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >PaginacionComponent</a>\n                                            </li>\n                                            <li class=\"link\">\n                                                <a href=\"components/PerfilAnimalComponent.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >PerfilAnimalComponent</a>\n                                            </li>\n                                            <li class=\"link\">\n                                                <a href=\"components/PerfilComponent.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >PerfilComponent</a>\n                                            </li>\n                                            <li class=\"link\">\n                                                <a href=\"components/RazaComponent.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >RazaComponent</a>\n                                            </li>\n                                            <li class=\"link\">\n                                                <a href=\"components/RegisterAssociationComponent.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >RegisterAssociationComponent</a>\n                                            </li>\n                                            <li class=\"link\">\n                                                <a href=\"components/RegisterUserComponent.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >RegisterUserComponent</a>\n                                            </li>\n                                            <li class=\"link\">\n                                                <a href=\"components/SolicitudesAdminComponent.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >SolicitudesAdminComponent</a>\n                                            </li>\n                                            <li class=\"link\">\n                                                <a href=\"components/SolicitudesAnimalComponent.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >SolicitudesAnimalComponent</a>\n                                            </li>\n                                            <li class=\"link\">\n                                                <a href=\"components/SolicitudesAsociacionComponent.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >SolicitudesAsociacionComponent</a>\n                                            </li>\n                                            <li class=\"link\">\n                                                <a href=\"components/SolicitudesUsuarioComponent.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >SolicitudesUsuarioComponent</a>\n                                            </li>\n                                            <li class=\"link\">\n                                                <a href=\"components/TipoAnimalComponent.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >TipoAnimalComponent</a>\n                                            </li>\n                                        </ul>\n                                    </li>\n                                <li class=\"chapter inner\">\n                                    <div class=\"simple menu-toggler\" data-bs-toggle=\"collapse\" ").concat(isNormalMode ? 'data-bs-target="#injectables-links-module-AppModule-e1366c18d8bd9d0b5472cf126671f09818179bf2ca260f7c0b0dbe2fdc27cadeadaa1b993262201f7835e622c4303a3e8465e0da9970b24fb7963bd72845f1b7"' : 'data-bs-target="#xs-injectables-links-module-AppModule-e1366c18d8bd9d0b5472cf126671f09818179bf2ca260f7c0b0dbe2fdc27cadeadaa1b993262201f7835e622c4303a3e8465e0da9970b24fb7963bd72845f1b7"', ">\n                                        <span class=\"icon ion-md-arrow-round-down\"></span>\n                                        <span>Injectables</span>\n                                        <span class=\"icon ion-ios-arrow-down\"></span>\n                                    </div>\n                                    <ul class=\"links collapse\" ").concat(isNormalMode ? 'id="injectables-links-module-AppModule-e1366c18d8bd9d0b5472cf126671f09818179bf2ca260f7c0b0dbe2fdc27cadeadaa1b993262201f7835e622c4303a3e8465e0da9970b24fb7963bd72845f1b7"' : 'id="xs-injectables-links-module-AppModule-e1366c18d8bd9d0b5472cf126671f09818179bf2ca260f7c0b0dbe2fdc27cadeadaa1b993262201f7835e622c4303a3e8465e0da9970b24fb7963bd72845f1b7"', ">\n                                        <li class=\"link\">\n                                            <a href=\"injectables/AuthTokenService.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >AuthTokenService</a>\n                                        </li>\n                                        <li class=\"link\">\n                                            <a href=\"injectables/ComunService.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >ComunService</a>\n                                        </li>\n                                        <li class=\"link\">\n                                            <a href=\"injectables/ConfigService.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >ConfigService</a>\n                                        </li>\n                                    </ul>\n                                </li>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"modules/AppRoutingModule.html\" data-type=\"entity-link\" >AppRoutingModule</a>\n                            </li>\n                </ul>\n                </li>\n                    <li class=\"chapter\">\n                        <div class=\"simple menu-toggler\" data-bs-toggle=\"collapse\" ").concat(isNormalMode ? 'data-bs-target="#classes-links"' : 'data-bs-target="#xs-classes-links"', ">\n                            <span class=\"icon ion-ios-paper\"></span>\n                            <span>Classes</span>\n                            <span class=\"icon ion-ios-arrow-down\"></span>\n                        </div>\n                        <ul class=\"links collapse \" ").concat(isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"', ">\n                            <li class=\"link\">\n                                <a href=\"classes/Animal.html\" data-type=\"entity-link\" >Animal</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"classes/Animal-1.html\" data-type=\"entity-link\" >Animal</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"classes/AnimalPersona.html\" data-type=\"entity-link\" >AnimalPersona</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"classes/ArchivoAnimal.html\" data-type=\"entity-link\" >ArchivoAnimal</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"classes/ArchivoAsociacion.html\" data-type=\"entity-link\" >ArchivoAsociacion</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"classes/Asociacion.html\" data-type=\"entity-link\" >Asociacion</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"classes/Asociacion-1.html\" data-type=\"entity-link\" >Asociacion</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"classes/Id.html\" data-type=\"entity-link\" >Id</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"classes/imagenAnimal.html\" data-type=\"entity-link\" >imagenAnimal</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"classes/JwtDTO.html\" data-type=\"entity-link\" >JwtDTO</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"classes/Load.html\" data-type=\"entity-link\" >Load</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"classes/LoginUsuario.html\" data-type=\"entity-link\" >LoginUsuario</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"classes/Page.html\" data-type=\"entity-link\" >Page</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"classes/Persona.html\" data-type=\"entity-link\" >Persona</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"classes/Persona-1.html\" data-type=\"entity-link\" >Persona</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"classes/Provincia.html\" data-type=\"entity-link\" >Provincia</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"classes/Provincia-1.html\" data-type=\"entity-link\" >Provincia</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"classes/Raza.html\" data-type=\"entity-link\" >Raza</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"classes/Raza-1.html\" data-type=\"entity-link\" >Raza</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"classes/Rol.html\" data-type=\"entity-link\" >Rol</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"classes/Rol-1.html\" data-type=\"entity-link\" >Rol</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"classes/TipoAnimal.html\" data-type=\"entity-link\" >TipoAnimal</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"classes/Usuario.html\" data-type=\"entity-link\" >Usuario</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"classes/Usuario-1.html\" data-type=\"entity-link\" >Usuario</a>\n                            </li>\n                        </ul>\n                    </li>\n                        <li class=\"chapter\">\n                            <div class=\"simple menu-toggler\" data-bs-toggle=\"collapse\" ").concat(isNormalMode ? 'data-bs-target="#injectables-links"' : 'data-bs-target="#xs-injectables-links"', ">\n                                <span class=\"icon ion-md-arrow-round-down\"></span>\n                                <span>Injectables</span>\n                                <span class=\"icon ion-ios-arrow-down\"></span>\n                            </div>\n                            <ul class=\"links collapse \" ").concat(isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"', ">\n                                <li class=\"link\">\n                                    <a href=\"injectables/AnimalPersonaServiceService.html\" data-type=\"entity-link\" >AnimalPersonaServiceService</a>\n                                </li>\n                                <li class=\"link\">\n                                    <a href=\"injectables/AnimalService.html\" data-type=\"entity-link\" >AnimalService</a>\n                                </li>\n                                <li class=\"link\">\n                                    <a href=\"injectables/ArchivosAnimalService.html\" data-type=\"entity-link\" >ArchivosAnimalService</a>\n                                </li>\n                                <li class=\"link\">\n                                    <a href=\"injectables/ArchivosAsociacionService.html\" data-type=\"entity-link\" >ArchivosAsociacionService</a>\n                                </li>\n                                <li class=\"link\">\n                                    <a href=\"injectables/AsociacionService.html\" data-type=\"entity-link\" >AsociacionService</a>\n                                </li>\n                                <li class=\"link\">\n                                    <a href=\"injectables/AuthService.html\" data-type=\"entity-link\" >AuthService</a>\n                                </li>\n                                <li class=\"link\">\n                                    <a href=\"injectables/AuthTokenService.html\" data-type=\"entity-link\" >AuthTokenService</a>\n                                </li>\n                                <li class=\"link\">\n                                    <a href=\"injectables/ComunService.html\" data-type=\"entity-link\" >ComunService</a>\n                                </li>\n                                <li class=\"link\">\n                                    <a href=\"injectables/ConfigService.html\" data-type=\"entity-link\" >ConfigService</a>\n                                </li>\n                                <li class=\"link\">\n                                    <a href=\"injectables/PersonaService.html\" data-type=\"entity-link\" >PersonaService</a>\n                                </li>\n                                <li class=\"link\">\n                                    <a href=\"injectables/ProvinciaService.html\" data-type=\"entity-link\" >ProvinciaService</a>\n                                </li>\n                                <li class=\"link\">\n                                    <a href=\"injectables/RazaService.html\" data-type=\"entity-link\" >RazaService</a>\n                                </li>\n                                <li class=\"link\">\n                                    <a href=\"injectables/TipoAnimalServiceService.html\" data-type=\"entity-link\" >TipoAnimalServiceService</a>\n                                </li>\n                                <li class=\"link\">\n                                    <a href=\"injectables/TipoService.html\" data-type=\"entity-link\" >TipoService</a>\n                                </li>\n                                <li class=\"link\">\n                                    <a href=\"injectables/TokenService.html\" data-type=\"entity-link\" >TokenService</a>\n                                </li>\n                                <li class=\"link\">\n                                    <a href=\"injectables/UsuariosServicesService.html\" data-type=\"entity-link\" >UsuariosServicesService</a>\n                                </li>\n                            </ul>\n                        </li>\n                    <li class=\"chapter\">\n                        <div class=\"simple menu-toggler\" data-bs-toggle=\"collapse\" ").concat(isNormalMode ? 'data-bs-target="#interceptors-links"' : 'data-bs-target="#xs-interceptors-links"', ">\n                            <span class=\"icon ion-ios-swap\"></span>\n                            <span>Interceptors</span>\n                            <span class=\"icon ion-ios-arrow-down\"></span>\n                        </div>\n                        <ul class=\"links collapse \" ").concat(isNormalMode ? 'id="interceptors-links"' : 'id="xs-interceptors-links"', ">\n                            <li class=\"link\">\n                                <a href=\"interceptors/ProdInterceptorService.html\" data-type=\"entity-link\" >ProdInterceptorService</a>\n                            </li>\n                        </ul>\n                    </li>\n                    <li class=\"chapter\">\n                        <div class=\"simple menu-toggler\" data-bs-toggle=\"collapse\" ").concat(isNormalMode ? 'data-bs-target="#guards-links"' : 'data-bs-target="#xs-guards-links"', ">\n                            <span class=\"icon ion-ios-lock\"></span>\n                            <span>Guards</span>\n                            <span class=\"icon ion-ios-arrow-down\"></span>\n                        </div>\n                        <ul class=\"links collapse \" ").concat(isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"', ">\n                            <li class=\"link\">\n                                <a href=\"guards/AuthGuard.html\" data-type=\"entity-link\" >AuthGuard</a>\n                            </li>\n                        </ul>\n                    </li>\n                    <li class=\"chapter\">\n                        <div class=\"simple menu-toggler\" data-bs-toggle=\"collapse\" ").concat(isNormalMode ? 'data-bs-target="#interfaces-links"' : 'data-bs-target="#xs-interfaces-links"', ">\n                            <span class=\"icon ion-md-information-circle-outline\"></span>\n                            <span>Interfaces</span>\n                            <span class=\"icon ion-ios-arrow-down\"></span>\n                        </div>\n                        <ul class=\"links collapse \" ").concat(isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"', ">\n                            <li class=\"link\">\n                                <a href=\"interfaces/Asociacion.html\" data-type=\"entity-link\" >Asociacion</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"interfaces/AssociationRegister.html\" data-type=\"entity-link\" >AssociationRegister</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"interfaces/Provincia.html\" data-type=\"entity-link\" >Provincia</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"interfaces/Rol.html\" data-type=\"entity-link\" >Rol</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"interfaces/UserRegister.html\" data-type=\"entity-link\" >UserRegister</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"interfaces/Usuario.html\" data-type=\"entity-link\" >Usuario</a>\n                            </li>\n                        </ul>\n                    </li>\n                    <li class=\"chapter\">\n                        <div class=\"simple menu-toggler\" data-bs-toggle=\"collapse\" ").concat(isNormalMode ? 'data-bs-target="#miscellaneous-links"' : 'data-bs-target="#xs-miscellaneous-links"', ">\n                            <span class=\"icon ion-ios-cube\"></span>\n                            <span>Miscellaneous</span>\n                            <span class=\"icon ion-ios-arrow-down\"></span>\n                        </div>\n                        <ul class=\"links collapse \" ").concat(isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"', ">\n                            <li class=\"link\">\n                                <a href=\"miscellaneous/variables.html\" data-type=\"entity-link\">Variables</a>\n                            </li>\n                        </ul>\n                    </li>\n                        <li class=\"chapter\">\n                            <a data-type=\"chapter-link\" href=\"routes.html\"><span class=\"icon ion-ios-git-branch\"></span>Routes</a>\n                        </li>\n                    <li class=\"chapter\">\n                        <a data-type=\"chapter-link\" href=\"coverage.html\"><span class=\"icon ion-ios-stats\"></span>Documentation coverage</a>\n                    </li>\n                    <li class=\"divider\"></li>\n                    <li class=\"copyright\">\n                        Documentation generated using <a href=\"https://compodoc.app/\" target=\"_blank\" rel=\"noopener noreferrer\">\n                            <img data-src=\"images/compodoc-vectorise.png\" class=\"img-responsive\" data-type=\"compodoc-logo\">\n                        </a>\n                    </li>\n            </ul>\n        </nav>\n        "));
      this.innerHTML = tp.strings;
    }
  }]);
}( /*#__PURE__*/_wrapNativeSuper(HTMLElement)));