/**
 * core_connector.ts
 *
 * Handles all connection and communication with the uProxy Chrome App.
 */
/// <reference path='../../../uproxy.ts'/>
/// <reference path='../../../interfaces/firefox.d.ts' />


/// <reference path='../../../../node_modules/freedom-typescript-api/interfaces/promise.d.ts' />


var port :ContentScriptPort;

/**
 * Firefox-specific uProxy CoreBrowserConnector implementation.
 */
class FirefoxConnector implements uProxy.CoreBrowserConnector {

  public status :StatusObject;

  constructor() {
    this.status = { connected: true };
  }


  /**
   * Attach handlers for updates emitted from the uProxy Core.
   */
  public onUpdate = (update :uProxy.Update, handler :Function) => {
    port.on('' + update, handler);
  }

  /**
   * Send a payload to the uProxyCore
   */
  public send = (payload :uProxy.Payload,
                 skipQueue :Boolean = false) => {
    console.assert(payload.cmd === 'emit');

    port.emit('' + payload.type, {data: payload.data, promiseId: payload.promiseId});
  }

}  // class FirefoxConnector
