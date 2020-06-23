import Compiler from './compiler';

export default class Dom extends Compiler{
  constructor(viewName){
    super()
    this.viewName = viewName;
    this.dom = document.querySelector('#root');
    this.vDom = []
  }

  buildDom(dom){
    let domparser = new DOMParser();
    var htmlobject = domparser.parseFromString(dom, 'text/html').querySelector('body');
    var switchCase = false;

    const buildNodes = (thisnode) => {

      return Array.prototype.map.call(thisnode.childNodes, (node => {
  directiveFor(value, node, target){

    let selector = value.split(' ').pop();
    let exp = value.split(' ')[0];

    var topSelector = selector;

    const replaceExp = (html, item, expression, index) => {
      var values = expression;
      var dataObj = []

      if(typeof item === 'object'){

        let expKeys = Object.keys(item);
        let expVals = Object.values(item);

        for(let key of expKeys){

          this.expressStr = '';
          var childObject = this.generateExp(item, key);
          var selector = `${expression}.${childObject}`;
          var itemValue;

          // console.log(childObject)

          if(/[\.]/g.test(childObject)){
            let paths = childObject.split('.');
            function getValue(paths, item, i = 0){
              if(typeof Object.values(item[paths[i]])[0] === 'string'){
                return Object.values(item[paths[i]])[0];
              }else{
                i++
                getValue(paths, item[paths[i]], i)
              }
            }
            itemValue = getValue(paths, item)
          }else{
            itemValue = item[key]
          }


            html = html.replace(`{{${selector}}}`, `{{${key}}}`);
            html = html.replace(`{{${key}}}`, itemValue);

          // if(){

            let obj = {};
            obj[selector] = itemValue;

            window.blade.view[target].data['temp'] = obj

            // console.log(html)

            // this.buildDom(html, 'body', 'for', index, topSelector);

          // }
        }
      }else{
        html.replace(`{{${expression}}}`, item)
      }


      html = `<!-- ${topSelector}[${index}] -->` + html + `<!-- END -->`

      return html;

    }

    const cleanExp = (html, item, expression) => {
      var values = expression;
      var newHtml;

      if(typeof item === 'object'){

        let expKeys = Object.keys(item);
        let expVals = Object.values(item);

        for(let key of expKeys){

          function removeExp(html, dataArray, expArray, i){
            var newHtml = html;
            for(let exp of expArray){
              var isMissing = true;
              for(let data of Object.keys(dataArray)){
                if(exp.indexOf(data) > -1) isMissing = false;
              }
              if(isMissing){
                newHtml = newHtml.replace(exp, '');
              }else{
                newHtml = newHtml;
              }
            }

            return newHtml;
          }

          const regex = new RegExp(`{{${expression}(.*?)}}`, "g");
          const expArray = html.match(regex);
          newHtml = removeExp(html, item, expArray);
        }
      }else{
        // newHtml = html.replace(`{{${expression}}}`, item)
      }

      return newHtml
    }

        this.directives(node, this.viewName, this.virtualDom)

        if(node.nodeType === 1){
          // console.log(window.blade.component)
  poller(elm, index = null){
    return new Promise((resolve, reject) => {
      var i = 0;

      var selector = index ? 'document.querySelectorAll('+elm+')'+'['+index+']' : 'document.querySelectorAll('+elm+')'

        var pollerElm = setInterval(() => {
          if(selector || i === 1000){
            stopPoller()
            resolve(true);
          }else{
            i++;
          }
        },1);


      function stopPoller() {
        clearInterval(pollerElm);
      }
    })
  }

  pollerCase(elm){
    return new Promise((resolve, reject) => {
      var i = 0;

      var selector = 'elm.querySelectorAll("div")'

        var pollerElm = setInterval(() => {
          if(selector || i === 1000){
            stopPoller()
            resolve(elm);
          }else{
            i++;
          }
        },1);


      function stopPoller() {
        clearInterval(pollerElm);
      }
    })
  }
    const virtualDom = this.virtualDom.bind(this);
    const updateDom = this.updateDom.bind(this);

    const getData = (data) => {
      var dataPath;

      let dataArray = data.split('.')

      const findRoot = () =>{

      }

      if(data.indexOf('.') > -1){
        for(let i = 0;i<dataArray.length;i++){
          if(i === 0){
            if(window.blade.view[viewName].data[topObj]){
              dataPath = window.blade.view[viewName].data[topObj][index];
            }else{

            }
          }else{
            dataPath = dataPath[dataArray[i]];
          }

        }
      }else{
        dataPath = window.blade.view[viewName].data[data];
      }

      return dataPath;
    }
          case 'data-blade-switch':

            window.blade.switch = attr.value;

            const hasCaseAttribute = (attrs, data) => {
              for(let nodeAttr of attrs){

                console.log(attr.name)
                if(nodeAttr.name === 'data-blade-case' && nodeAttr.value !== data){
                  return true;
                }
              }
              return false;
            }

            const setCaseDirective = (node) => {
              let data = getData(window.blade.switch)
              let elms = node.childNodes;
              for(let i=0;i<elms.length;i++){
                if(elms[i].nodeType === 1){
                  if(hasCaseAttribute(elms[i].attributes, data)){
                    let iou = document.createComment('element-removed');
                    node.childNodes[i].replaceWith(iou)
                  }else{
                    this.switchCase = true;
                  };
                }
              }
            }

            setCaseDirective(node)

          break;
          case 'data-blade-class':

            var temp, selectorAttr, tempVal;

            setTimeout(() => {

                const classBuilder = (target, data, type = 'default', index = null) => {

                  if(attr.value.indexOf('{') > -1){

                    var stringObj = attr.value;
                    stringObj = stringObj.substr(1, attr.value.length);
                    stringObj = stringObj.substr(0, attr.value.length - 2);
                    var classNameArray = [];
                    var newClassNameArray = [];
                    var bladeClasses = [];
                    let objArray = stringObj.split(',');


                    for(let items of objArray){
                      let array = items.split(':')

                      classNameArray.push(array);
                    }

                    for(let item of classNameArray){
                      let a, b;
                      for(let i=0;i<item.length;i++){
                        if(i === 0){
                          a = item[i].trim()
                        }else{
                          b = item[i].trim()
                        }
                      }

                      bladeClasses.push(a)
                      newClassNameArray.push(JSON.parse(`{"${a}": "${b}"}`));
                    }


                    target.classList.add(node.classList.value);

                    var nameArray = [];

                    for(let className of newClassNameArray){
                      let key = Object.keys(className);
                      let value = Object.values(className);

                      // console.log(value)
                      // let data = type === 'for' ? window.blade.view[viewName].data['temp'] : window.blade.view[viewName].data[value]
                      // console.log(data);

                      let nodeClass = node.classList.value.split(' ');
                      let targetClass = target.classList.value.split(' ');

                      if(window.blade.view[viewName].data[value]){
                        nameArray.push(key[0])
                      }


                    }

                    let nodeClass = node.classList.value.split(' ');
                    let targetClass = target.classList.value.split(' ');

                    let newClasses = nameArray.filter(item => {
                      // console.log(item)
                      var classArray = [];
                      for(let thisClass of bladeClasses){
                        // console.log(thisClass)
                        classArray.push(item !== thisClass);
                      }
                      return classArray;
                    })

                    let currentClasses = targetClass.filter(item => {
                      for(let thisClass of nodeClass){
                        return item !== thisClass;
                      }
                    })

                    if(JSON.stringify(newClasses) !== JSON.stringify(currentClasses)){

                      var removedClasses;

                      if(newClasses.length > 0){
                        removedClasses = currentClasses.filter(item => {
                          for(let thisClass of newClasses){
                            return item !== thisClass;
                          }
                        })
                      }else{
                        removedClasses = currentClasses
                      }

                      for(let item of removedClasses){
                        target.classList.remove(item);
                      }

                      let targetClassArr = node.classList.value.split(', ');
                      let classArray = targetClassArr.concat(newClasses);
                      for(let className of classArray){
                        // console.log('~~~~~ Class 1 ~~~~~')
                        target.classList.add(className);
                      }

                    }

                  }else{

                    let nodeClass = node.classList.value.split(' ');
                    let targetClass = target.classList.value.split(' ');

                    let newClasses = targetClass.filter(item => {
                      for(let thisClass of nodeClass){
                        return item !== thisClass;
                      }
                    })

                    // let data = type === 'for' ? window.blade.view[viewName].data['temp'] : window.blade.view[viewName].data[attr.value];
                    // console.log(data)


                    if(type === 'boolean'){

                      for(let item of newClasses){
                        target.classList.remove(item);
                      }

                      var stringObj = JSON.stringify(data);

                      // console.log(stringObj)

                      stringObj = stringObj.substr(1, stringObj.length);
                      stringObj = stringObj.substr(0, stringObj.length - 1);
                      var classNameArray = [];
                      var newClassNameArray = [];
                      let objArray = stringObj.split(',');
                      var bladeClasses = [];

                      for(let items of objArray){
                        let array = items.split(':')

                        classNameArray.push(array);
                      }

                      for(let item of classNameArray){
                        let a, b;
                        for(let i=0;i<item.length;i++){
                          if(i === 0){
                            a = item[i].trim()
                          }else{
                            b = item[i].trim()
                          }
                        }

                        // console.log(a);
                        // console.log(b)

                        bladeClasses.push(a)
                        newClassNameArray.push(JSON.parse(`{${a}: ${b}}`));

                        // console.log(bladeClasses);
                        // console.log(newClassNameArray)
                      }

                      target.classList.add(node.classList.value);

                      var nameArray = [];

                      for(let className of newClassNameArray){

                        let key = Object.keys(className);
                        let value = Object.values(className);

                        // console.log(value)
                        // let data = type === 'for' ? window.blade.view[viewName].data['temp'] : window.blade.view[viewName].data[value]
                        // console.log(data);

                        // let nodeClass = node.classList.value.split(' ');
                        // let targetClass = target.classList.value.split(' ');
                        //
                        // console.log(nodeClass);
                        // console.log(targetClass);

                        // if(window.blade.view[viewName].data[key]){
                        //   nameArray.push(key[0])
                        // }

                        if(value[0]) nameArray.push(key[0])

                      }

                      let nodeClass = node.classList.value.split(' ');
                      let targetClass = target.classList.value.split(' ');

                      if(nameArray.length > 0){
                        nameArray.forEach(item => {
                          target.classList.add(item);
                        })
                      }


                      // console.log('====== 2 ======')

                      // let currentClasses = targetClass.filter(item => {
                      //   for(let thisClass of nodeClass){
                      //     return item !== thisClass;
                      //   }
                      // })
                      //
                      // console.log(currentClasses)

                      // console.log('====== 3 ======')

                      // if(JSON.stringify(newClasses) !== JSON.stringify(currentClasses)){

                        // console.log('====== 4 ======')

                        // var removedClasses;
                        //
                        // if(newClasses.length > 0){
                        //   removedClasses = currentClasses.filter(item => {
                        //     for(let thisClass of newClasses){
                        //       return item !== thisClass;
                        //     }
                        //   })
                        // }else{
                        //   removedClasses = currentClasses
                        // }
                        //
                        // for(let item of removedClasses){
                        //   target.classList.remove(item);
                        // }
                        //
                        // let targetClassArr = node.classList.value.split(', ');
                        // let classArray = targetClassArr.concat(newClasses);
                        // for(let className of classArray){
                        //   target.classList.add(className);
                        // }

                      // }







                    }else if(JSON.stringify(newClasses) !== JSON.stringify([data])){



                      for(let item of newClasses){
                        target.classList.remove(item);
                      }

                      let classArray = [node.classList.value, data];

                      for(let className of classArray){
                        // console.log('~~~~~ Class 2 ~~~~~')
                        // console.log(className)
                        target.classList.add(className);
                      }
                    }

                  }

                }

                // console.log('==== data-blade-class SUCCESS ====');
                // console.log(window.blade.view[viewName].data['temp'])
                // console.log(node.getAttribute("data-blade-class"))
                // console.log(selectorAttr)
                // const target = document.querySelector(`[data-blade-class="${attr.value}"]`);

                // console.log('[======================]')
                // console.log(node.getAttribute("data-blade-class"));
                // console.log(selectorAttr)
                // console.log('[======================]')

                if(node.getAttribute("data-blade-class") === attr.value){

                  var elms, data;

                  // if(attr.value.indexOf('{') > -1){
                    data  = attr.value;
                  // }

                  if(type === 'for'){
                    elms = document.querySelectorAll(`[data-blade-class="${attr.value}"]`)[index];

                    let classSelector = data.split('.').pop();
                    var bladeDataClass = data;

                    // find value
                    var bladeData = window.blade.view[viewName].data;
                    var dataArray = data.split('.')
                    var path;
                    var targetParent;

                    function getParent(elm){

                      if(elm.parentNode.getAttribute('data-blade-for')){
                        targetParent = elm.parentNode
                      }else{
                        getParent(elm.parentNode)
                      }

                    }

                    var bladeDataClass;

                    for(let i=0;i<dataArray.length;i++){
                      if(i === 0){
                        getParent(elms);
                        var baseProp = targetParent.getAttribute('data-blade-for').split(' ').pop();
                        let targetObj = bladeData[baseProp];
                        bladeDataClass = targetObj[index];
                      }else{
                        bladeDataClass = bladeDataClass[dataArray[i]]
                      }
                    }

                    if(typeof bladeDataClass === 'boolean'){
                      let thisSelector = attr.value.split('.').pop();
                      let obj = {};
                      obj[thisSelector] = bladeDataClass;
                      classBuilder(elms, obj, 'boolean', index);
                    }else{
                      for(let elm of elms){
                        if(!elm.classList.contains(data) && data) classBuilder(elm, data);
                      }
                    }

                  }else{
                    elms = document.querySelectorAll(`[data-blade-class="${attr.value}"]`);
                    for(let elm of elms){
                      let obj = {};
                      let data = getData(attr.value)
                      obj[attr.value] = data;

                      classBuilder(elm, data);
                    }
                  }
                }


            }, 1)





          break;

        var map, thisNode = node.textContent.trim(), emptyArray = [];

        var map = {
          type: node.nodeType === 3 ? 'text' : (node.nodeType === 1 ? node.tagName.toLowerCase() : (node.nodeType === 8 ? 'comment' : null)),
          content: node.childNodes && node.childNodes.length > 0 ? null : (/{{(.*?)}}/g.test(node.textContent) ? this.expressions(node.textContent, this.viewName) : node.textContent),
          attr: node.attributes ? this.buildAttributes(node.attributes) : (node.nodeType === 8 ? emptyArray : null),
          node: node,
          children: buildNodes(node)
        }

        // console.log('++++++++++++++++++++++')
        // console.log(map)
        // console.log('++++++++++++++++++++++')

        return map

      }));

    }

    return buildNodes(htmlobject);

  };

  virtualDom(dom){
    let builtDom = this.buildDom(dom);
    return builtDom;
  }


  buildAttributes(attributes){
    var attrArray = [];
    Object.values(attributes).map((attr) => {

      var value;
      var regex = /(?<={{)(.*?)(?=\s*}})/g;
      let expressions = attr.value.match(regex);

      if(expressions){
        for(let i=0;i<expressions.length;i++){
          value = attr.value.replace(`{{${expressions[i]}}}`, window.blade.view[this.viewName].data[expressions[i]]);
        }
      }else{
        value = attr.value;
      }

      var attrObj = {};
      attrObj[attr.name] = value;
      attrArray.push(attrObj);
    })
    return attrArray;
  }

  removeAttr($target, name){
    $target.removeAttribute(name);
  }

  setAttr($target, name, value){
    var regex = /(?<={{)(.*?)(?=\s*}})/g;
    let expressions = value.match(regex);

    if(expressions){
      for(let i=0;i<expressions.length;i++){
        value = value.replace(`{{${expressions[i]}}}`, window.blade.view[this.viewName].data[expressions[i]]);
      }
    }

    $target.setAttribute(name, value)
  }

  setAttrs(root, props){
    Object.keys(props).forEach(name => {
      let attr = Object.keys(props[name])[0];
      let value = Object.values(props[name])[0];
      this.setAttr(root, attr, value)
    })
  }

  updateAttr(root, name, newVal, oldVal){
    if (!newVal) {
      this.removeAttr(root, name);
    } else if (!oldVal || newVal !== oldVal) {
      this.setAttr(root, name, newVal);
    }
  }

  updateAttrs(root, newAttrs, oldAttrs){
    let newProps = newAttrs ? newAttrs : {};
    let oldProps = oldAttrs ? oldAttrs : {};
    const props = Object.assign({}, newAttrs, oldAttrs);

    Object.values(props).forEach((name, i) => {
      let valName = Object.keys(name)[0];
      let newVal = newProps[i] ? Object.values(newProps[i])[0] : null;
      let oldVal = oldProps[i] ? Object.values(oldProps[i])[0] : null;
      this.updateAttr(root, valName, newVal, oldVal);
    });
  }

  createElm(node){

    if(node){
      if(node.type === 'text'){
        return document.createTextNode(node.content);
      }else if (node.type === 'comment') {
  			return document.createComment(node.content);
  		}
    }else{
      return document.createTextNode('');
    }

    if (typeof node === 'string') {
      return document.createTextNode(node);
    }

    const $el = document.createElement(node.type);

    if(node.attr){
      this.setAttrs($el, node.attr);
    }

    node.children.map(this.createElm.bind(this)).forEach($el.appendChild.bind($el));
    return $el;

  }

  changed(node1, node2){
    // console.log('========= Changed Nodes ===========')

    // if(node1) console.log(node1.content);
    // if(node2) console.log(node2.content);
    return typeof node1 !== typeof node2 ||
         typeof node1 === 'string' && node1 !== node2 ||
         node1.type !== node2.type || node1.content !== node2.content
  }

  updateDom(root, newNode, oldNode, index = 0){

    // console.log('========= Nodes ===========')
    // console.log(root.childNodes[index])
    // console.log(this.createElm(newNode))
    // console.log(this.changed(newNode, oldNode))
    // console.log('===========================')
    if(!oldNode){
      // console.log('========= Created Elm ===========')
      // console.log(this.createElm(newNode))
      // console.log('=================================')
      root.appendChild(this.createElm(newNode));
    }else if (!newNode && root.childNodes[index]){
      // console.log('========= Remove Elm ===========')
      // console.log(root.childNodes[index])
      // console.log('=================================')
      root.removeChild(root.childNodes[index]);
    }else if (this.changed(newNode, oldNode) && root.childNodes[index]) {
      // console.log('========= Replace Elm ===========')
      // console.log(root.childNodes[index])
      // console.log(this.createElm(newNode))
      // console.log('=================================')
      root.replaceChild(this.createElm(newNode), root.childNodes[index]);

    }else if(newNode){
      // console.log(root.childNodes[index])
      if(root.childNodes[index] !== undefined){
        if(typeof root.childNodes[index].attributes !== 'undefined'){
          if(newNode.attr.length > 0){
            this.updateAttrs(root.childNodes[index], newNode.attr, oldNode.attr);
          }
        }
      }

      const newLength = newNode.children.length;
      const oldLength = oldNode.children.length;

      for(let i = 0; i < newLength || i < oldLength; i++){
        this.updateDom(
          root.childNodes[index],
          newNode.children[i],
          oldNode.children[i],
          i
        );
      }

    }

  }

}
