// @flow
// import Axios from 'axios';

// TODO: Make them as computed / use lodash  values function
// import { objReduce, onlyDate, onlyTitle } from '../util';
import conf from '../repo.json';

/**
 * Get list url
 * @returns {string}
 */
export const getListUrl = (): string =>
  `https://api.github.com/repos/${conf.repo}/contents/${conf.path ? conf.path : ''}?${conf.branch ? 'ref=' + conf.branch : ''}`;
/**
 * Get post url from hash
 * @param {string} hash
 * @returns {string}
 */
export const getPostUrl = (hash: string): string =>
  `https://api.github.com/repos/${conf.repo}/git/blobs/${hash}`;

// /**
//  * Get posts list
//  * @returns {Promise}
//  */
// export const getList = () =>
//   new Promise((resolve, reject) => {
//     if (window.sessionStorage && window.sessionStorage.hasOwnProperty('list')) {
//       resolve(JSON.parse(window.sessionStorage.getItem('list')));
//     } else {
//       Axios.get(getListUrl).then(res => {
//         let list = res.body;
//         list = list
//           .map(els => objReduce(els, ['name', 'sha', 'size']))
//           .map(el => {
//             el.title = onlyTitle(el.name);
//             el.date = onlyDate(el.name);
//             return el;
//           });
//         // Save into sessionStorage
//         window.sessionStorage &&
//           window.sessionStorage.setItem('list', JSON.stringify(list));
//         // ..then return
//         resolve(list);
//       }, reject);
//     }
//   });

// /**
//  * Get post from hash
//  * @param {string} hash
//  * @returns {Promise}
//  */
// export const getPost = (hash: string) =>
//   new Promise((resolve, reject) => {
//     const cacheKey = `post.${hash}`;
//     if (
//       window.sessionStorage &&
//       window.sessionStorage.hasOwnProperty(cacheKey)
//     ) {
//       resolve(JSON.parse(window.sessionStorage.getItem(cacheKey)));
//     } else {
//       Axios.get(getPostUrl(hash), {
//         headers: { Accept: 'application/vnd.github.v3.raw' }
//       }).then(res => {
//         const content = res.body;
//         window.sessionStorage &&
//           window.sessionStorage.setItem(cacheKey, JSON.stringify(content));
//       }, reject);
//     }
//   });
