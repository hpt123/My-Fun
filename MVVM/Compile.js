class Compile {
  constructor(el, vm) {
    this.el = this.isElementNode(el) ? el : document.querySelector(el);
    this.vm = vm;
    if (this.el) {
      let docFragment = this.nodeToFragment(this.el);
      this.compile(docFragment);
      this.el.appendChild(docFragment);
    }
  }
  nodeToFragment(el) {
    let docFragment = document.createDocumentFragment();
    let firstChild;
    while ((firstChild = el.firstChild)) {
      docFragment.appendChild(firstChild);
    }
    return docFragment;
  }
  isElementNode(node) {
    return node.nodeType === 1;
  }
  isDirective(name) {
    return name.includes("v-");
  }
  compile(docFragment) {
    let childNodes = docFragment.childNodes;

    Array.from(childNodes).forEach(node => {
      if (this.isElementNode(node)) {
        // 元素节点
        this.compileElement(node);
        this.compile(node);
      } else {
        // 文本节点

        this.compileText(node);
      }
    });
  }
  compileElement(node) {
    // console.log(node);
    let attrs = node.attributes;
    Array.from(attrs).forEach(attr => {
      let attrName = attr.name;
      if (this.isDirective(attrName)) {
        let exp = attr.value;
        let type = attrName.slice(2);
        CompileUtils[type](node, this.vm, exp);
      }
    });
  }
  compileText(node) {
    let exp = node.textContent;
    let reg = /\{\{([^}]+)\}\}/g;
    if (reg.test(exp)) {
      CompileUtils["text"](node, this.vm, exp);
    }
  }
}

CompileUtils = {
  model(node, vm, exp) {
    let updateFn = this.updater["modelUpdater"];
    new Watcher(vm, exp, () => {
      updateFn && updateFn(node, this.getVal(vm, exp));
    });
    node.addEventListener("input", e => {
      let newValue = e.target.value;
      this.setValue(vm, exp, newValue);
    });
    updateFn && updateFn(node, this.getVal(vm, exp));
  },
  text(node, vm, exp) {
    let updateFn = this.updater["textUpdater"];
    let reg = /\{\{([^}]+)\}\}/g;
    let value = this.getTextValue(vm, exp);
    exp.replace(reg, (...args) => {
      new Watcher(vm, args[1], () => {
        updateFn && updateFn(node, this.getTextValue(vm, exp));
      });
    });

    updateFn && updateFn(node, value);
  },
  updater: {
    modelUpdater(node, value) {
      node.value = value;
    },
    textUpdater(node, value) {
      // console.log(node.textContent);
      // console.log(value);
      node.textContent = value;
    }
  },
  getVal(vm, exp) {
    exp = exp.split(".");
    return exp.reduce((prev, next) => {
      return prev[next];
    }, vm.$data);
  },
  getTextValue(vm, exp) {
    let reg = /\{\{([^}]+)\}\}/g;
    return (value = exp.replace(reg, (...args) => {
      return this.getVal(vm, args[1]);
    }));
  },
  setValue(vm, exp, value) {
    exp = exp.split(".");
    return exp.reduce((prev, next, currentIndex) => {
      if (currentIndex === exp.length - 1) {
        return (prev[next] = value);
      }
      return prev[next];
    }, vm.$data);
  }
};
