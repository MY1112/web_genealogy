
  import { Big } from 'big.js';
  interface IObj {
    [x: string]: string;
  }

  /**
   * 格式化数字
   * 千分位分割，保留两位小数
   */
  export const formatNumber = (s: number) => {
    if (!s) {
      return '0.00';
    }
    const str = `${parseFloat(`${s}`.replace(/[^\d\.-]/g, '')).toFixed(2)}`;
    const len = str
      .split('.')[0]
      .split('')
      .reverse();
    const point = str.split('.')[1];
    const point2 = point == null ? '' : `.${point}`;
    let t = '';
    for (let i = 0; i < len.length; i += 1) {
      t +=
        len[i] +
        ((i + 1) % 3 === 0 && i + 1 !== len.length && len[i + 1] !== '-'
          ? ','
          : '');
    }
    return `${t
      .split('')
      .reverse()
      .join('')}${point2}`;
  };
  
  /**
   * 格式化数字
   * 千分位分割，不保留小数
   */
  export const formatNoDecimal = (num: number) => {
    if (!num) {
      return '0';
    }
    const reg = /\d{1,3}(?=(\d{3})+$)/g;
    return (num + '').replace(reg, '$&,');
  };
  
  export const searchToObj = (str: string) => {
    const arr = str.slice(1).split('&');
    const obj: IObj = {};
    arr.forEach((item: string) => {
      const objMap = item.split('=');
      obj[objMap[0]] = objMap[1];
    });
    return obj;
  };
  
  /**
   * 将对象转化为location或react router的search字符串
   * @param obj 对象
   * @returns location或react router的search字符串
   */
  
  export const objToSearch = (obj: IObj) => {
    let result = '';
    const arr = Object.keys(obj);
    arr.forEach((item: string) => {
      result += `&${item}=${JSON.stringify(obj[item])}`;
    });
    return result.slice(1);
  };
  /**
   *
   * @param str textarea 获取的值
   */
  export const setStringToArray = (str: string) => {
    return JSON.stringify(str.split('\n').filter(ele => ele !== ''));
  };
  /**
   *
   * @param str string [] 的字符串
   */
  export const setArrayToString = (str: string) => {
    let strArr = [];
    try {
      const curStr = +str;
      if (!isNaN(curStr)) {
        strArr = [str];
      } else {
        strArr = JSON.parse(str);
      }
    } catch (err) {
      strArr = [str];
    }
    return strArr.join('\n');
  };
  
  export const digitUppercase = function(money: number | string) {
    //汉字的数字
    var cnNums = new Array(
      '零',
      '壹',
      '贰',
      '叁',
      '肆',
      '伍',
      '陆',
      '柒',
      '捌',
      '玖'
    );
    //基本单位
    var cnIntRadice = new Array('', '拾', '佰', '仟');
    //对应整数部分扩展单位
    var cnIntUnits = new Array('', '万', '亿', '兆');
    //对应小数部分单位
    var cnDecUnits = new Array('角', '分', '毫', '厘');
    //整数金额时后面跟的字符
    var cnInteger = '整';
    //整型完以后的单位
    var cnIntLast = '元';
    //最大处理的数字
    var maxNum = 999999999999999.9999;
    //金额整数部分
    var integerNum;
    //金额小数部分
    var decimalNum;
    //输出的中文金额字符串
    var chineseStr = '';
    //分离金额后用的数组，预定义
    var parts;
    if (money == '') {
      return '';
    }
    // @ts-ignore
    money = parseFloat(money);
    if (money >= maxNum) {
      //超出最大处理数字
      return '';
    }
    if (money == 0) {
      chineseStr = cnNums[0] + cnIntLast + cnInteger;
      return chineseStr;
    }
    //转换为字符串
    money = money.toString();
    if (money.indexOf('.') == -1) {
      integerNum = money;
      decimalNum = '';
    } else {
      parts = money.split('.');
      integerNum = parts[0];
      decimalNum = parts[1].substr(0, 4);
    }
    //获取整型部分转换
    if (parseInt(integerNum, 10) > 0) {
      var zeroCount = 0;
      var IntLen = integerNum.length;
      for (var i = 0; i < IntLen; i++) {
        var n = integerNum.substr(i, 1);
        var p = IntLen - i - 1;
        var q = p / 4;
        var m = p % 4;
        if (n == '0') {
          zeroCount++;
        } else {
          if (zeroCount > 0) {
            chineseStr += cnNums[0];
          }
          //归零
          zeroCount = 0;
          chineseStr += cnNums[parseInt(n)] + cnIntRadice[m];
        }
        if (m == 0 && zeroCount < 4) {
          chineseStr += cnIntUnits[q];
        }
      }
      chineseStr += cnIntLast;
    }
    //小数部分
    if (decimalNum != '') {
      var decLen = decimalNum.length;
      for (var i = 0; i < decLen; i++) {
        var n = decimalNum.substr(i, 1);
        if (n != '0') {
          chineseStr += cnNums[Number(n)] + cnDecUnits[i];
        }
      }
    }
    if (chineseStr == '') {
      chineseStr += cnNums[0] + cnIntLast + cnInteger;
    } else if (decimalNum == '') {
      chineseStr += cnInteger;
    }
    return chineseStr;
  };
  
  export const loadCDN = async (script: string[], css?: string[]) => {
    const nowScript = Array.from(document.getElementsByTagName('script')).map(
      item => item.src
    );
    const nowCss = Array.from(document.getElementsByTagName('link')).map(
      item => item.href
    );
    let isSuccess = true;
  
    for (let i of script) {
      if (nowScript.includes(i)) continue;
      await new Promise(resolve => {
        const script = document.createElement('script');
        script.src = i;
        script.type = 'text/javascript';
        script.onload = () => {
          resolve();
        };
        document.body.appendChild(script);
      }).catch(err => {
        isSuccess = false;
      });
    }
    if (css) {
      for (let j of css) {
        if (nowCss.includes(j)) continue;
        await new Promise(resolve => {
          const link = document.createElement('link');
          link.href = j;
          link.rel = 'stylesheet';
          link.onload = () => {
            resolve();
          };
          document.head.appendChild(link);
        }).catch(() => {
          isSuccess = false;
        });
      }
    }
  
    return new Promise((resolve, reject) => {
      if (isSuccess) {
        return resolve();
      }
      return reject();
    });
  };
  /**
   * 格式化数字
   * 千分位分割，不保留小数
   */
  export const format = (num: number) => {
    if (!num) {
      return '0';
    }
    const reg = /\d{1,3}(?=(\d{3})+$)/g;
    return (num + '').replace(reg, '$&,');
  };
  
  type TNGBigArgs = number[] | NGBig[];
  
  class NGBig {
    big: Big;
    constructor(number: number) {
      this.big = new Big(number);
    }
    /**
     * @function plus 加法
     */
    plus(...args: TNGBigArgs) {
      const arg = [...args];
      for (let i of args) {
        this.big =
          typeof i === 'number' ? this.big.plus(i) : this.big.plus(i.big);
      }
      return this;
    }
    /**
     * @function minus 减法
     */
    minus(...args: TNGBigArgs) {
      for (let i of args) {
        this.big =
          typeof i === 'number' ? this.big.minus(i) : this.big.minus(i.big);
      }
      return this;
    }
    /**
     * @function multipy 乘法
     */
    multipy(...args: TNGBigArgs) {
      for (let i of args) {
        this.big =
          typeof i === 'number' ? this.big.times(i) : this.big.times(i.big);
      }
      return this;
    }
    /**
     * @function div 除法
     */
    div(...args: TNGBigArgs) {
      for (let i of args) {
        this.big = typeof i === 'number' ? this.big.div(i) : this.big.div(i.big);
      }
      return this;
    }
    /**
     * @function mod 模运算
     */
    mod(...args: TNGBigArgs) {
      for (let i of args) {
        this.big = typeof i === 'number' ? this.big.mod(i) : this.big.mod(i.big);
      }
      return this;
    }
    /**
     * @function getNumber 获取真实值
     * @return number
     */
    getNumber() {
      return Number(this.big);
    }
    /**
     * @function getString 获取真实值
     * @return number
     */
    getString() {
      return this.big.toString();
    }
  }
  
  export const useBigNumber = (number: number) => {
    return new NGBig(number);
  };
  
  /**
   * 过滤空值，转化为 -
   * 并且可以传入格式化后的值
   */
  export const filterNull = (value: any, formatValue?: any) => {
    return value ? (formatValue ? formatValue : value) : '-';
  };
  
  export const getSelf = (treeData: any[], value: string): any => {
    let data;
    for (let item of treeData) {
      if (item.value === value) {
        data = item;
        break;
      }
      if (item.value !== value && item.children && item.children.length > 0) {
        data = getSelf(item.children, value);
      }
    }
    return data;
  };
  
  const aCity: any = {
    11: '北京',
    12: '天津',
    13: '河北',
    14: '山西',
    15: '内蒙古',
    21: '辽宁',
    22: '吉林',
    23: '黑龙江',
    31: '上海',
    32: '江苏',
    33: '浙江',
    34: '安徽',
    35: '福建',
    36: '江西',
    37: '山东',
    41: '河南',
    42: '湖北',
    43: '湖南',
    44: '广东',
    45: '广西',
    46: '海南',
    50: '重庆',
    51: '四川',
    52: '贵州',
    53: '云南',
    54: '西藏',
    61: '陕西',
    62: '甘肃',
    63: '青海',
    64: '宁夏',
    65: '新疆',
    71: '台湾',
    81: '香港',
    82: '澳门',
    91: '国外'
  };
  export const isCardID = (sId: string) => {
    let iSum = 0;
    let info = '';
    let sBirthday = '';
    if (!/^\d{17}(\d|x)$/i.test(sId)) return '你输入的身份证长度或格式错误';
    sId = sId.replace(/x$/i, 'a');
    if (aCity[parseInt(sId.substr(0, 2))] == null) return '你的身份证地区非法';
    sBirthday =
      sId.substr(6, 4) +
      '-' +
      Number(sId.substr(10, 2)) +
      '-' +
      Number(sId.substr(12, 2));
    let d = new Date(sBirthday.replace(/-/g, '/'));
    if (
      sBirthday !=
      d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate()
    )
      return '身份证上的出生日期非法';
    for (let i = 17; i >= 0; i--)
      iSum += (Math.pow(2, i) % 11) * parseInt(sId.charAt(17 - i), 11);
    if (iSum % 11 != 1) return '你输入的身份证号非法';
    //aCity[parseInt(sId.substr(0,2))]+","+sBirthday+","+(sId.substr(16,1)%2?"男":"女");//此次还可以判断出输入的身份证号的人性别
    return true;
  };
  
  /**
   *  生成随机字符串
   */
  export const randomString = (len: number) => {
    len = len || 32;
    var $chars =
      'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz'; /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
    var maxPos = $chars.length;
    var pwd = '';
    for (let i = 0; i < len; i++) {
      pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return pwd;
  };
  
  /**
   * 获取合并单元格行数
   *
   * @param data 列表数据源
   * @param name 单元格的key
   * @param index 当前单元格index
   */
  export const getCount = (data: any, name: string, index: number) => {
    const myArray = [];
    myArray.length = data.length;
  
    // 保存上一个name
    let x = '';
    // 相同name出现的次数
    let count = 0;
    // 该name第一次出现的位置
    let startindex = 0;
  
    for (let i = 0; i < data.length; i += 1) {
      // 合并name列
      const val = data[i][name];
      if (i === 0) {
        x = val;
        count = 1;
        myArray[0] = 1;
      } else {
        if (val === x) {
          count += 1;
          myArray[startindex] = count;
          myArray[i] = 0;
        } else {
          count = 1;
          x = val;
          startindex = i;
          myArray[i] = 1;
        }
      }
    }
  
    return myArray[index];
  };
  