const formatDate = (date, type = '/') => {
    const {toString} = Object.prototype;
    if (!date) return;
    if (date::toString() === '[Object String]') {
      date = new Date(date);
    }
    if (typeof date === 'number') {
      date = new Date(date);
    }
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    return [year, month, day].map(formatNumber).join(type);
  };
  
  const formatDateTime = (date, type = '-') => {
    if (!date) return;
    return formatDate(date, type) + ' ' + formatTime(date);
  };
  
  const formatTime = (date) => {
    const {toString} = Object.prototype;
    if (!date) return;
    if (date::toString() === '[Object String]') {
      date = new Date(date);
    }
    const hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();
    return [hour, minute, second].map(formatNumber).join(':');
  };
  
  const formatNumber = n => {
    n = n.toString();
    return n[1] ? n : '0' + n;
  };

  const baseUrl = process.env.NODE_ENV === 'development'?'http://localhost:8088/api':window.location.origin+'/api';
  
  export {
    formatTime,
    formatDateTime,
    formatDate,
    baseUrl
  }