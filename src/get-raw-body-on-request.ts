import { json } from 'body-parser';
import * as cloneBuffer from 'clone-buffer';

export const getRawBodyRequestKey = 'rawBody';

/**
 * Clones the request buffer and stores it on the request object for reading later 
 */
export const getRawBodyOnRequest = json({
  verify: (req: any, res, buf, encoding) => {
    //console.log("Pasando.....", buf)
    req.setEncoding('utf-8');
    // only clone the buffer if we're receiving a Xero webhook request
    if (req.headers['x-wc-webhook-signature'] && Buffer.isBuffer(buf)) {
      req[getRawBodyRequestKey] = cloneBuffer(buf);
    }
    return true;
  },
});