import { debounce, throttle } from 'lodash';

/**
 * 封装防抖函数，直接使用
 * */
export function nowDebounce(func, wait = 200, options = {}) {
  return debounce(func, wait, {
    leading: true, // 指定在延迟开始前调用
    trailing: false, // 指定在延迟结束后调用
    ...options,
  });
}

/**
 * 封装节流函数，直接使用
 * */
export function nowThrottle(func, wait = 10, options = {}) {
  return throttle(func, wait, {
    leading: true, // 指定在延迟开始前调用
    trailing: false, // 指定在延迟结束后调用
    ...options,
  });
}
