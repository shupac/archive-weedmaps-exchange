import React from 'react';
import { useStaticRendering } from 'mobx-react';
import Document, { Head, Main, NextScript } from 'next/document';
import config, { amplitudeKey } from 'config';
import 'lib/styles/global';
import { ServerStyleSheet } from 'styled-components';
import 'lib/common/logger';

export class DealsAdminDocument extends Document {
  static async getInitialProps({ renderPage, req }) {
    const page = renderPage();
    const isServer = !!req;
    if (isServer) {
      useStaticRendering(true);
    }
    // Add locale script
    const { localeDataScript } = req;
    return {
      ...page,
      localeDataScript,
    };
  }

  render() {
    const sheet = new ServerStyleSheet();
    const main = sheet.collectStyles(<Main />);
    const styleTags = sheet.getStyleTags();

    return (
      <html lang="en">
        <Head>
          <title>Weedmaps Admin</title>
          <meta charSet="utf-8" />
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
          <meta name="description" content="Weedmaps Admin" />
          <script type="text/javascript" src="/static/config.js" />
          <script
            dangerouslySetInnerHTML={{
              __html: this.props.localeDataScript,
            }}
          />
          {config.envName === 'production' && (
            <script
              src="//js.honeybadger.io/v0.5/honeybadger.min.js"
              type="text/javascript"
              data-apikey="2c52da5d"
              data-environment={config.envName}
            />
          )}
          <script
            dangerouslySetInnerHTML={{
              __html: `(function(e,t){var n=e.amplitude||{_q:[],_iq:{}};var r=t.createElement("script")
            ;r.type="text/javascript";r.async=true
            ;r.src="https://cdn.amplitude.com/libs/amplitude-4.1.0-min.gz.js"
            ;r.onload=function(){if(e.amplitude.runQueuedFunctions){
            e.amplitude.runQueuedFunctions()}else{
            console.log("[Amplitude] Error: could not load SDK")}}
            ;var i=t.getElementsByTagName("script")[0];i.parentNode.insertBefore(r,i)
            ;function s(e,t){e.prototype[t]=function(){
            this._q.push([t].concat(Array.prototype.slice.call(arguments,0)));return this}}
            var o=function(){this._q=[];return this}
            ;var a=["add","append","clearAll","prepend","set","setOnce","unset"]
            ;for(var u=0;u<a.length;u++){s(o,a[u])}n.Identify=o;var c=function(){this._q=[]
            ;return this}
            ;var l=["setProductId","setQuantity","setPrice","setRevenueType","setEventProperties"]
            ;for(var p=0;p<l.length;p++){s(c,l[p])}n.Revenue=c
            ;var d=["init","logEvent","logRevenue","setUserId","setUserProperties","setOptOut","setVersionName","setDomain","setDeviceId","setGlobalUserProperties","identify","clearUserProperties","setGroup","logRevenueV2","regenerateDeviceId","logEventWithTimestamp","logEventWithGroups","setSessionId"]
            ;function v(e){function t(t){e[t]=function(){
            e._q.push([t].concat(Array.prototype.slice.call(arguments,0)))}}
            for(var n=0;n<d.length;n++){t(d[n])}}v(n);n.getInstance=function(e){
            e=(!e||e.length===0?"$default_instance":e).toLowerCase()
            ;if(!n._iq.hasOwnProperty(e)){n._iq[e]={_q:[]};v(n._iq[e])}return n._iq[e]}
            ;e.amplitude=n})(window,document);
            amplitude.getInstance().init('${amplitudeKey}');
            `,
            }}
          />
          <style dangerouslySetInnerHTML={{ __html: styleTags }} />
        </Head>
        <body>
          {main}
          <NextScript />
        </body>
      </html>
    );
  }
}

export default DealsAdminDocument;
