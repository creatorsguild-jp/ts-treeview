// src/TreeView.ts
export interface TreeViewOptions {
  animated?: boolean;
  collapsed?: boolean;
  unique?: boolean;
}

export class TreeView {
  private element: HTMLElement;
  private options: TreeViewOptions;

  constructor(selector: string, options: TreeViewOptions = {}) {
    const el = document.querySelector(selector);
    if (!el) {
      throw new Error(`Element not found for selector: ${selector}`);
    }
    this.element = el as HTMLElement;
    this.options = {
      animated: options.animated || false,
      collapsed: options.collapsed || true,
      unique: options.unique || false,
    };
    this.init();
  }

  private init() {
    this.parseStructure();
    this.applyInitialClasses();
    this.setupEventHandlers();
  }

  // ステップ1: HTML構造の解析とクラスの付与
  private parseStructure() {
    const nodes = this.element.querySelectorAll('li');
    nodes.forEach(node => {
      if (node.querySelector('ul')) {
        node.classList.add(this.options.collapsed ? 'expandable' : 'collapsable');
      } else {
        node.classList.add('file');
      }
    });
  }

  // ステップ2: 初期状態の設定
  private applyInitialClasses() {
    if (this.options.collapsed) {
      this.collapseAll();
    } else {
      this.expandAll();
    }
  }

  // ステップ3: イベントハンドラの設定
  private setupEventHandlers() {
    const folders = this.element.querySelectorAll('.expandable, .collapsable');
    folders.forEach(folder => {
      folder.addEventListener('click', (e) => this.toggleNode(e.currentTarget as HTMLElement));
    });
  }

  // ステップ4: ノードの開閉
  private toggleNode(node: HTMLElement) {
    const isCollapsed = node.classList.contains('expandable');
    node.classList.toggle('expandable', !isCollapsed);
    node.classList.toggle('collapsable', isCollapsed);

    const childUl = node.querySelector('ul');
    if (childUl) {
      childUl.style.display = isCollapsed ? 'block' : 'none';
    }
  }

  private collapseAll() {
    const nodes = this.element.querySelectorAll('.collapsable');
    nodes.forEach(node => {
      node.classList.add('expandable');
      node.classList.remove('collapsable');
      const childUl = node.querySelector('ul');
      if (childUl) {
        childUl.style.display = 'none';
      }
    });
  }

  private expandAll() {
    const nodes = this.element.querySelectorAll('.expandable');
    nodes.forEach(node => {
      node.classList.add('collapsable');
      node.classList.remove('expandable');
      const childUl = node.querySelector('ul');
      if (childUl) {
        childUl.style.display = 'block';
      }
    });
  }
}
