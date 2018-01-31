
          window.__NEXT_REGISTER_PAGE('/components/paginators', function() {
            var comp = module.exports=webpackJsonp([33],{1662:function(e,n,t){e.exports=t(1663)},1663:function(e,n,t){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(n,"__esModule",{value:!0});var o=t(0),i=function(e){if(e&&e.__esModule)return e;var n={};if(null!=e)for(var t in e)Object.prototype.hasOwnProperty.call(e,t)&&(n[t]=e[t]);return n.default=e,n}(o),r=t(10),l=t(11),s=a(l),p=t(211),u=a(p),d=t(32),c=a(d),g=[{name:"pageCount",description:"Total number of pages.",defaultValue:null,type:"number",optional:!1},{name:"maxVisible",description:"Maximum amount of pages to be displayed.",defaultValue:"3",type:"number",optional:!0},{name:"page",description:"Index of the current selected page",defaultValue:"1",type:"number",optional:!0},{name:"onChange",description:"Function to be executed after changing page. Receives a single argument which represents the new page number",defaultValue:"void",type:"function",optional:!0}];n.default=function(e){return i.createElement(s.default,{pathname:e.url.pathname},i.createElement(r.Card,null,i.createElement("p",null,"Pagination is an easy-to-use, predictable and expressive way to handle datasets that don't fit in a single view. They are a straightforward alternative to infinite scrolling and lazy-loading interface elements, which take a long time to get cross-browser effective and accessible. This page describes how to use Operational UI's paginators."),i.createElement("h2",null,"Usage"),i.createElement(c.default,{snippet:'\n(() => {\n  class ComponentWithPaginator extends React.Component {\n    state = {\n      page: 1\n    }\n\n    handleChange(page) {\n      this.setState(() => ({ page }))\n    }\n\n    render() {\n      return <Paginator pageCount={30} page={this.state.page} onChange={page => this.handleChange(page)} />\n    }\n  }\n\n  return (\n    <div style={{ display: "flex" }}>\n      <ComponentWithPaginator />\n    </div>\n  )\n})()\n',components:{Paginator:r.Paginator}}),i.createElement("h2",null,"Props"),i.createElement(u.default,{props:g})))}}},[1662]);
            return { page: comp.default }
          })
        