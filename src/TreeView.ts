export class TreeView {
  private element: HTMLElement;
  private options: { animated?: boolean; collapsed?: boolean; unique?: boolean };

  constructor(selector: string, options: { animated?: boolean; collapsed?: boolean; unique?: boolean } = {}) {
    const el = document.querySelector(selector);
    if (!el) {
      throw new Error(`Element not found for selector: ${selector}`);
    }
    this.element = el as HTMLElement;
    this.options = options;
    this.init();
  }

  private init() {
    console.log('TreeView initialized with options:', this.options);
  }
}
