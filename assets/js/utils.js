class Utils {
  static createElement({ tag, className = 'error-item', content }) {
    const element = document.createElement(`${tag}`);
    element.classList.add(className);
    element.innerHTML = content;
    return element;
  }

  static showNotification({ title, text, icon }) {
    Swal.fire({
      title: title,
      text: text,
      icon: icon,
    });
  }

  static showConfirmationDelete() {
    return Swal.fire({
      title: 'Apakah anda yakin?',
      text: 'anda tidak bisa mengembalikan data ini',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#198754',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ya, yakin!',
      cancelButtonText: 'Tidak, Batal',
    });
  }

  static generateId() {
    function randomString(length) {
      let result = '';
      let characters = 'abcdefghijklmnopqrstuvwxyz';
      let charactersLength = characters.length;
      for (let i = 0; i < length; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * charactersLength),
        );
      }
      return result;
    }

    function randomNumber(length) {
      let result = '';
      let characters = '0123456789';
      let charactersLength = characters.length;
      for (let i = 0; i < length; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * charactersLength),
        );
      }
      return result;
    }

    let id = `notes-${randomNumber(4)}-${randomString(4)}-${randomNumber(4)}`;

    return id;
  }

  static generateTimestamp() {
    let now = new Date();

    let year = now.getUTCFullYear();
    let month = String(now.getUTCMonth() + 1).padStart(2, '0');
    let day = String(now.getUTCDate()).padStart(2, '0');

    let hours = String(now.getUTCHours()).padStart(2, '0');
    let minutes = String(now.getUTCMinutes()).padStart(2, '0');
    let seconds = String(now.getUTCSeconds()).padStart(2, '0');
    let milliseconds = String(now.getUTCMilliseconds()).padStart(3, '0');

    let timestamp = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}Z`;

    return timestamp;
  }

  static formatDate(timestamp) {
    const days = [
      'Minggu',
      'Senin',
      'Selasa',
      'Rabu',
      'Kamis',
      'Jumat',
      'Sabtu',
    ];

    const months = [
      'Januari',
      'Februari',
      'Maret',
      'April',
      'Mei',
      'Juni',
      'Juli',
      'Agustus',
      'September',
      'Oktober',
      'November',
      'Desember',
    ];

    let date = new Date(timestamp);

    let dayName = days[date.getDay()];
    let day = String(date.getDate()).padStart(2, '0');
    let month = months[date.getMonth()];
    let year = date.getFullYear();
    let hours = String(date.getHours()).padStart(2, '0');
    let minutes = String(date.getMinutes()).padStart(2, '0');
    let seconds = String(date.getSeconds()).padStart(2, '0');

    let formattedDate = `${dayName}, ${day} ${month} ${year} - ${hours}:${minutes}:${seconds}`;

    return formattedDate;
  }

  static addEllipsis(str, limit = 0) {
    if (limit == 0) {
      return str.replace(/\n/g, '<br>');
    }

    if (str.length > limit) {
      return str.replace(/\n/g, '<br>').substring(0, limit) + ' ...';
    }

    return str.replace(/\n/g, '<br>');
  }
}

export default Utils;
