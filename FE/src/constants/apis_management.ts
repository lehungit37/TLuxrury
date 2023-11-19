import { IApis, IParams, IApiRequest, IHeader } from 'src/types/apis';
import queryString from 'query-string';
import * as yup from 'yup';

export const CMethods = [
  {
    id: 'POST',
    name: 'POST',
  },
  {
    id: 'GET',
    name: 'GET',
  },
  {
    id: 'PUT',
    name: 'PUT',
  },
  {
    id: 'PATCH',
    name: 'PATCH',
  },
  {
    id: 'DELETE',
    name: 'DELETE',
  },
];

export const COptionType = [
  {
    value: 'Text',
    name: 'Text',
  },
  {
    value: 'File',
    name: 'File',
  },
];

export const initApisInfo: IApis = {
  id: '',
  name: '',
  description: '',
  isLocked: false,
  method: 'GET',
  body: [],
  headers: [],
  response: [],
  createdAt: new Date(),
  deletedAt: new Date(),
  updatedAt: new Date(),
  groupId: '',
  params: [],
  queryParams: [],
  url: '',
};

export const CTabType = {
  params: 'params',
  queryParams: 'queryParams',
  header: 'header',
  response: 'response',
  body: 'body',
};

export const CInitField: IParams = {
  key: '',
  value: '',
  description: '',
  required: false,
};

export const CInitFieldHeader: IHeader = {
  key: '',
  value: '',
};

export const CInitRequest: IApiRequest = {
  name: '',
  description: '',
  method: '',
  url: '',
  id: '',
};

export const CInitJSON = {
  key: '',
};

export const CInitFormData = {
  key: '',
  type: '',
};

export const CHttpStatusCodeList = [
  {
    id: 100,
    name: '100 Continue',
  },
  {
    id: 101,
    name: '101 Switching Protocols',
  },
  {
    id: 102,
    name: '102 Processing',
  },
  {
    id: 103,
    name: '103 Early Hints',
  },

  {
    id: 200,
    name: '200 OK',
  },
  {
    id: 201,
    name: '201 Created',
  },
  {
    id: 202,
    name: '202 Accepted',
  },
  {
    id: 203,
    name: '203 Non-Authoritative Information',
  },
  {
    id: 204,
    name: '204 No Content',
  },
  {
    id: 205,
    name: '205 Reset Content',
  },
  {
    id: 206,
    name: '206 Partial Content',
  },
  {
    id: 207,
    name: '207 Multi-Status',
  },
  {
    id: 208,
    name: '208 Already Reported',
  },

  {
    id: 300,
    name: '300 Multiple Choices',
  },
  {
    id: 301,
    name: '301 Moved Permanently',
  },
  {
    id: 302,
    name: '302 Found',
  },
  {
    id: 303,
    name: '303 See Other',
  },
  {
    id: 304,
    name: '304 Not Modified',
  },
  {
    id: 305,
    name: '305 Use Proxy',
  },
  {
    id: 306,
    name: '306 Switch Proxy',
  },
  {
    id: 307,
    name: '307 Temporary Redirect',
  },
  {
    id: 308,
    name: '308 Permanent Redirect',
  },

  {
    id: 400,
    name: '400 Bad Request',
  },
  {
    id: 401,
    name: '401 Unauthorized',
  },
  {
    id: 402,
    name: '402 Payment Required',
  },
  {
    id: 403,
    name: '403 Forbidden',
  },
  {
    id: 404,
    name: '404 Not Found',
  },
  {
    id: 405,
    name: '405 Method Not Allowed',
  },
  {
    id: 406,
    name: '406 Not Acceptable',
  },
  {
    id: 407,
    name: '407 Proxy Authentication Required',
  },
  {
    id: 408,
    name: '408 Request Timeout',
  },
  {
    id: 409,
    name: '409 Conflict',
  },
  {
    id: 410,
    name: '410 Gone',
  },
  {
    id: 411,
    name: '411 Length Required',
  },
  {
    id: 412,
    name: '412 Precondition Failed',
  },
  {
    id: 413,
    name: '413 Payload Too Large',
  },
  {
    id: 414,
    name: '414 URI Too Long',
  },
  {
    id: 415,
    name: '415 Unsupported Media Type',
  },
  {
    id: 416,
    name: '416 Range Not Satisfiable',
  },
  {
    id: 417,
    name: '417 Expectation Failed',
  },
  {
    id: 418,
    name: '418 I am a teapot',
  },
  {
    id: 421,
    name: '421 Misdirected Request',
  },
  {
    id: 422,
    name: '422 Unprocessable Entity',
  },
  {
    id: 423,
    name: '423 Locked',
  },
  {
    id: 424,
    name: '424 Failed Dependency',
  },
  {
    id: 425,
    name: '425 Too Early',
  },
  {
    id: 426,
    name: '426 Upgrade Required',
  },
  {
    id: 428,
    name: '428 Precondition Required',
  },
  {
    id: 429,
    name: '429 Too Many Requests',
  },
  {
    id: 430,
    name: '431 Request Header Fields Too Large',
  },
  {
    id: 451,
    name: '451 Unavailable For Legal Reasons',
  },

  // 5xx
  { id: 500, name: '500 Internal Server Error' },
  { id: 501, name: '501 Not Implementedr' },
  { id: 502, name: '502 Bad Gateway' },
  { id: 503, name: '503 Service Unavailable' },
  { id: 504, name: '504 Gateway Timeout' },
  { id: 505, name: '505 HTTP Version Not Supported' },
  { id: 506, name: '506 Variant Also Negotiates' },
  { id: 506, name: '507 Insufficient Storage' },
  { id: 508, name: '508 Loop Detected' },
  { id: 510, name: '510 Not Extended' },
  { id: 511, name: '511 Network Authentication Required' },
];

