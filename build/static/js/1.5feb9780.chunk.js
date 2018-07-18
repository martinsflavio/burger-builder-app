webpackJsonp([1],{192:function(e,t,n){"use strict";function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}function a(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var i=n(0),l=n.n(i),u=n(10),c=n(7),s=n(14),p=n(8),d=n(216),f=(n.n(d),n(193)),m=n(54),A=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),b=function(e){function t(){var e,n,a,i;o(this,t);for(var l=arguments.length,u=Array(l),c=0;c<l;c++)u[c]=arguments[c];return n=a=r(this,(e=t.__proto__||Object.getPrototypeOf(t)).call.apply(e,[this].concat(u))),a.state={controls:{email:{elementType:"input",elementConfig:{type:"email",placeholder:"Mail Address"},value:"",validation:{required:!0,isEmail:!0},valid:!1,touched:!1},password:{elementType:"input",elementConfig:{type:"password",placeholder:"Password"},value:"",validation:{required:!0,minLength:6},valid:!1,touched:!1}},createNewAccount:!1},a.updateControlsValueHandler=function(e){var t=void 0,n=void 0;t=Object(p.a)(a.state),n=Object.assign({},t,e),a.setState(n)},a.submitHandler=function(e){var t=void 0,n=void 0,o=void 0;e.preventDefault(),t=a.state.controls.email.value,n=a.state.controls.password.value,o=a.state.createNewAccount,a.props.userAuth(t,n,o)},a.switchAuthModeHandler=function(){var e=a.state.createNewAccount;a.setState({createNewAccount:!e})},i=n,r(a,i)}return a(t,e),A(t,[{key:"render",value:function(){var e=this,t=void 0,n=null,o=null;return this.props.user&&(n=l.a.createElement(u.c,{to:"/"})),this.props.error&&(o=this.props.error.message),t=l.a.createElement("div",null,l.a.createElement("div",null,l.a.createElement("h2",null,this.state.createNewAccount?"Sign Up":"Log In"),l.a.createElement("h2",null,o)),l.a.createElement("div",null,l.a.createElement(f.a,{controls:Object(p.a)(this.state.controls),updateControlsValue:function(t){return e.updateControlsValueHandler(t)},submitHandler:this.submitHandler,formIsValid:this.state.formIsValid})),l.a.createElement("div",null,this.state.createNewAccount?l.a.createElement("p",null,"Click",l.a.createElement("strong",{onClick:this.switchAuthModeHandler}," HERE "),"to log in with a existent account."):l.a.createElement("p",null,"Don't have an account?",l.a.createElement("strong",{onClick:this.switchAuthModeHandler}," Create one.")))),this.props.loading&&(t=l.a.createElement(m.a,null)),l.a.createElement("div",{className:d.Auth},n,t)}}]),t}(i.Component),h=function(e){var t=e.auth;return{user:t.user,error:t.error,loading:e.apiConnection.loading}},v=function(e){return{userAuth:function(t,n,o){return e(s.c(t,n,o))}}};t.default=Object(c.b)(h,v)(b)},193:function(e,t,n){"use strict";function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}function a(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}var i=n(0),l=n.n(i),u=n(194),c=n.n(u),s=n(52),p=n(196),d="function"===typeof Symbol&&"symbol"===typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"===typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},f=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),m=function(e){function t(){var e,n,a,i;o(this,t);for(var l=arguments.length,u=Array(l),c=0;c<l;c++)u[c]=arguments[c];return n=a=r(this,(e=t.__proto__||Object.getPrototypeOf(t)).call.apply(e,[this].concat(u))),a.transformObjToArray=function(e){var t=[];if(null===e||void 0===e||"object"!==("undefined"===typeof e?"undefined":d(e)))return t;for(var n in e)e.hasOwnProperty(n)&&t.push({element:e[n],id:n});return t},a.checkValidity=function(e,t){var n=!0;if(!t)return!0;if(t.required&&(n=""!==e.trim()&&n),t.minLength&&(n=e.length>=t.minLength&&n),t.maxLength&&(n=e.length<=t.maxLength&&n),t.isEmail){n=/[a-z0-9!#$%&'*+\/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+\/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(e)&&n}if(t.isNumeric){n=/^\d+$/.test(e)&&n}return n},a.validateForm=function(e){var t=!0;for(var n in e)e.hasOwnProperty(n)&&(e[n].valid||(t=!1));return t},a.inputChangeHandler=function(e,t,n){var o=t.id,r=void 0,i=void 0;n[o].value=e.target.value,n[o].valid=a.checkValidity(n[o].value,n[o].validation),n[o].touched=!0,r=a.validateForm(n),i={controls:n,formIsValid:r},a.props.updateControlsValue(i)},i=n,r(a,i)}return a(t,e),f(t,[{key:"render",value:function(){var e=this,t=void 0;return t=this.transformObjToArray(this.props.controls),l.a.createElement("div",{className:c.a.Form},l.a.createElement("h4",null,this.props.children),l.a.createElement("form",{onSubmit:this.props.submitHandler},t.map(function(t){return l.a.createElement(p.a,{key:t.id,elementType:t.element.elementType,elementConfig:t.element.elementConfig,value:t.element.value,isValid:t.element.valid,touched:t.element.touched,changed:function(n){return e.inputChangeHandler(n,t,e.props.controls)}})}),l.a.createElement(s.a,{btnType:"Success",disable:!this.props.formIsValid},"Submit")))}}]),t}(i.Component);t.a=m},194:function(e,t,n){var o=n(195);"string"===typeof o&&(o=[[e.i,o,""]]);var r={hmr:!1};r.transform=void 0;n(188)(o,r);o.locals&&(e.exports=o.locals)},195:function(e,t,n){t=e.exports=n(187)(!0),t.push([e.i,"","",{version:3,sources:[],names:[],mappings:"",file:"form.css",sourceRoot:""}]),t.locals={Form:"form__Form__3_SbF"}},196:function(e,t,n){"use strict";var o=n(0),r=n.n(o),a=n(197),i=n.n(a),l=function(e){var t=null,n=[i.a.InputElement];switch(!e.isValid&&e.touched&&n.push(i.a.Invalid),e.elementType){case"input":t=r.a.createElement("input",Object.assign({className:n.join(" ")},e.elementConfig,{value:e.value,onChange:e.changed}));break;case"textarea":t=r.a.createElement("textarea",Object.assign({className:n.join(" ")},e.elementConfig,{value:e.value,onChange:e.changed}));break;case"select":t=r.a.createElement("select",{className:n.join(" "),value:e.value,onChange:e.changed},e.elementConfig.options.map(function(e){return r.a.createElement("option",{key:e.value,value:e.value},e.displayValue)}));break;default:t=r.a.createElement("input",Object.assign({className:n.join(" ")},e.elementConfig,{value:e.value,onChange:e.changed}))}return r.a.createElement("div",{className:i.a.Input},r.a.createElement("label",{className:i.a.Label},e.label),t)};t.a=l},197:function(e,t,n){var o=n(198);"string"===typeof o&&(o=[[e.i,o,""]]);var r={hmr:!1};r.transform=void 0;n(188)(o,r);o.locals&&(e.exports=o.locals)},198:function(e,t,n){t=e.exports=n(187)(!0),t.push([e.i,".input__Input__2WShl{width:100%;padding:10px;-webkit-box-sizing:border-box;box-sizing:border-box}.input__Label__21gEE{font-weight:700;display:block;margin-bottom:8px}.input__InputElement__2REK8{outline:none;border:1px solid #ccc;background-color:#fff;font:inherit;padding:6px 10px;display:block;width:100%;-webkit-box-sizing:border-box;box-sizing:border-box}.input__InputElement__2REK8:focus{outline:none;background-color:#ccc}.input__Invalid__YOSl9{border:1px solid red;background-color:#fda49a}","",{version:3,sources:["/Users/flaviomartins/webAppProjects/study/burger-builder-app/src/components/UI/Form/Input/input.css"],names:[],mappings:"AAAA,qBACE,WAAY,AACZ,aAAc,AACd,8BAA+B,AACvB,qBAAuB,CAChC,AAED,qBACE,gBAAkB,AAClB,cAAe,AACf,iBAAmB,CACpB,AAED,4BACE,aAAc,AACd,sBAAuB,AACvB,sBAAwB,AACxB,aAAc,AACd,iBAAkB,AAClB,cAAe,AACf,WAAY,AACZ,8BAA+B,AACvB,qBAAuB,CAChC,AAED,kCACE,aAAc,AACd,qBAAuB,CACxB,AAED,uBACE,qBAAsB,AACtB,wBAA0B,CAC3B",file:"input.css",sourcesContent:[".Input {\n  width: 100%;\n  padding: 10px;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n}\n\n.Label {\n  font-weight: bold;\n  display: block;\n  margin-bottom: 8px;\n}\n\n.InputElement {\n  outline: none;\n  border: 1px solid #ccc;\n  background-color: white;\n  font: inherit;\n  padding: 6px 10px;\n  display: block;\n  width: 100%;\n  -webkit-box-sizing: border-box;\n          box-sizing: border-box;\n}\n\n.InputElement:focus {\n  outline: none;\n  background-color: #ccc;\n}\n\n.Invalid {\n  border: 1px solid red;\n  background-color: #FDA49A;\n}"],sourceRoot:""}]),t.locals={Input:"input__Input__2WShl",Label:"input__Label__21gEE",InputElement:"input__InputElement__2REK8",Invalid:"input__Invalid__YOSl9"}},216:function(e,t,n){var o=n(217);"string"===typeof o&&(o=[[e.i,o,""]]);var r={hmr:!1};r.transform=void 0;n(188)(o,r);o.locals&&(e.exports=o.locals)},217:function(e,t,n){t=e.exports=n(187)(!0),t.push([e.i,".auth__Auth__20GUw{text-align:center}","",{version:3,sources:["/Users/flaviomartins/webAppProjects/study/burger-builder-app/src/containers/Auth/auth.css"],names:[],mappings:"AAAA,mBACE,iBAAmB,CACpB",file:"auth.css",sourcesContent:[".Auth {\n  text-align: center;\n}\n"],sourceRoot:""}]),t.locals={Auth:"auth__Auth__20GUw"}}});
//# sourceMappingURL=1.5feb9780.chunk.js.map