// src/TreeView.ts
export interface TreeViewOptions {
  animated?: boolean | 'fast' | 'slow' | number;
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
        // 子の <ul> を初期的に非表示に
        (node.querySelector('ul') as HTMLElement).style.display = this.options.collapsed ? 'none' : 'block';
      } else {
        node.classList.add('file');
      }
    });
  }

  private applyInitialClasses() {
    if (this.options.collapsed) {
      this.collapseAll();
    } else {
      this.expandAll();
    }
  }

  private setupEventHandlers() {
    const folders = this.element.querySelectorAll('.expandable, .collapsable');
    folders.forEach(folder => {
      folder.addEventListener('click', (e) => this.toggleNode(e.currentTarget as HTMLElement));
    });
  }

  private toggleNode(node: HTMLElement) {
    const isCollapsed = node.classList.contains('expandable');
    const childUl = node.querySelector('ul');
    if (!childUl) return;

    if (isCollapsed) {
      this.animate(childUl as HTMLElement, true); // 開くアニメーション
      node.classList.remove('expandable');
      node.classList.add('collapsable');
    } else {
      this.animate(childUl as HTMLElement, false); // 閉じるアニメーション
      node.classList.remove('collapsable');
      node.classList.add('expandable');
    }
  }

  private animate(element: HTMLElement, expanding: boolean) {
    const duration = this.getAnimationDuration();

    // アニメーション開始前に一時的に display を設定して scrollHeight を取得
    element.style.overflow = 'hidden';
    element.style.display = 'block';
    const startHeight = expanding ? 0 : element.scrollHeight;
    const endHeight = expanding ? element.scrollHeight : 0;

    // アニメーション開始時の高さをセット
    element.style.height = `${startHeight}px`;

    const startTime = performance.now();

    const animateStep = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const height = startHeight + (endHeight - startHeight) * progress;

      element.style.height = `${height}px`;

      if (progress < 1) {
        requestAnimationFrame(animateStep);
      } else {
        element.style.height = '';
        element.style.overflow = '';
        if (!expanding) element.style.display = 'none';  // 完全に閉じた後に非表示
      }
    };

    requestAnimationFrame(animateStep);
  }

  private getAnimationDuration(): number {
    if (typeof this.options.animated === 'number') return this.options.animated;
    if (this.options.animated === 'fast') return 200;
    if (this.options.animated === 'slow') return 600;
    return 400; // デフォルトの速度
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