export const schemaRequest = yup.object({
  url: yup.string().required('Vui lòng nhập URL'),
  name: yup.string().required('Vui lòng nhập tên request'),
  method: yup.string().required('Vui lòng chọn phương thức'),
});

export const paramsToParams = (baseUrl: string, queryParams: IParams[]) => {
  const newKeys: string[] = [];

  queryParams?.map((item) => {
    newKeys.push(item.key);
  });

  const newQueryParams = newKeys.reduce((a, v) => ({ ...a, [v]: `{${v}}` }), {});
  const index = baseUrl.indexOf('?');
  const url = baseUrl.slice(0, index);
  const stringtify = baseUrl.slice(index + 1);

  let fullPath = '';
  if (stringtify) {
    const paramsOld = queryString.parse(stringtify);
    const cloneObj = { ...paramsOld, ...newQueryParams };
    fullPath = url + '?' + queryString.stringify(cloneObj, { sort: false });
  } else {
    fullPath = url + '?' + queryString.stringify(newQueryParams, { sort: false });
  }
  // return fullPath.replaceAll('%7B', '{').replaceAll('%7D', '}');
  return decodeURI(fullPath);
};

export const customResponse = (response: any) => {
  const newResponse = {};
  response.map((item: any) => {
    if (item.type === 'Object') {
      const newObject: any = {
        [item.key]: customResponse([item.value]),
      };
      Object.assign(newResponse, newObject);
    } else {
      const newObject: any = { [item.key]: item.value };
      Object.assign(newResponse, newObject);
    }
  });
  return newResponse;
};

export const getParamsUrl = (reqUrl: any, oldParams: IParams[]) => {
  const newParams: any = [];
  const totalParams = reqUrl.split('?')[0].match(new RegExp('/{', 'g'))?.length;
  if (totalParams > 0) {
    for (let i = 0; i < totalParams; i++) {
      const keyParams = reqUrl.split('?')[0].split('/{')[i + 1].split('}')[0];
      newParams.push({
        key: keyParams,
        description: oldParams
          ? Object.fromEntries(oldParams.map((k) => [k.key, k]))[keyParams]?.description || ''
          : '',
        required: false,
        value: '',
      });
    }
    return newParams;
  } else {
    return newParams;
  }
};

// queryparams
export const getQueryParams = (path: string, oldQueryParams: IParams[]) => {
  if (path) {
    const index = path.indexOf('?');
    const stringtify = path.slice(index + 1);
    if (stringtify) {
      const keyValues = stringtify.split('&');
      const queryParams: { [x: string]: any } = {};
      keyValues.forEach((keyValue) => {
        const [key, value] = keyValue.split('=');
        queryParams[key] = value;
      });
      const newOldQueryParams: IParams[] = [];

      if (oldQueryParams?.length > Object.keys(queryParams).length && oldQueryParams?.length > 0) {
        // console.log('xoa');
        for (let index = 0; index < Object.keys(queryParams).length; index++) {
          const newArray: any = oldQueryParams.filter(
            (item) => item.key === Object.keys(queryParams)[index],
          );
          newOldQueryParams.push({ ...newArray[0] });
        }
        const newQueryParams = newOldQueryParams.map((item) => ({
          description: item.description,
          key: item.key,
        }));
        return newQueryParams;
      } else if (
        oldQueryParams?.length < Object.keys(queryParams).length ||
        oldQueryParams?.length === Object.keys(queryParams).length
      ) {
        // console.log('Them');
        const newQueryParams = Object.keys(queryParams).map((key, index) => ({
          description: oldQueryParams[index]?.description || '',
          key: key,
        }));
        return newQueryParams;
      } else {
        // console.log('them moi');
        const newQueryParams = Object.keys(queryParams).map((key) => ({
          description: '',
          key: key,
        }));
        return newQueryParams;
      }
    } else {
      return [];
    }
  }
};
