import moment from 'moment';
//import store from '@/store';
//import DBHandler from './database/DBHandler';

let Util = {
  
  format_date: function(str) {
    let date = new Date(Date.parse(str));
    let form_date =
    date.getDate() + "-" + (date.getMonth() + 1) + "-" + date.getFullYear();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? "pm" : "am";
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? "0" + minutes : minutes;
    var strTime = hours + ":" + minutes + " " + ampm;
    form_date = form_date + " " + strTime;
    //console.log(str + " " + form_date);
    return form_date;
  },
  search: function(details, search_str) {
    let result = [];
    for (let i = 0; i < details.length; i++) {
      let detail = details[i];
      if (this.criteria(detail,search_str)) {
        result.push(detail);
      }
    }
    console.log("searching...." + search_str);
    return result;
  },
  criteria: function(item,str) {
    for (let [key, value] of Object.entries(item)) {
      let str_val = value+'';
      if(key !== '_id'){
        if(value instanceof Object){
          str_val = JSON.stringify(value);
        }
        if (str_val.toLowerCase().indexOf(str.toLowerCase()) > -1) {
          return true;
        }
      }
    }
    return false;
  },
  getInitials: function(first_name,last_name){
    let initials = '';
    if(last_name){
      initials = first_name.charAt(0)+last_name.charAt(0);
      return initials.toUpperCase();
    } else {
      initials = first_name.charAt(0)+first_name.charAt(1);
      return initials.toUpperCase();
    }
  },
  date_diff: function(date){
    try{
      const date1 = new Date(Date.parse(date));
      const date2 = new Date();
      const diffTime = Math.abs(date2 - date1);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      console.log('diff days:'+diffDays); 
      return diffDays;
    } catch(e){
      console.log("Util > date_diff:"+e);
    }
    return 0;
  },
  date_diff2: function(dt1,dt2){
    try{
      const date1 = new Date(Date.parse(dt1));
      const date2 = new Date(Date.parse(dt2));
      const diffTime = Math.abs(date2 - date1);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      console.log('diff days2:'+diffDays); 
      return diffDays;
    } catch(e){
      console.log("Util > date_diff2:"+e);
    }
    return 0;
  },
  date_equals: function(dt1,dt2){
    const date1 =  moment(dt1,'DD-MM-YYYY');
    const date2 = moment(dt2,'DD-MM-YYYY');
    if(date1.isSame(date2)){
      return true;
    }
    return false;
  },
  getTodayString(){
    return moment().format('DD-MM-YYYY');
  },
  getTodayWithTime: function(){
    return moment().format('DD-MM-YYYY h:mm:ss a');
  },
  getDateForId(){
    return moment().format('YYYY-MM-DD');
  },
  getTimeStamp(){
    return moment().toISOString();
  },
  parseAppTime(dt){
    const format = "DD-MM-YYYY HH:mm";
    return moment(dt, format);
  },
  // isPassedDate(dt){
  //   const format = "DD-MM-YYYY";
  //   let order_date = moment(dt, format);
  //   const format2 = "YYYY-MM-DD HH:mm:ss";
  //   let to_day = store.getters.getToday;
  //   let m_to_day = moment(to_day,format2);
  //   let diff = order_date.diff(m_to_day, 'days') 
  //   if(diff < 0){
  //     return true;
  //   }
  //   return false;
  // },
  // getPassedMinutes(dt){
  //   let order_date = Util.parseAppTime(dt);
  //   const format2 = "YYYY-MM-DD HH:mm:ss";
  //   let to_day = store.getters.getToday;
  //   let m_to_day = moment(to_day,format2);
  //   let diff = order_date.diff(m_to_day, 'minutes') 
  //   console.log(diff+' '+dt+' '+to_day);
  //   return diff;
  // },
  find_status: function(items){
    try{
        for (let i = 0; i < items.length; i++) {
            let item = items[i];
            if (item.Status.toLowerCase() == 'ready') {
              return item.AccessionNo;
            } 
        }
    }catch(e){
      console.log("Util > find_status > Status Is Empty :"+e);
    }
    return '';
  },
  checkPatientName: function(str){
    try{
      str = str.toLowerCase().trim();
      if(str.indexOf(".") > -1){
        str = str.substring((str.indexOf(".")+1)).trim();
      }
    }catch(e){
      console.log("Util > checkPatientName:"+e);
    }
    return str;
  },
  getWeekDay:function(days){
    let calendar = moment();
    if(days > 0){
      calendar = moment().add(days, 'days');
    }
    var mWeek = calendar.weekday();
    var dWeek = calendar.weekday(mWeek);
    let dArray = dWeek.toString().split(' ');
    let ret_val = dArray[0]+' '+dArray[2]+' '+dArray[1]+' '+dArray[3];
    return ret_val;
  },
  getWeekDayForDate:function(date){
    let calendar = moment(date,'DD-MM-YYYY');
    var mWeek = calendar.weekday();
    var dWeek = calendar.weekday(mWeek);
    let dArray = dWeek.toString().split(' ');
    let ret_val = dArray[0]+' '+dArray[2]+' '+dArray[1]+' '+dArray[3];
    return ret_val;
  },
  debounce: function(fn, delay) {
    var timeoutID = null
    return function () {
      clearTimeout(timeoutID)
      var args = arguments
      var that = this
      timeoutID = setTimeout(function () {
        fn.apply(that, args)
      }, delay)
    }
  },
  uuidv4: function() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
      return v.toString(16);
    });
  },
  getRandomString: function(length) {
    var randomChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var result = '';
    for ( var i = 0; i < length; i++ ) {
        result += randomChars.charAt(Math.floor(Math.random() * randomChars.length));
    }
    return result;
  },
  toTitleCase: function(str) {
    if(str){
      return str.replace(
        /\w\S*/g,
        function(txt) {
          return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        }
      );
    } else {
      return '';
    }
  },
  formatMoney: function(money){
    var formatter = new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as 2,500.1)
      maximumFractionDigits: 0, // (causes 2500.99 to be printed as 2,501)
    });
    return formatter.format(money);
  },
  formatMoneyForPDF: function(money){
    return money.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
  },
  getFromSession: function(item){
    if(sessionStorage.getItem('logged_in_emp_id')){
      let value = sessionStorage.getItem(item);
       return value;
    } else {
     //location.replace('/#/logout');
    }
    return '';
  },
  setSession: function(item,value){
    sessionStorage.setItem(item,value);
  }, 
  isLoggedIn: function(){
    if(sessionStorage.getItem('logged_in_emp_id')){
      return true;
    }
    return false;
  },
  toLowerCase: function(str){
    str = str.trim();
    str = str.toLowerCase();
    return str;
  },
  toUpperCase: function(str){
    str = str.trim();
    str = str.toUpperCase();
    return str;
  },
  timeConvert: function(num){
    var hours = (num / 60);
    var rhours = Math.floor(hours);
    var minutes = (hours - rhours) * 60;
    var rminutes = Math.round(minutes);
    return rhours + " hour(s) and " + rminutes + " minute(s).";
  },
  getTodayStringForFolderCreation:function(){
    return moment().format('YYYY/MM/DD');
  },
  generateOTP:function(){
    return Math.floor(100000 + Math.random() * 900000);
  },
  callThisAfter:function(fn,time){
    if(time){
      setTimeout(function(){ fn(); }, time);
    } else {
      setTimeout(function(){ fn(); }, 3000);
    }
  },
  isNotEmpty:function (obj)  {
    if((typeof obj === "object") && (obj !== null)){
      if(Array.isArray(obj)){
        if(obj.length > 0){
          return true;
        } else {
          return false;
        }
      } else {
        for (const i in obj) {
          return true;
        }   
        return false; 
      }
    }
    else if((typeof obj === "string") && (obj !== null)){
      obj = obj.trim();
    }
    if(obj){
      return true;
    }
    return false;
  },
  isMobile: function() {
    var check = false;
   // eslint-disable-next-line 
    (function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows ce|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4))) check = true;})(navigator.userAgent||navigator.vendor||window.opera);
      return check;
   // return true
  },
  removeVowels: function (string) {
    let vowels = ["a", "e", "i", "o", "u" ,"A", "E","I","O","U"];
    return [...string].filter((c) => !vowels.includes(c)).join("");
  },
  arrayremoveVowels:function(doc){
    return JSON.parse(
      JSON.stringify(doc).replace(/[aeiouAEIOU]/g, ''));
  },
  capitalizeFirstLetters:function(str){
    // return str.toLowerCase().replace(/^\w|\s\w/g, function (letter) {
    //     return letter.toUpperCase();
    // })
    return str.replace(/\b[a-z]|['_][a-z]|\B[A-Z]/g, function(x){return x[0]==="'"||x[0]==="_"?x:String.fromCharCode(x.charCodeAt(0)^32)})
  },
  contentRangesplitMulti:function(str){
    var tempChar = 't3mp'; //prevent short text separator in split down
    var separators = ['-', '/'];
    //split by regex e.g. \b(or|and)\b
    var re = new RegExp('\\b(' + separators.join('|') + ')\\b' , "g");
    str = str.replace(re, tempChar).split(tempChar);
    
    // trim & remove empty
    return str.map(el => el.trim()).filter(el => el.length > 0);
}
};
export default Util;
