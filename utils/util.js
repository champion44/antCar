const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatDate(now) {
  var d = new Date(now); 
  var year = d.getYear()%100;
  var month = d.getMonth() + 1;
  var date = d.getDate();
  return "20" + year + "-" + month + "-" + date;
}

function formatDateShort(now) {
  var d = new Date(now);
  var month = d.getMonth() + 1;
  var date = d.getDate();
  var hour = d.getHours();
  var minute = d.getMinutes();
  var second = d.getSeconds();
  return "20" + year + "-" + month + "-" + date;
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

module.exports = {
  formatTime: formatTime,
  formatDate: formatDate,
  formatDateShort: formatDateShort
}
