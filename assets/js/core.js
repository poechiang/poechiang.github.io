((global, $) => {
  // ****************************************************************
  // start withTags

  /**
   * Object.prototype.toString 's alias
   */
  const toString = Object.prototype.toString;
  /**
   * 检测对象类型
   * @param {any} o
   * @returns js 基本类型: string, number, date, boolean, array, object 等
   */
  const type = (o) => {
    return toString
      .call(o)
      .match(/\[object\s+(\w+)\]/)?.[1]
      ?.toLowerCase();
  };

  /**
   * 日期时间格式化
   * @param {date|number} date Date日期 或 number时间戳
   * @returns 固定格式:MMM, Day YYYY HH:mm:ss.SSS
   */
  const formatDate = (date = Date.now()) => {
    const t = type(date);

    if (t !== "number" && t !== "date") {
      throw new Error("invalid argument");
    }
    const time = new Date(date);
    const [w, M, d, y] = time.toDateString().split(" ");
    return `${M}. ${d}, ${y} ${time.toLocaleTimeString()}.${time.getMilliseconds()}`;
  };

  /**
   * 生成带指定标签的log方法
   * @param  {...string} tags 一个或多个标签
   * @returns {log:Console.log} log方法
   */
  $.withTags = (...tags) => {
    return {
      log: (...rest) =>
        console.log(
          formatDate(),
          ...(tags || []).map((t) => `[${t.toUpperCase()}]`),
          ...rest
        ),
    };
  };

  // end withTags
  // ******************************************************************

  // ****************************************************************
  // start cache
  const { localStorage, sessionStorage } = global;
  /**
   * 判断指定变时是否为 undefined
   * @param {any} value
   * @returns boolean
   */
  const isUndefined = (value) => value === undefined;
  /**
   * 获取过期时间戳
   * @param {number} expire 有效期,单ms
   * @returns 时间戳
   */
  const getExpire = (expire) => (expire ? expire + Date.now() : expire || 0);
  /**
   * 操作localStorage
   * @param {string} key 操作的key
   * @param {any} value 写入的wfhg
   * @param {number} expire 存续的时间,单位毫秒
   * @returns 如果是读取操作且时间有效,则返回对应key的值,如果已过期返回null,否则返回undefined
   */
  const local = (key, value, expire) => {
    if (!key) {
      throw new Error('argument "key" is required!');
    }
    if (isUndefined(value)) {
      const { value, expire = 0 } = JSON.parse(
        localStorage.getItem(key) || "{}"
      );
      if (!expire || expire > Date.now()) {
        return isUndefined(value) ? null : value;
      }
    } else if (value === null) {
      localStorage.removeItem(key);
    } else {
      localStorage.setItem(
        key,
        JSON.stringify({ expire: getExpire(expire), value })
      );
    }

    return void 0;
  };

  /**
   * 操作sessionStorage
   * @param {string} key 操作的key
   * @param {any} value 写入的wfhg
   * @param {number} expire 存续的时间,单位毫秒
   * @returns 如果是读取操作且时间有效,则返回对应key的值,如果已过期返回null,否则返回undefined
   */
  const session = (key, value, expire) => {
    if (!key) {
      throw new Error('argument "key" is required!');
    }
    if (isUndefined(value)) {
      const { value, expire = 0 } = JSON.parse(
        sessionStorage.getItem(key) || "{}"
      );

      if (!expire || expire > Date.now()) {
        return value;
      }
    } else if (value === null) {
      sessionStorage.removeItem(key);
    } else {
      sessionStorage.setItem(
        key,
        JSON.stringify({ expire: getExpire(expire), value })
      );
    }
    return void 0;
  };

  $.cache = { local, session };

  // end withTags
  // ******************************************************************

  // ****************************************************************
  // start withTags
  // end withTags
  // ******************************************************************

  const jQuery = $;
  global.$ = jQuery;
  global.jQuery = jQuery;
})(window || {}, window.jQuery || {});
