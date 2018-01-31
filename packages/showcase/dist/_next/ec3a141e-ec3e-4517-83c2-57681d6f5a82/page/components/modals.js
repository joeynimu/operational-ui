
          window.__NEXT_REGISTER_PAGE('/components/modals', function() {
            var comp = module.exports=webpackJsonp([34],{1660:function(e,t,n){e.exports=n(1661)},1661:function(e,t,n){"use strict";function l(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var a=n(0),o=function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t.default=e,t}(a),s=n(10),i=n(11),r=l(i),d=n(211),c=l(d),u=n(32),p=l(u),h=[{name:"childCss",description:"Glamor CSS object passed down to the container's immediate child, which holds the content. Use to specify/override styles",defaultValue:"-",type:"string",optional:!0},{name:"childClassName",description:"Class name for the modal container's immediate child, which holds the content. Use to specify/override styles.",defaultValue:"-",type:"string",optional:!0},{name:"onClose",description:"Callback called when the modal is closed (outside area is clicked).",defaultValue:"-",type:"string",optional:!0}];t.default=function(e){return o.createElement(r.default,{pathname:e.url.pathname},o.createElement(s.Card,null,o.createElement("p",null,"Modals are customizable full-screen alert boxes. They should be used sparingly, but they come in handy when there is a legitimate reason to block the rest of the screen. Several Operational components such as date pickers and select boxes implement local pop-ups, which are preferable most of the time."),o.createElement("h2",null,"Usage"),o.createElement(p.default,{snippet:'\n(() => {\n  class ContentWithModal extends React.Component {\n    state = {\n      isModalOpen: false\n    }\n    render() {\n      return (\n        <div>\n          {this.state.isModalOpen ? (\n            <Modal\n              onClose={() => {\n                this.setState(prevState => ({\n                  isModalOpen: false\n                }))\n              }}\n            >\n              <div style={{ width: 300, height: 240 }}>\n                Hello\n              </div>\n            </Modal>\n          ) : null}\n          <Button\n            color="info"\n            onClick={ev => {\n              this.setState(prevState => ({ isModalOpen: !prevState.isModalOpen }))\n            }}\n          >\n            Expand your modal!\n          </Button>\n        </div>\n      )\n    }\n  }\n\n  return <ContentWithModal />\n})()\n',components:{Modal:s.Modal,Button:s.Button}}),o.createElement("h2",null,"Props"),o.createElement(c.default,{props:h})))}}},[1660]);
            return { page: comp.default }
          })
        