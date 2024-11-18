import { BrowserWindow } from 'vtron'

class ExtBrowserWindow extends BrowserWindow {
  _setZindex(): void {
    this.windowInfo.zindex = 20
  }
}

export { ExtBrowserWindow }
