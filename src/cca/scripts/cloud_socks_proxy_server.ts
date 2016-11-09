import * as social from '../../interfaces/social';
import * as uproxy_core_api from '../../interfaces/uproxy_core_api';

import { SocksProxy } from '../model/socks_proxy_server';

// A local Socks server that provides access to a remote uProxy Cloud server via RTC.
export class CloudSocksProxy implements SocksProxy {
  private instancePath: social.InstancePath;

  // Constructs a server that will use the given CoreApi to start the local proxy.
  // It takes the IP address of the uProxy cloud server it will use for Internet access.    
  public constructor(private core: uproxy_core_api.CoreApi,
                     private remoteIpAddress: string) {
    this.instancePath = {
      network: {
        name: 'Cloud',
        userId: 'me'
      },
      userId: remoteIpAddress,
      instanceId: remoteIpAddress
    }
  }

  public start(): Promise<number> {
    console.debug('Starting proxy');
    return this.core.start(this.instancePath).then((endpoint) => {
      console.debug(`Local Socks proxy running on port ${endpoint.port}, talking to IP ${this.remoteIpAddress}`);
      return endpoint.port;
    });
  }

  public stop(): Promise<void> {
    console.debug('Stopping proxy');
    return this.core.stop(this.instancePath);
  }
}
